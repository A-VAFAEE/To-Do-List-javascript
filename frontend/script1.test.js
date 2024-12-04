import { describe, it, expect } from 'vitest';
import {changeTitle, addTask, removeTask } from './script1.js';

describe('test of changeTitle function in script1.js', () => {
  it('when case is study, should return: To-do List for Study', () => {
    expect(h1.textContent).toBe('To-do List for Study');
  });
});


describe('test of addTask function in script1.js',() => {
  it('when input is apple, should return: true',() => {
    expect(addTask('apple')).toBe(apple);
  })
})


describe('test of removeTask function in script1.js',() => {
  it('when input is apple, should return: true',() => {
    expect(removeTask('apple')).toBe('');
  });
});
