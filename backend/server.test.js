//This is an example of a unit test!
//Make sure to uncomment line 94 is server.js to run this test, however.

import { describe, it, expect } from "vitest";
import { appendTask, removeTask, getNumberOfTasks } from "server";

describe('test of getNumberOfTasks', () => {
    it('Check if is empty on start', () => {
        expect(getNumberOfTasks()).toBe(0);
    })
    /* you may want to write your own tests too! */
})

describe('test of appendTask', () => {
    it('Check if the task is added', () => {
        var tasks = [];
        appendTask({"category": undefined, "text": todo, "isDone": false, "priority": 'Important'})
        expect(tasks).toBe([{"category": undefined, "text": todo, "isDone": false, "priority": 'Important'}]);
    })
    /* you may want to write your own tests too! */
})

describe('test of removeTask', () => {
    it('Check if the task is added', () => {
        var tasks = [{"category": undefined, "text": todo, "isDone": false, "priority": 'Important'}];
        removeTask(0);
        expect(tasks).toBe([]);
    })
    /* you may want to write your own tests too! */
})