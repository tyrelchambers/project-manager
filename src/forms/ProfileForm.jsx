import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import Upload from "../components/Upload/Upload";
import isEmpty from "../helpers/isEmpty";
import UserStore from "../stores/UserStore";

const ProfileForm = ({ user }) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    avatar: "",
    bio: "",
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

    if (state.bio.length > 250) {
      return toast.error("Bio is too long");
    }

    await getAxios({
      url: "/user/update",
      method: "post",
      data: {
        state: {
          ...state,
          avatar: fileEndpoint,
        },
      },
    });
  };

  if (isEmpty(state)) return null;

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
        <FormLabel text="Bio" name="bio" />
        <textarea
          className="form-input"
          placeholder="Tell us about yourself..."
          rows={5}
          onChange={(e) => setState({ ...state, bio: e.target.value })}
          value={state.bio}
        />
        <div className="flex justify-end mt-2">
          <p className="text-yellow-500">{`${state.bio.length}/250`}</p>
          {state.bio.length > 250 && (
            <p className="text-red-500 ml-2">(+{state.bio.length - 250})</p>
          )}
        </div>
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

export default ProfileForm;
