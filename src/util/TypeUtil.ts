import { Label, Todo } from "../api/types";

// This is used to determine types of objects
class TypeUtil {
    static isTodo(o: any): o is Todo {
        return typeof o.id === 'string' && typeof o.text === 'string';
    }
    static isLabel(o: any): o is Label {
        return typeof o.id === 'string' && typeof o.name === 'string';
    }
}

export default TypeUtil;