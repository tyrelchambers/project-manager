import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Snippets.css";
import { H1, H2, H2Subtitle } from "../../components/Headings/Headings";
import { MainButton, MinimalButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";
import SnippetForm from "../../forms/SnippetForm";
import { getAxios } from "../../api";
import SnippetItem from "../../components/SnippetItem/SnippetItem";
import GistItem from "../../components/GistItem/GistItem";

const Snippets = ({ ModalStore, UserStore }) => {
  const [snippets, setSnippets] = useState([]);
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/snippets/me",
      }).then((res) => {
        setSnippets(res.snippets);
      });

      getGists();
    };

    fn();
  }, []);

  const addSnippetModelHandler = () => {
    ModalStore.setRender(<SnippetForm />);
    ModalStore.setIsOpen(true);
  };

  const getGists = async () => {
    const gists = await getAxios({
      url: "/github/gists",
    }).then((res) => res.gists);

    setGists(gists);
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

      <div className="flex items-center mt-10">
        <H2 className="mr-8">Github Gists</H2>
        <MinimalButton classes="text-yellow-400">
          <i className="fas fa-sync mr-2 text-yellow-400 text-sm"></i>
          pull gists
        </MinimalButton>
      </div>
      {!UserStore.user.githubAccessToken && (
        <p>Authenticate with Github to import your Gists</p>
      )}

      <div className="snippet-list grid grid-cols-5 mt-5 gap-4">
        {gists.length > 0 &&
          gists.map((gist, id) => <GistItem key={id} gist={gist} />)}
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore", "UserStore")(observer(Snippets));
