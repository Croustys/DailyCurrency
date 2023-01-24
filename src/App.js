import React, { useEffect, useState } from "react";
import CurrencyInputRow from "./CurrencyInputRow";
import axios from "axios";
import "./App.css";

const APIKEY = "7966af3e6f18f393d597";
const URL = `https://free.currconv.com/api/v7/`;
const URL_countries = `https://free.currconv.com/api/v7/currencies?apiKey=${APIKEY}`;

function App() {
  const [options, setCOptions] = useState([]);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("HUF");
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
    async function fetch() {
      const {
        data: { results },
      } = await axios.get(URL_countries);
      setCOptions([...Object.keys(results)]);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      if (from != null && to != null) {
        const { data } = await axios.get(
          `${URL}convert?q=${from}_${to},${to}_${from}&compact=ultra&apiKey=${APIKEY}`
        );
        const [valTo] = Object.values(data);
        setRate(valTo);
      }
    }
    fetch();
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
        amount={!amountFrom ? fromAmount.toFixed(2) : fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyInputRow
        options={options}
        selectCurrency={to}
        onChangeCurrency={(e) => setTo(e.target.value)}
        onChangeAmount={handleToAmount}
        amount={amountFrom ? toAmount.toFixed(2) : toAmount}
      />
    </div>
  );
}

export default App;
