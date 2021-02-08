import React, { useEffect, useState } from "react";

const Callout = ({ text, link, id }) => {
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getIds();
  }, []);

  const getIds = async () => {
    const ids =
      (await JSON.parse(window.localStorage.getItem("blocked-callouts"))) || [];
    setState(ids);

    if (!ids.includes(id)) {
      setShow(true);
    }
  };

  const closeCallout = () => {
    const clone = [...state];
    clone.push(id);
    window.localStorage.setItem("blocked-callouts", JSON.stringify(clone));
    setState(clone);
    setShow(false);
  };

  return show ? (
    <div
      className="callout flex p-4 bg-white rounded-lg mt-4 box-shadow"
      id={id}
    >
      <i className="fas fa-bullhorn mr-4"></i>
      <p className="font-bold text-gray-800">
        {text}{" "}
        <a
          href={link}
          className="text-pink-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </a>
      </p>

      <i
        className="fas fa-times text-gray-500 cursor-pointer"
        onClick={closeCallout}
      ></i>
    </div>
  ) : null;
};

export default Callout;
