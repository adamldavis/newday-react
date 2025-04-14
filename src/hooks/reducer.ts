import { DeleteAction, SaveAction, MoveAction, ModifyAction, Data, DataActor, Entity, Action } from "../api/types";
import ArrayUtil from "../util/ArrayUtil";
import TypeUtil from "../util/TypeUtil";

interface ReducerActionAdd {
    type: 'add';
    payload: SaveAction;
}
interface ReducerActionEdit {
    type: 'edit'
    payload: ModifyAction
}
interface ReducterActionMove {
    type: 'move'
    payload: MoveAction
}
interface ReducerActionDelete {
    type: 'delete'
    payload: DeleteAction
}
interface ReducerActionReset {
    type: 'reset'
}
interface ReducerActionSet {
    type: 'set'
    payload: Data
}
interface ReducerActionUndo {
    type: 'undo'
}
interface ReducerActionRedo {
    type: 'redo'
}
type ReducerAction = ReducerActionDelete | ReducerActionEdit | ReducterActionMove |
    ReducerActionAdd | ReducerActionSet | ReducerActionReset | ReducerActionUndo | ReducerActionRedo;

export const initialState = {
    labels: [],
    todos: [],
    actions: [],
    undoneActions: [],
};
export function reducer(state: Data, action: ReducerAction): Data {

    switch (action.type) {
        // TODO add to actions array to implement undo/redo
        case 'add': 
            return addActionThen(action.payload, add(action.payload.entity), state);
        case 'edit':
            const edit = action.payload;
            edit.type = 'modify';
            return  addActionThen(action.payload, modify(edit.from, edit.to), state);
        case 'delete':
            const { entity, id } = action.payload;
            action.payload.type = 'delete';
            return  addActionThen(action.payload, deleteEntity(entity, id), state);
        case 'move':
            const act = action.payload;
            act.type = 'move';
            return  addActionThen(act, move(act.entity, act.from, act.to), state);
        case 'reset':
            return initialState;
        case 'set':
            return action.payload;

        case 'undo':
            return undo()(state);
        case 'redo':
            return redo()(state);
    }
}
/** Adds the action to "Actions" array then executes DataActor and returns */
function addActionThen(action: Action, actor: DataActor, data: Data): Data {
    data.actions?.push(action);
    return actor(data);
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
        return addTo(entity, 'todos', index ?? 0);
    } else if (TypeUtil.isLabel(entity)) {
        return addTo(entity, 'labels', index ?? 0);
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
            console.log(`Deleting todo id=${id}`);
            data.todos = data.todos?.filter(it => it.id !== id);
            return data;
        };
    } else if (TypeUtil.isLabel(entity)) {
        return (data: Data) => {
            console.log(`Deleting label id=${id}`);
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

// modify is just delete then re-add
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