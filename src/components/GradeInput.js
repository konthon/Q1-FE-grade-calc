import React from "react";

function GradeInput(prop) {
  return (
    <tr>
      <td>{prop.sbjname}</td>
      <td>
        <input
          type="number"
          placeholder="จำนวนหน่วยกิต..."
          min="0"
          name={"credit"}
          onChange={prop.onChange}
          required
        />
      </td>
      <td>
        <select name={"grade"} onChange={prop.onChange} required>
          <option value="">เลือก...</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="F">F</option>
          <option value="W">W</option>
        </select>
      </td>
    </tr>
  );
}

export default GradeInput;
