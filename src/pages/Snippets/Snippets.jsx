import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Snippets.css";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import { MinimalButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";
import SnippetForm from "../../forms/SnippetForm";
import { getAxios } from "../../api";
import SnippetItem from "../../components/SnippetItem/SnippetItem";

const Snippets = ({ ModalStore, UserStore }) => {
  const [snippets, setSnippets] = useState([]);
  const [pullingGists, setPullingGists] = useState(false);
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

  const getGists = async () => {
    setPullingGists(true);
    const gists = await getAxios({
      url: "/github/gists",
    }).then((res) => res.gists);

    await getAxios({
      url: "/github/convert",
      method: "post",
      data: {
        gists,
      },
    }).then((res) => {
      if (res) {
        window.location.reload();
      }
    });
    setPullingGists(false);
  };
  return (
    <DisplayWrapper>
      <div className="flex snippets-header">
        <div className="flex flex-col">
          <H1 className="mr-4">Code Snippets</H1>
          <H2Subtitle>
            Save your favourite functions and share them with others (if you
            choose). Use the Kanlen extension to import them directly into your
            code.
          </H2Subtitle>
        </div>
        <div className="w-fit snippet-actions">
          {UserStore.user.githubAccessToken &&
            (pullingGists ? (
              <MinimalButton
                classes="text-yellow-400 mr-4 "
                onClick={() => getGists()}
              >
                <i className="fas fa-sync mr-2 text-sm animate-spin"></i>
                pulling gists
              </MinimalButton>
            ) : (
              <MinimalButton classes="text-yellow-400 mr-4" onClick={getGists}>
                <i className="fas fa-sync mr-2 text-sm"></i>
                pull gists
              </MinimalButton>
            ))}
          <MinimalButton
            classes="text-yellow-400"
            onClick={addSnippetModelHandler}
          >
            <i className="fas fa-plus mr-2 text-sm"></i>
            add snippet
          </MinimalButton>
        </div>
      </div>

      <div className="snippet-list grid grid-cols-3 mt-5 gap-4">
        {snippets.length > 0 &&
          snippets.map((snippet, id) => (
            <SnippetItem key={id} snippet={snippet} />
          ))}
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore", "UserStore")(observer(Snippets));
