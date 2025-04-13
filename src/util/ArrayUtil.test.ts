import ArrayUtil from "./ArrayUtil";

it("should insert into empty", () => {
    let array = [] as number[];
    expect(ArrayUtil.insert(array, 1, 0)).toEqual([1]);
});


it("should insert into middle", () => {
    let array = [1, 2, 3] as number[];
    expect(ArrayUtil.insert(array, 42, 1)).toEqual([1, 42, 2, 3]);
});
