import React from "react";
import { Select } from "react-materialize";

const DifficultySelectDropdown = () => {
  return (
    <Select
      id="difficulty-select"
      multiple={false}
      options={{
        dropdownOptions: {
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          outDuration: 250,
        },
      }}
      value={"EASY"}
    >
      <option disabled value="">
        Set Difficulty
      </option>
      <option value="EASY">EASY</option>
      <option value="MEDIUM">MEDIUM</option>
      <option value="HARD">HARD</option>
    </Select>
  );
};

export default DifficultySelectDropdown;
