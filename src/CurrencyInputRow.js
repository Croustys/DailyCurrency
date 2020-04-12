import React from 'react'

export default function CurrencyInputRow(prop) {
    const { options, selectCurrency, onChangeCurrency, onChangeAmount, amount } = prop
    return (
        <div>
            <input className="input" onChange= {onChangeAmount} value = {String(amount)} type="number"></input>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {options.map(op => (
                    <option key={op} value={op}>{op}</option>
                ))}
            </select>
        </div>
    )
}