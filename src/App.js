import React, { useEffect, useState } from "react";

export default function App() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [options, setOptions] = useState([{ value: "Default", id: 0 }]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [inputDisabled, setInputDisabled] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Save");
  const [focusedInputField, setFocusedToInputField] = useState(false);

  useEffect(() => {
    if (focusedInputField) {
      setFocusToInputField();
    }
    if (openDropDown) {
      document.addEventListener("keydown", _handleEscapeKeyDown, false);
      document.addEventListener("click", handleClickEventHandler, false);
      return () => {
        document.removeEventListener("click", handleClickEventHandler, false);
        document.removeEventListener("keydown", _handleEscapeKeyDown, false);
      };
    }
  });

  const handleClickEventHandler = (target) => {
    if (openDropDown) {
      setOpenDropDown(false);
    }
  };
  const _handleEscapeKeyDown = (target) => {
    if (target.code === "Escape" && openDropDown) {
      setOpenDropDown(false);
    }
  };

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
                {option.id !== 0 ? (
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
    setInputDisabled(true);
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
    if (selectedOption.id === optionId) {
      setSelectedOption({});
      setInputDisabled(false);
    }
  };

  function setFocusToInputField() {
    const inputFiled = document.querySelector("#custom-dd");
    inputFiled.focus();
  }

  const handleSave = () => {
    if (inputValue.length <= 0) {
      setFocusToInputField();
    } else {
      let updatedOptions = [];
      if (Object.keys(selectedOption).length <= 0) {
        const newOption = {
          id: Math.random(),
          value: inputValue,
        };
        handleOptionSelection(newOption);
        updatedOptions = [...options, newOption];
      } else if (selectedOption.id === options[0].id) {
        const newOption = {
          id: Math.random(),
          value: inputValue,
        };
        handleOptionSelection(newOption);
        updatedOptions = [...options, newOption];
      } else {
        const updateSelectedOption = {
          id: selectedOption.id,
          value: inputValue,
        };
        const optionIndex = options.findIndex(
          (option) => option.id === updateSelectedOption.id
        );
        updatedOptions = [...options];
        updatedOptions[optionIndex] = updateSelectedOption;
        handleOptionSelection(updateSelectedOption);
      }
      setOptions(updatedOptions);
      setOpenDropDown(true);
    }
    setButtonTitle("Save");
  };

  const handleOptionEdit = () => {
    setInputDisabled(false);
    if (selectedOption.id !== options[0].id) {
      setButtonTitle("Update");
    }
    setFocusedToInputField(true);
  };

  function handleEnterKeyPress(target) {
    if (target.charCode === 13) {
      handleSave();
    }
  }

  return (
    <div className="container">
      <div className="top-container">
        <input
          id="custom-dd"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={inputDisabled}
          onKeyPress={(e) => handleEnterKeyPress(e)}
        />
        <div
          className={
            inputDisabled ? "edit-option-editable" : "edit-option-uneditable"
          }
          onClick={() => handleOptionEdit()}
        >
          E
        </div>
        <div
          onClick={() => setOpenDropDown(!openDropDown)}
          className={openDropDown ? "open-drop-down" : "close-drop-down"}
        >
          ^
        </div>
        <div className="save" onClick={() => handleSave()}>
          {buttonTitle}
        </div>
      </div>
      {renderOptions()}
    </div>
  );
}
