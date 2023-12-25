export type InitialStateType = typeof initialState

const initialState = {
    num: 0,
    disableButton: true,
    maxValue: 0,
    startValue: 0,
    valueChanges: true
}

export const counterReducer = (state: InitialStateType = initialState, action: CounterReducerType): InitialStateType => {
    switch (action.type) {
        case 'INCREASE-NUMBER': {
            if (state.num+1 === state.maxValue) {
                return {...state, num: state.num + 1, disableButton: true}
            }
            if (state.num < state.maxValue) {
                return {...state, num: state.num + 1, disableButton: false}
            } else {
                return {...state, disableButton: true}
            }
        }
        case 'SET-START-VALUE': {
            return {...state, startValue: action.payload.startValue, valueChanges: true}
        }
        case 'SET-MAX-VALUE': {
            return {...state, maxValue: action.payload.maxValue, valueChanges: true}
        }
        case 'NUMBER-RESET': {
            return {...state, num: state.startValue, disableButton: false}
        }
        case 'SET-BUTTON': {
            return {...state, num: state.startValue, valueChanges: false, disableButton: false}
        }
        default: {
            return state
        }
    }
}

type CounterReducerType = IncreaseNumberACType | SetStartValueACType | numberResetACType | SetMaxValueACType | setButtonACType

export type IncreaseNumberACType = ReturnType<typeof increaseNumberAC>
export const increaseNumberAC = () => {
    return {
        type: 'INCREASE-NUMBER',
        payload: {}
    } as const
}

export type SetStartValueACType = ReturnType<typeof setStartValueAC>
export const setStartValueAC = (startValue: number) => {
    return {
        type: 'SET-START-VALUE',
        payload: {startValue}
    } as const
}

export type SetMaxValueACType = ReturnType<typeof setMaxValueAC>
export const setMaxValueAC = (maxValue: number) => {
    return {
        type: 'SET-MAX-VALUE',
        payload: {maxValue}
    } as const
}

export type numberResetACType = ReturnType<typeof numberResetAC>
export const numberResetAC = () => {
    return {
        type: 'NUMBER-RESET'
    } as const
}

export type setButtonACType = ReturnType<typeof setButtonAC>
export const setButtonAC = () => {
    return {
        type: 'SET-BUTTON'
    } as const
}

