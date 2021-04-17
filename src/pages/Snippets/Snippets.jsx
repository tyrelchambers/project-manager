import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Snippets.css";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import { MinimalButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";
import SnippetForm from "../../forms/SnippetForm";
import { getAxios } from "../../api";
import SnippetItem from "../../components/SnippetItem/SnippetItem";
import { Link } from "react-router-dom";

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
          <div className="snippet-actions mt-4">
            {UserStore.user.githubAccessToken &&
              (pullingGists ? (
                <MinimalButton
                  classes="text-yellow-400 mr-4 font-bold"
                  onClick={() => getGists()}
                >
                  <i className="fas fa-sync mr-2 text-sm animate-spin"></i>
                  pulling gists
                </MinimalButton>
              ) : (
                <MinimalButton
                  classes="text-yellow-400 mr-4 font-bold"
                  onClick={getGists}
                >
                  <i className="fas fa-sync mr-2 text-sm"></i>
                  pull gists
                </MinimalButton>
              ))}
            <Link
              to="/snippet/new"
              className="text-yellow-400 underline font-bold"
            >
              <i class="fas fa-pencil-alt mr-2"></i>
              Create a snippet
            </Link>
          </div>
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
