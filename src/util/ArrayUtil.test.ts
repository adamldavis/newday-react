import ArrayUtil from "./ArrayUtil";

it("should insert into empty", () => {
    let array = [] as number[];
    expect(ArrayUtil.insert(array, 1, 0)).toEqual([1]);
});


it("should insert into middle", () => {
    let array = [1, 2, 3];
    expect(ArrayUtil.insert(array, 42, 1)).toEqual([1, 42, 2, 3]);
});

it ("should move element", () => {
    let array = ['a', 'b', 'c'];
    expect(ArrayUtil.moveElement(array, 0, 3)).toEqual(['b', 'c', 'a']);
    expect(ArrayUtil.moveElement(array, 1, 2)).toEqual(['a', 'c', 'b']);
    expect(ArrayUtil.moveElement(array, 2, 0)).toEqual(['c', 'a', 'b']);
});
