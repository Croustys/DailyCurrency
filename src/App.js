import React, { useEffect, useState } from "react";
import CurrencyInputRow from "./CurrencyInputRow";
import "./App.css";

const APIKEY = process.env.API_KEY;
const URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKEY}`;

function App() {
  const [options, setCOptions] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);

  let toAmount, fromAmount;
  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * rate;
  } else {
    toAmount = amount;
    fromAmount = amount / rate;
  }

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const first = Object.keys(data.rates)[62];
        setCOptions([data.base, ...Object.keys(data.rates)]);
        setFrom(data.base);
        setTo(first);
        setRate(data.rates[first]);
      });
  }, []);

  useEffect(() => {
    if (from != null && to != null) {
      fetch(`${URL}&from=${from}&to=${to}`)
        .then((res) => res.json())
        .then((data) => setRate(data.rates[to]));
    }
  }, [from, to]);
  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountFrom(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountFrom(false);
  }
  return (
    <div className="wrapper">
      <h1>Daily Currency</h1>
      <CurrencyInputRow
        options={options}
        selectCurrency={from}
        onChangeCurrency={(e) => setFrom(e.target.value)}
        onChangeAmount={handleFromAmount}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyInputRow
        options={options}
        selectCurrency={to}
        onChangeCurrency={(e) => setTo(e.target.value)}
        onChangeAmount={handleToAmount}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
