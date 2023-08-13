import { getCharsBetweenIndices } from "./get-chars-between-indices";

describe("getCharsBetweenIndices util", () => {
  it("should return expected result when given valid input", () => {
    const inputStr = "Hello World";
    const inputIndices = [2, 7];
    const expectedResult = {
      result: "llo Wo",
      before: "He",
      after: "rld",
    };

    expect(getCharsBetweenIndices(inputStr, inputIndices)).toStrictEqual(expectedResult);
  });

  it("should return empty strings for before and after when start and end indices are 0 and the length of the string - 1, respectively", () => {
    const inputStr = "Hello World";
    const inputIndices = [0, 10];
    const expectedResult = {
      result: "Hello World",
      before: "",
      after: "",
    };

    expect(getCharsBetweenIndices(inputStr, inputIndices)).toStrictEqual(expectedResult);
  });

  it("should return a single character when start and end indices are the same", () => {
    const inputStr = "Hello World";
    const inputIndices = [3, 3];
    const expectedResult = {
      result: "l",
      before: "Hel",
      after: "o World",
    };

    expect(getCharsBetweenIndices(inputStr, inputIndices)).toStrictEqual(expectedResult);
  });
});
