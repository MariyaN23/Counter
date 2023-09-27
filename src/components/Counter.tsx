import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';

export const Counter = () => {

    const [number, setNumber] = useState<number>(0)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const [maxValue, setMaxValue] = useState(5)
    const [startValue, setStartValue] = useState(0)

    const numberChange = () => {
        setNumber(number + 1);
        (number < maxValue - 1 ? setDisableButton(false) : setDisableButton(true))
    }

    const numberReset = () => {
        setNumber(0)
        setDisableButton(false)
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(Number(e.currentTarget.value))
    }

    useEffect(()=> {
        localStorage.setItem('setMaxValue', JSON.stringify(maxValue))
    }, [maxValue])

    useEffect(()=> {
        localStorage.setItem('setStartValue', JSON.stringify(startValue))
    }, [startValue])

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(Number(e.currentTarget.value))
    }

    /*useEffect(()=> {
        let startValueLocal = localStorage.getItem('setStartValue')
        if (startValueLocal) {
            let newStartValue = JSON.parse(startValueLocal)
            setStartValue(newStartValue)
        }
    }, [])*/

    const setButton = () => {
        if (maxValue > startValue && startValue >= 0) {
            setNumber(startValue)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div>Max value:<input onChange={changeMaxValue} value={maxValue} type={'number'}/></div>
                    <div>Start value:<input onChange={changeStartValue} value={startValue} type={'number'}/></div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={setButton}
                            disabled={maxValue <= startValue || startValue < 0 || maxValue < 0}/>
                </div>
            </div>
            <div className={s.counter}>
                <div className={number === maxValue ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{number}</div>
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={number === 0}/>
                </div>
            </div>
        </div>
    );
};
