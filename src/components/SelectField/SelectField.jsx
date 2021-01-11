import React, { forwardRef, useState } from "react";
import isEmpty from "../../helpers/isEmpty";
import "./SelectField.css";

const SelectField = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const { data, stateHandler, state, label, stateKey } = props;
  const dropdownHandler = (fw) => {
    setSelectedData(fw);
    stateHandler({ ...state, [stateKey]: fw });
    setIsOpen(false);
  };

  const removeHandler = () => {
    setSelectedData({});
    stateHandler({ ...state, [stateKey]: {} });
  };

  return (
    <div className="select-field-wrapper" id="selectFieldWrapper">
      <div
        className="w-full p-4 bg-gray-700 text-white rounded-md items-center flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{label}</p>
        {!isOpen ? (
          <i className="fas fa-chevron-down"></i>
        ) : (
          <i className="fas fa-chevron-up"></i>
        )}
      </div>

      {!isEmpty(selectedData) && (
        <div
          className="w-full p-4  text-white rounded-md items-center flex select-item delete mt-4"
          data-framework={selectedData.label}
          onClick={removeHandler}
        >
          {selectedData.icon}
          <p value={selectedData.label} className="text-white">
            {selectedData.label}
          </p>
        </div>
      )}

      {isOpen && (
        <div name="framework" id="dataSelect">
          {data.map((x, id) => (
            <div
              className="w-full p-4 bg-gray-900 text-white rounded-md items-center flex select-item mt-4"
              onClick={() => dropdownHandler(x)}
              data-framework={x.framework}
              key={id}
            >
              {x.icon}
              <div value={x.framework}>
                <p className="font-bold">{x.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <input
        type="text"
        style={{ display: "none" }}
        name={stateKey}
        ref={ref}
        value={state.framework.framework}
      />
    </div>
  );
});

export default SelectField;
