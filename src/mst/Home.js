import React, { useRef, useState } from "react";
import store from "../UsersStore";
import { observer } from "mobx-react-lite";
const Home = () => {
  const [mathMarks, setMathMarks] = useState("");
  const [englishMarks, setEnglishMarks] = useState("");
  const form = useRef(null);
  const handleCalculate = () => {
    const marks = mathMarks ? parseInt(mathMarks) : 0;
    store.setMathMarks(marks);

    const mark = englishMarks ? parseInt(englishMarks) : 0;
    store.setEnglishMarks(mark);
    if (form.current) {
      form.current.reset();
      setEnglishMarks("");
      setMathMarks("");
    }
  };

  const handleAPi = () => {
    store.getApiData();
  };

  return (
    <div>
      <h1>Hello Home</h1>
      <h2 className="App">
        {store.userName} ID Is {store.userID}
      </h2>
      <div>
        <h3>Marks in english: {store.english}</h3>
        <h3>Marks in math: {store.math}</h3>
        <h1>
          TotalMarks: {store.totalMarks} and {store.percentage.toFixed(0)}%
        </h1>
        <button onClick={handleAPi}>Api Data</button>
        <form ref={form}>
          <input
            type="number"
            placeholder="Enter English Marks"
            value={englishMarks}
            onChange={(e) => setEnglishMarks(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Math Marks"
            value={mathMarks}
            onChange={(e) => setMathMarks(e.target.value)}
          />

          <button type="button" onClick={handleCalculate}>
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
};

export default observer(Home);
