//This is an example of a unit test!
//Make sure to uncomment line 14 is example.js to run this test, however.

import { describe, it, expect } from "vitest";
import { hello } from "example.js";

describe('test of getResult function in example', () => {
    it('should return: hello', () => {
        expect(hello()).toBe("hello");
    })
})