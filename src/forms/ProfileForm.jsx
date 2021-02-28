import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { H2 } from "../components/Headings/Headings";
import InputWrapper from "../components/InputWrapper/InputWrapper";
import Upload from "../components/Upload/Upload";
import isEmpty from "../helpers/isEmpty";
import UserStore from "../stores/UserStore";

const ProfileForm = ({ user }) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    avatar: "",
    bio: "",
    twitter: "",
    devto: "",
    stackoverflow: "",
    facebook: "",
    instagram: "",
    github: "",
    website: "",
    youtube: "",
    podcast: "",
    username: "",
  });
  const [files, setFiles] = useState([]);
  const pond = React.createRef(null);
  const [username, setUsername] = useState(false);

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

    if (state.bio && state.bio.length > 250) {
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

    window.location.reload();
  };

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  if (isEmpty(state)) return null;

  const checkUsername = (e) => {
    const username = e.target.value.replace(/[\W]/gi, "");
    getAxios({
      url: "/user/username",
      params: {
        username: e.target.value,
      },
    }).then((res) => {
      if (
        res.response?.status === 401 &&
        res.response?.data.custom === "USERNAME_EXISTS"
      ) {
        setUsername(true);
      } else {
        setUsername(false);
      }
    });
    setState({ ...state, username });
  };

  return (
    <form className="container max-w-screen-sm">
      <div className="field-group">
        <FormLabel text="Display Picture" name="avatar" />
        <Upload files={files} setFiles={setFiles} ref={pond} />
      </div>
      <div className="field-group">
        <FormLabel text="Name" name="name" />
        <InputWrapper icon={<i class="fas fa-signature"></i>}>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="John Smith"
            value={state.name}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>

      <div className="field-group">
        <FormLabel text="Username" name="username" />
        <InputWrapper icon={<i class="fas fa-at"></i>}>
          <input
            type="text"
            name="nausernameme"
            className="form-input"
            placeholder="John Smith"
            value={state.username}
            onChange={(e) => checkUsername(e)}
          />
        </InputWrapper>
        {username && (
          <p className="text-red-400 text-right mt-2">Username exists</p>
        )}
      </div>

      <div className="field-group">
        <FormLabel text="Bio" name="bio" />
        <textarea
          className="form-input"
          placeholder="Tell us about yourself..."
          rows={5}
          onChange={(e) => inputHandler(e)}
          value={state.bio}
          name="bio"
        />
        {state.bio && (
          <div className="flex justify-end mt-2">
            <p className="text-yellow-500">{`${state.bio.length}/250`}</p>
            {state.bio.length > 250 && (
              <p className="text-red-500 ml-2">(+{state.bio.length - 250})</p>
            )}
          </div>
        )}
      </div>

      <div className="field-group">
        <FormLabel text="Email" name="email" />
        <InputWrapper icon={<i class="fas fa-envelope"></i>}>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="user@example.com"
            value={state.email}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>

      <H2 className="mb-6 mt-6">Socials</H2>

      <div className="field-group">
        <FormLabel text="Twitter" name="twitter" />
        <InputWrapper icon={<i class="fab fa-twitter"></i>}>
          <input
            type="text"
            name="twitter"
            className="form-input"
            placeholder="@username"
            value={state.twitter}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Facebook" name="facebook" />
        <InputWrapper icon={<i class="fab fa-facebook"></i>}>
          <input
            type="text"
            name="facebook"
            className="form-input"
            placeholder="link to Facebook profile"
            value={state.facebook}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Dev.to" name="devto" />
        <InputWrapper icon={<i class="fab fa-dev"></i>}>
          <input
            type="text"
            name="devto"
            className="form-input"
            placeholder="link to Dev.to profile"
            value={state.devto}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="StackOverflow" name="stackoverflow" />
        <InputWrapper icon={<i class="fab fa-stack-overflow"></i>}>
          <input
            type="text"
            name="stackoverflow"
            className="form-input"
            placeholder="link to StackOverflow profile"
            value={state.stackoverflow}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Instagram" name="instagram" />
        <InputWrapper icon={<i class="fab fa-instagram"></i>}>
          <input
            type="text"
            name="instagram"
            className="form-input"
            placeholder="@username"
            value={state.instagram}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Website" name="website" />
        <InputWrapper icon={<i class="fas fa-globe-americas"></i>}>
          <input
            type="text"
            name="website"
            className="form-input"
            placeholder="link to your website"
            value={state.website}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Github" name="github" />
        <InputWrapper icon={<i class="fab fa-github"></i>}>
          <input
            type="text"
            name="github"
            className="form-input"
            placeholder="@username"
            value={state.github}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Podcast" name="podcast" />
        <InputWrapper icon={<i class="fas fa-microphone-alt"></i>}>
          <input
            type="text"
            name="podcast"
            className="form-input"
            placeholder="link to your podcast"
            value={state.podcast}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      <div className="field-group">
        <FormLabel text="Youtube" name="youtube" />
        <InputWrapper icon={<i class="fab fa-youtube"></i>}>
          <input
            type="text"
            name="youtube"
            className="form-input"
            placeholder="link to your Youtube channel"
            value={state.youtube}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>
      {buttonState()}
    </form>
  );
};

export default ProfileForm;
