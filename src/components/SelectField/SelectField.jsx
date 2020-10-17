import React, { useState } from "react";
import { frameworks } from "../../constants/frameworks";
import isEmpty from "../../helpers/isEmpty";
import "./SelectField.css";

const SelectField = () => {
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState({});

  const dropdownHandler = (fw) => {
    setSelectedFramework(fw);
    setIsOpen(false);
  };

  const removeHandler = () => {
    setSelectedFramework({});
  };

  return (
    <div className="select-field-wrapper" id="selectFieldWrapper">
      {!selected && (
        <div
          className="w-full p-4 bg-gray-700 text-white rounded-md items-center flex justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p> Select a framework</p>
          {!isOpen ? (
            <i className="fas fa-chevron-down"></i>
          ) : (
            <i className="fas fa-chevron-up"></i>
          )}
        </div>
      )}

      {!isEmpty(selectedFramework) && (
        <div
          className="w-full p-4 bg-green-800 text-white rounded-md items-center flex select-item delete mt-4"
          data-framework={selectedFramework.framework}
          onClick={removeHandler}
        >
          {selectedFramework.icon}
          <div value={selectedFramework.framework}>
            {selectedFramework.text}
          </div>
        </div>
      )}

      {isOpen && (
        <div name="framework" id="frameworkSelect">
          {frameworks.map((x, id) => (
            <div
              className="w-full p-4 bg-gray-900 text-white rounded-md items-center flex select-item mt-4"
              onClick={() => dropdownHandler(x)}
              data-framework={x.framework}
            >
              {x.icon}
              <div key={id} value={x.framework}>
                {x.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
