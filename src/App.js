import React from "react";
import { useState } from "react";
import "./styles/App.css";

import GradeInput from "./components/GradeInput";

const uri = `http://localhost:5000/api`;

function App() {
  const [sbj, setSbj] = useState("วิชา");
  const [sbjs, setSbjs] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState({ credits: 0, GPA: "-" });

  const handleCallApi = () => {
    // console.log(inputs);
    return fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => setOutputs(res))
      .catch((err) => {
        console.log(err);
        setOutputs({ credits: "ERROR", GPA: "Cannot connect to back-end" });
      });
  };

  let GradeInputs = () => {
    if (sbjs.length < 1) {
      return (
        <tr>
          <td colSpan="3">กรุณากดเพิ่มวิชา...</td>
        </tr>
      );
    } else {
      return sbjs.map((name, index) => {
        return (
          <GradeInput
            key={index}
            sbjname={`${index + 1}: ${name}`}
            onChange={(e) => handleInputChange(e, index)}
          />
        );
      });
    }
  };

  const handleOnAddTxtChange = (e) => {
    setSbj(e.target.value);
  };

  const handleInputChange = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    let tmpArr = [...inputs];
    if (name === "credit") tmpArr[index].credit = value;
    if (name === "grade") tmpArr[index].grade = value;
    setInputs(tmpArr);
  };

  const onAddBtn = () => {
    setSbjs([...sbjs, sbj]);
    setSbj("วิชา");
    setInputs([...inputs, { credit: 0, grade: 0 }]);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleCallApi();
  };

  return (
    <div className="App">
      <h1>Grade Calculator</h1>
      <form onSubmit={handleSubmitForm}>
        <table>
          <thead>
            <tr>
              <th>ชื่อวิชา/subjects</th>
              <th>หน่วยกิต/credits</th>
              <th>เกรด/grades</th>
            </tr>
          </thead>
          <tbody>
            {GradeInputs()}
            <tr>
              <td colSpan="3">
                ชื่อวิชา:{" "}
                <input
                  type="text"
                  value={sbj}
                  onChange={handleOnAddTxtChange}
                />
                <button type="button" onClick={onAddBtn}>
                  + เพิ่มวิชา
                </button>
                <br />
                <button type="submit">คำนวณ / Calc</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                หน่วยกิตทั้งหมดที่ได้รับ / All credits earned
              </td>
              <td>{outputs.credits}</td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                เกรดเฉลี่ย / GPA
              </td>
              <td>{outputs.GPA}</td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
}

export default App;
