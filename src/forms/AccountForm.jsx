import React, { useEffect, useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import Upload from "../components/Upload/Upload";
import UserStore from "../stores/UserStore";

const AccountForm = ({ user }) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    avatar: "",
  });
  const [files, setFiles] = useState([]);
  const pond = React.createRef(null);

  useEffect(() => {
    setState({
      ...user,
    });
  }, [user]);

  const buttonState = () => {
    if (state.email || state.name) {
      return (
        <MainButton default onClick={(e) => submitHandler(e)}>
          Save info &amp; refresh
        </MainButton>
      );
    } else {
      return (
        <MainButton muted disabled>
          Save info &amp; refresh
        </MainButton>
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let fileEndpoint = UserStore.user.avatar || "";
    if (pond.current && pond.current.getFiles().length > 0) {
      const files = await pond.current.processFiles().then((res) => res[0]);
      fileEndpoint = files.serverId;
    }
    await getAxios({
      url: "/account/update",
      method: "patch",
      data: {
        state: {
          ...state,
          avatar: fileEndpoint,
        },
      },
    });
  };

  return (
    <form className="container max-w-screen-sm">
      <div className="field-group">
        <FormLabel text="Display Picture" name="avatar" />
        <Upload files={files} setFiles={setFiles} ref={pond} />
      </div>
      <div className="field-group">
        <FormLabel text="Name" name="name" />
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="John Smith"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>
      <div className="field-group">
        <FormLabel text="Email" name="email" />
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="user@example.com"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>
      {buttonState()}
    </form>
  );
};

export default AccountForm;
