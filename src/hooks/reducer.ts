import { DeleteAction, SaveAction, MoveAction, ModifyAction, Data, DataActor, Entity } from "../api/types";
import ArrayUtil from "../util/ArrayUtil";
import TypeUtil from "../util/TypeUtil";

type ActionType = 'add' | 'edit' | 'remove' | 'reset' | 'undo' | 'redo' | 'set';

// TODO make types for every action
interface ReducerAction {
    payload: any;
    type: ActionType;
}
export const initialState = {
    labels: [],
    todos: [],
    actions: [],
    undoneActions: [],
};
export function reducer(state: Data, action: ReducerAction): Data {
    let entity = null;

    switch (action.type) {
        // TODO add to actions array to implement undo/redo
        case 'add': 
            entity = action.payload as Entity;
            return add(entity)(state);
        case 'edit':
            const edit = action.payload as {from: Entity, to: Entity};
            return modify(edit.from, edit.to)(state);
        case 'remove':
            entity = action.payload as Entity;
            return deleteEntity(entity, entity.id)(state);

        case 'reset':
            return initialState;
        case 'set':
            return action.payload as Data;

        case 'undo':
            return undo()(state);
        case 'redo':
            return redo()(state);
        default: 
            throw new Error("Unmatched action type " + action.type);
    }
}

/** Executes the Reversal of the Action */
function undo(): DataActor {
    return (d: Data) => {
        const { actions, undoneActions } = d;
        const action = actions?.pop();
        if (action) {
            undoneActions?.push(action);
            switch (action.type) {
                case 'delete':
                    return undoDelete(action)(d);
                case 'save':
                    return undoSave(action)(d);
                case 'move':
                    return undoMove(action)(d);
                case 'modify':
                    return undoModify(action)(d);
            }
        }
        return d;
    };
}

// undo delete is just add
function undoDelete(action: DeleteAction): DataActor {
    return add(action.entity, action.index);
}

// adds an entity to the proper list
function add(entity: any, index?: number): DataActor {
    if (TypeUtil.isTodo(entity)) {
        return addTo(it, 'todos', index ?? 0);
    } else if (TypeUtil.isLabel(entity)) {
        return addTo(it, 'labels', index ?? 0);
    }
    return (d: Data) => d;
}

type DataFields = keyof Data

// adds an entity to given named list
function addTo<T, K extends DataFields>(entity: T, listName: K, index: number): DataActor {
    return (data: Data) => {
        const list: Array<T> = (data[listName] ?? []) as Array<T>;

        data[listName] = ArrayUtil.insert(list, entity, index) as Data[K];

        return data;
    };
}

// undo save is just delete
function undoSave(action: SaveAction): DataActor {
    return deleteEntity(action.entity, action.id);
}

// Deletes entity with given id
function deleteEntity(entity: any, id: string): DataActor {
    if (TypeUtil.isTodo(entity)) {
        return (data: Data) => {
            data.todos = data.todos?.filter(it => it.id !== id);
            return data;
        };
    } else if (TypeUtil.isLabel(entity)) {
        return (data: Data) => {
            data.labels = data.labels?.filter(it => it.id !== id);
            return data;
        };
    } else {
        throw new Error(`Unknown type ${typeof entity}`);
    }
}

// undo move is just opposite of move
function undoMove(action: MoveAction): DataActor {
    return move(action.entity, action.to, action.from);
}

function move(entity: Entity, fromIndex: number, toIndex: number): DataActor {
    if (TypeUtil.isTodo(entity)) {
        return data => {
            console.log(`Moving: ${entity.id} from ${fromIndex} to ${toIndex}`);
            data.todos = ArrayUtil.moveElementTo(data.todos || [], (t) => t.id === entity.id, toIndex);
            return data;
        };
    } else if (TypeUtil.isLabel(entity)) {
        return data => {
            data.labels = ArrayUtil.moveElementTo(data.labels || [], (t) => t.id === entity.id, toIndex);
            return data;
        };
    } else {
        throw new Error(`Unknown type ${typeof entity}`);
    }
}

// undo modify is just opposite of modify
function undoModify(action: ModifyAction): DataActor {
    return modify(action.to, action.from);
}

// modify is just remove then re-add
function modify(from: Entity, to: Entity): DataActor {
    if (TypeUtil.isTodo(to) && TypeUtil.isTodo(from)) {
        return (data: Data) => {
            const index = data.todos?.indexOf(from);
            return add(to, index)(deleteEntity(from, from.id)(data));
        };
    } else if (TypeUtil.isLabel(to) && TypeUtil.isLabel(from)) {
        return (data: Data) => {
            const index = data.labels?.indexOf(from);
            return add(to, index)(deleteEntity(from, from.id)(data));
        };
    } else {
        throw new Error(`Unknown or unmatching types ${typeof to}, ${typeof from}`);
    }
}

/** Executes the Redo of a reversed Action */
function redo(): DataActor {
    return (d: Data) => {
        const { actions, undoneActions } = d;
        const action = undoneActions?.pop();
        if (action) {
            actions?.push(action);
            switch (action.type) {
                case 'delete':
                    return deleteEntity(action.entity, action.id)(d);
                case 'save':
                    return add(action.entity, 0)(d);
                case 'move':
                    return move(action.entity, action.from, action.to)(d);
                case 'modify':
                    return modify(action.from, action.to)(d);
            }
        }
        return d;
    };
}