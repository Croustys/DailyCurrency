import React from "react";
import "./App.css";

export default function CurrencyInputRow({
  options,
  selectCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
}) {
  return (
    <div>
      <input
        className="input"
        onChange={onChangeAmount}
        value={String(amount)}
        type="number"
      ></input>
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {options.map((op, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
