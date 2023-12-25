import React, {ChangeEvent} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';
import {
    increaseNumberAC,
    InitialStateType,
    numberResetAC,
    setButtonAC,
    setMaxValueAC,
    setStartValueAC
} from './CounterReducer';

export const Counter = () => {

    const dispatch = useDispatch()
    const counterSelector = useSelector<RootState, InitialStateType>(state => state.counter)

    const numberChange = () => {
        dispatch(increaseNumberAC())
    }

    const numberReset = () => {
        dispatch(numberResetAC())
    }

    const incorrectMaxValue = counterSelector.maxValue < 0 || counterSelector.maxValue <= counterSelector.startValue
    const incorrectStartValue = counterSelector.startValue < 0 || counterSelector.startValue === counterSelector.maxValue
    const incorrectValue = counterSelector.startValue < 0 || counterSelector.maxValue < 0 || counterSelector.startValue === counterSelector.maxValue || counterSelector.startValue > counterSelector.maxValue

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) > -2 && Number(e.currentTarget.value) < 25) {
            dispatch(setMaxValueAC(Number(e.currentTarget.value)))
        }
    }

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) > -2 && Number(e.currentTarget.value) < 25) {
            dispatch(setStartValueAC(Number(e.currentTarget.value)))
        }
    }

    const setButton = () => {
        if (counterSelector.maxValue > counterSelector.startValue && counterSelector.startValue >= 0) {
            dispatch(setButtonAC())
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div className={incorrectMaxValue ? s.settingsError : ''}>
                        Max value:<input onChange={changeMaxValue} value={counterSelector.maxValue} type={'number'}/>
                    </div>
                    <div className={incorrectStartValue ? s.settingsError : ''}>
                        Start value:<input onChange={changeStartValue} value={counterSelector.startValue} type={'number'}/>
                    </div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={setButton}
                            disabled={incorrectValue || !counterSelector.valueChanges}/>
                </div>
            </div>
            <div className={s.counter}>
                {incorrectValue ? <div className={s.error}>Incorrect value!</div>
                    : counterSelector.valueChanges ? <div className={s.valueChanges}>enter values and press "set"</div>
                        : <div className={counterSelector.num === counterSelector.maxValue ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{counterSelector.num}</div>}
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={counterSelector.disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={counterSelector.num === counterSelector.startValue}/>
                </div>
            </div>
        </div>
    );
};