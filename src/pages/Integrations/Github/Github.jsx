import React from "react";
import { MainButton } from "../../../components/Buttons/Buttons";
import { H2 } from "../../../components/Headings/Headings";
import { config } from "../../../config/config";

const Github = ({ user }) => {
  const authenticate = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${
        config[process.env.NODE_ENV].githubClient
      }&redirect_uri=${config[process.env.NODE_ENV].githubRedirect}`,
      "tab"
    );
  };

  return (
    <>
      <H2>Github</H2>
      {!user.githubAccessToken ? (
        <MainButton classes="mt-4" github onClick={authenticate}>
          <i className="fab fa-github mr-4"></i>Authenticate with Github
        </MainButton>
      ) : (
        <div className="bg-green-500 mt-4 w-fit whitespace-no-wrap p-4 items-center flex justify-center rounded-lg">
          <i className="fas fa-check mr-4 text-gray-800"></i>
          <p className="text-gray-800 font-bold">Authenticated with Github</p>
        </div>
      )}
    </>
  );
};

export default Github;
