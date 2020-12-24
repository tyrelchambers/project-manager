import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Snippets.css";
import { H2 } from "../../components/Headings/Headings";
import { MainButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";
import SnippetForm from "../../forms/SnippetForm";
import { getAxios } from "../../api";
import { Link } from "react-router-dom";
import { formatUrl } from "../../helpers/formatUrl";
const Snippets = ({ ModalStore }) => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/snippets/me",
      }).then((res) => {
        setSnippets(res.snippets);
      });
    };

    fn();
  }, []);

  const addSnippetModelHandler = () => {
    ModalStore.setRender(<SnippetForm />);
    ModalStore.setIsOpen(true);
  };
  return (
    <DisplayWrapper>
      <div className="flex justify-between">
        <H2 className="mr-4">Code Snippets</H2>

        <div className="w-fit">
          <MainButton default onClick={addSnippetModelHandler}>
            Add Snippet
          </MainButton>
        </div>
      </div>

      <div className="snippet-list grid grid-cols-5 mt-5 gap-4">
        {snippets.length > 0 &&
          snippets.map((snippet, id) => (
            <Link
              className="flex items-center bg-gray-900 p-4 rounded-md snippet-item"
              key={id}
              to={`/snippets/${formatUrl(snippet.name)}`}
            >
              <i className="fas fa-code mr-4 text-pink-500"></i>
              <p>{snippet.name}</p>
            </Link>
          ))}
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore")(observer(Snippets));
