import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';

export const Counter = () => {

    const [number, setNumber] = useState<number>(0)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const getMaxValueFromLocalstorage = ()=> {
        let maxValueFromLocalStorage = localStorage.getItem('maxValue')
        if (maxValueFromLocalStorage) {
            return JSON.parse(maxValueFromLocalStorage)
        } else {
            return 5
        }
    }

    const getStartValueFromLocalstorage = ()=> {
        let startValueFromLocalStorage = localStorage.getItem('startValue')
        if (startValueFromLocalStorage) {
            return JSON.parse(startValueFromLocalStorage)
        } else {
            return 0
        }
    }

    const [maxValue, setMaxValue] = useState(getMaxValueFromLocalstorage)
    const [startValue, setStartValue] = useState(getStartValueFromLocalstorage)

    const numberChange = () => {
        setNumber(number + 1);
        (number < maxValue - 1 ? setDisableButton(false) : setDisableButton(true))
    }

    const numberReset = () => {
        setNumber(startValue)
        setDisableButton(false)
    }

    const changeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            setMaxValue(Number(e.currentTarget.value))
        }
    }

    useEffect(()=> {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])

    useEffect(()=> {
        localStorage.setItem('startValue', JSON.stringify(startValue))
    }, [startValue])

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)>-2 && Number(e.currentTarget.value)<25) {
            setStartValue(Number(e.currentTarget.value))
        }
    }

    const setButton = () => {
        if (maxValue > startValue && startValue >= 0) {
            setNumber(startValue)
        }
    }

    const incorrectMaxValue = maxValue < 0 || maxValue <= startValue
    const incorrectStartValue = startValue < 0 || startValue === maxValue
    const incorrectValue = startValue < 0 || maxValue < 0 || startValue === maxValue || startValue > maxValue

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div className={incorrectMaxValue ? s.settingsError : ''}>Max value:<input onChange={changeMaxValue} value={maxValue} type={'number'}/></div>
                    <div className={incorrectStartValue ? s.settingsError : ''}>Start value:<input onChange={changeStartValue} value={startValue} type={'number'}/></div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={setButton}
                            disabled={incorrectValue}/>
                </div>
            </div>
            <div className={s.counter}>
                {incorrectValue
                    ? <div className={s.error}>Incorrect value!</div>
                    : <div className={number === maxValue ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{number}</div>}
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={number === 0}/>
                </div>
            </div>
        </div>
    );
};
