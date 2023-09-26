import React, {useState} from 'react';
import s from './Counter.module.css'
import {Button} from './Button';

export const Counter = () => {

    const [number, setNumber] = useState<number>(0)
    const [disableButton, setDisableButton] = useState<boolean>(false)

    const numberChange = () => {
        setNumber(number + 1);
        (number < 4 ? setDisableButton(false) : setDisableButton(true))
    }

    const numberReset = () => {
        setNumber(0)
        setDisableButton(false)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settings}>
                    <div>Max value:<input type={'number'}/></div>
                    <div>Start value:<input type={'number'}/></div>
                </div>
                <div className={s.buttons}>
                    <Button name={'set'} callBack={()=>{}} disabled={false}/>
                </div>
            </div>
            <div className={s.counter}>
                <div className={number === 5 ? (`${s.tabloChange} + ${s.tablo}`) : s.tablo}>{number}</div>
                <div className={s.buttons}>
                    <Button name={'inc'} callBack={numberChange} disabled={disableButton}/>
                    <Button name={'reset'} callBack={numberReset} disabled={number === 0}/>
                </div>
            </div>
        </div>
    );
};
