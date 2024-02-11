import {counterReducer} from './CounterReducer';

test('number should increase', ()=> {
    const startState = {
        num: 0,
        disableButton: true,
        maxValue: 0,
        startValue: 0,
        valueChanges: true
    }

    const endState = counterReducer(startState, {type: 'INCREASE-NUMBER', payload: {number: startState.num}})

    expect(endState.num).toBe(1)
    expect(endState.maxValue).toBe(0)
})