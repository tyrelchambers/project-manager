import React from "react";

const List = ({ onClick, data }) => {
  return (
    <div
      className="flex justify-between items-center p-2 cursor-pointer"
      onClick={() => onClick(data)}
    >
      <div className="flex items-center">
        <i className="fas fa-times mr-4 text-red-500"></i>
        <p className="font-bold text-white">{data.name}</p>
      </div>
      {data?.version && (
        <p className="text-pink-500 italic">
          <i className="fas fa-at"></i> {data.version}
        </p>
      )}
    </div>
  );
};

export default List;
