import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Snippets.css";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import { MainButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";
import SnippetForm from "../../forms/SnippetForm";
import { getAxios } from "../../api";
import { Link } from "react-router-dom";
import SnippetItem from "../../components/SnippetItem/SnippetItem";

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
      <div className="flex justify-between snippets-header">
        <div className="flex flex-col ">
          <H1 className="mr-4">Code Snippets</H1>
          <H2Subtitle>
            Save your favourite functions and share them with others (if you
            choose). Use the Kanlen extension to import them directly into your
            code.
          </H2Subtitle>
        </div>
        <div className="w-fit">
          <MainButton default onClick={addSnippetModelHandler}>
            Add Snippet
          </MainButton>
        </div>
      </div>

      <div className="snippet-list grid grid-cols-5 mt-5 gap-4">
        {snippets.length > 0 &&
          snippets.map((snippet, id) => (
            <SnippetItem key={id} snippet={snippet} />
          ))}
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore")(observer(Snippets));
