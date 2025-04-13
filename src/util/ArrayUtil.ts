
class ArrayUtil {
    /** Finds an element and moves element from given index to location of found element, 
     * returning new array. */
    static moveElementTo<T>(array: T[], finder: (t: T) => boolean, fromIndex: number): T[] {
        
        const toIndex = array.findIndex(finder);
        if (array.length === 2) {
            return ArrayUtil.swap(array, fromIndex, toIndex);    
        }
        const [ element, arr ] = ArrayUtil.remove(array, fromIndex);
        return ArrayUtil.insert(arr, element, toIndex);
    }
    /** Swaps two elements in an array, and returns result as a new array. */
    static swap<T>(array: T[], fromIndex: number, toIndex: number): T[] {
        let copy: T[] = [...array];
        const from = array[fromIndex], to = array[toIndex];
        copy[toIndex] = from;
        copy[fromIndex] = to;
        return copy;
    }
    /** Removes an element at index and returns element and new array as tuple. */
    static remove<T>(array: T[], fromIndex: number): [T, T[]] {
        let copy: T[] = [...array];
        const from = array[fromIndex];
        copy.splice(fromIndex, 1);
        return [ from, copy ];
    }
    
    /** Inserts an element at index and returns element and new array. */
    static insert<T>(array: T[], element: T, index: number): T[] {
        if (index >= array.length) {
            return [...array, element];
        } else if (index === 0) {
            return [element, ...array];
        }
        return [...array.slice(0, index), element, ...array.slice(index)];
    }
}
export default ArrayUtil;