/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from "vitest";
import { changeTheme, select } from "script1";

describe('test of changeTheme function in script1', () => {
    it('when theme study is clicked, should return: true', () => { 
        select("study");
        expect(changeTheme('study')).toBe(true);
    })
    /* you may want to write your own tests too! */
})

describe('test of changeTheme function in script1.js', () => {
    it('when theme study is clicked, should return: true', () => {        
        expect(changeTheme('vacation')).toBe(true);
    })
    /* you may want to write your own tests too! */
})

