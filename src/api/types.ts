
export interface EntityBase {
    id: string;
}

export interface Label extends EntityBase {
    name: string;
}

export interface Todo extends EntityBase {
    text: string;
    checked: boolean;
    labels: Label[];
}

export type Entity = Label | Todo;
export interface DeleteAction {
    type: 'delete';
    id: string;
    entity: Entity;
    index: number;
}
export interface SaveAction {
    type: 'save';
    id: string;
    entity: Entity;
}
export interface MoveAction {
    type: 'move';
    id: string;
    entity: Entity;
    from: number;
    to: number;
}
export interface ModifyAction {
    type: 'edit';
    from: Entity;
    to: Entity;
}
export type Action = SaveAction | ModifyAction | MoveAction | DeleteAction;

/* Root interface for saving state. */
export interface Data {
    labels?: Label[];
    todos?: Todo[];
    actions?: Action[];
    undoneActions?: Action[];
}

export interface Repository {
    get: () => Promise<Data>;
    save: (data: Data) => Promise<void>
}

/* Given Data, it does something then returns a new modified data.*/
export type DataActor = (data: Data) => Data;
