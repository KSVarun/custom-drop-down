import React, { useState } from "react";

export default function App() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [options, setOptions] = useState([{ value: "Default", id: 0 }]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  const renderOptions = () => {
    return (
      <div className="option-delete-container">
        {openDropDown
          ? options.map((option) => (
              <div className="option-delete-tab" key={option.id}>
                <div
                  className="options"
                  onClick={() => handleOptionSelection(option)}
                >
                  {option.value}
                </div>
                {option.value !== "Default" ? (
                  <div
                    className="delete-icon"
                    onClick={() => handleDelete(option.id)}
                  >
                    D
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </div>
    );
  };

  const handleOptionSelection = (option) => {
    setInputValue(option.value);
    const selectedOption = {
      value: option.value,
      id: option.id,
    };
    setSelectedOption(selectedOption);
    setOpenDropDown(false);
  };

  const handleDelete = (optionId) => {
    const indexOfOptionToDelete = options.findIndex(
      (option) => option.id === optionId
    );
    if (inputValue === options[indexOfOptionToDelete].value) {
      setInputValue("");
    }
    let updatedOptions = [...options];
    updatedOptions.splice(indexOfOptionToDelete, 1);
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    if (inputValue.length <= 0) {
      const inputFiled = document.querySelector("#custom-dd");
      inputFiled.focus();
    } else {
      let updatedOptions = [];
      const newOption = {
        id: Math.random(),
        value: inputValue,
      };
      updatedOptions = [...options, newOption];
      setInputValue("");
      setOptions(updatedOptions);
      if (!openDropDown) {
        setOpenDropDown(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="top-container">
        <input
          id="custom-dd"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div
          onClick={() => setOpenDropDown(!openDropDown)}
          className={openDropDown ? "open-drop-down" : "close-drop-down"}
        >
          ^
        </div>
        <div className="save" onClick={() => handleSave()}>
          Save
        </div>
      </div>
      {renderOptions()}
    </div>
  );
}
