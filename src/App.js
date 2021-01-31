import React, { useEffect, useState } from "react";

export default function App() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [options, setOptions] = useState([{ value: "Default", id: 0 }]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [inputDisabled, setInputDisabled] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Save");
  const [focusedInputField, setFocusedToInputField] = useState(false);
  const [className, setClassName] = useState({
    container: "container",
    inputTag: "custom-dd",
    saveUpdateButton: "save",
    toggleButton: "light",
    optionsTab: "options-delete-tab",
  });
  const [darkMode, setDarkMode] = useState(false);

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
                  onClick={(e) => handleOptionSelection(option, e)}
                >
                  {option.value}
                </div>
                {option.id !== 0 ? (
                  <div
                    className="delete-icon"
                    onClick={(e) => handleDelete(option.id, e)}
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

  const handleOptionSelection = (option, e) => {
    e.stopPropagation();
    setInputValue(option.value);
    const selectedOption = {
      value: option.value,
      id: option.id,
    };
    setSelectedOption(selectedOption);
    setOpenDropDown(false);
    setInputDisabled(true);
  };

  const handleDelete = (optionId, e) => {
    e.stopPropagation();
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
    setOpenDropDown(true);
  };

  function setFocusToInputField() {
    const inputFieldLight = document.querySelector("#custom-dd");
    if (inputFieldLight) {
      inputFieldLight.focus();
    } else {
      const inputFieldDark = document.querySelector("#custom-dd-dark");
      inputFieldDark.focus();
    }
  }

  const handleSave = (e) => {
    e.stopPropagation();
    if (inputValue.length <= 0) {
      setFocusToInputField();
    } else {
      let updatedOptions = [];
      if (Object.keys(selectedOption).length <= 0) {
        const newOption = {
          id: Math.random(),
          value: inputValue,
        };
        handleOptionSelection(newOption, e);
        updatedOptions = [...options, newOption];
      } else if (selectedOption.id === options[0].id) {
        const newOption = {
          id: Math.random(),
          value: inputValue,
        };
        handleOptionSelection(newOption, e);
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
        handleOptionSelection(updateSelectedOption, e);
      }
      setOptions(updatedOptions);
      setOpenDropDown(true);
    }
    setButtonTitle("Save");
  };

  const handleOptionEdit = (e) => {
    e.stopPropagation();
    setInputDisabled(false);
    if (selectedOption.id !== options[0].id) {
      setButtonTitle("Update");
    }
    setFocusedToInputField(true);
  };

  function handleEnterKeyPress(target) {
    if (target.charCode === 13) {
      handleSave(target);
    }
  }

  const handleDarkModeToggle = (e) => {
    e.stopPropagation();
    if (!darkMode) {
      setDarkMode(true);
      setClassName({
        container: "container-dark",
        inputTag: "custom-dd-dark",
        saveUpdateButton: "save-dark",
        toggleButton: "dark",
        optionsTab: "options-delete-tab-dark",
      });
    } else {
      setDarkMode(false);
      setClassName({
        container: "container",
        inputTag: "custom-dd",
        saveUpdateButton: "save",
        toggleButton: "light",
        optionsTab: "options-delete-tab",
      });
    }
  };

  return (
    <div className={`${className.container}`}>
      <div className="top-container">
        <input
          id={`${className.inputTag}`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={inputDisabled}
          onKeyPress={(e) => handleEnterKeyPress(e)}
          autocomplete="off"
        />
        <div
          className={
            inputDisabled ? "edit-option-editable" : "edit-option-uneditable"
          }
          onClick={(e) => handleOptionEdit(e)}
        >
          E
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropDown(!openDropDown);
          }}
          className={openDropDown ? "open-drop-down" : "close-drop-down"}
        >
          ^
        </div>
        <div
          className={`${className.saveUpdateButton}`}
          onClick={(e) => handleSave(e)}
        >
          {buttonTitle}
        </div>
        <div
          className="toggle-dark-mode-container"
          onClick={(e) => handleDarkModeToggle(e)}
        >
          <div className={`toggle-dark-mode ${className.toggleButton}`}></div>
        </div>
      </div>
      {renderOptions()}
    </div>
  );
}
