import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { getAxios } from "../../api/index";
import { H2, H3 } from "../../components/Headings/Headings";
import "./Projects.css";
import useStorage from "../../hooks/useStorage";
import { MainButton } from "../../components/Buttons/Buttons";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const [token, _] = useStorage("token");
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/projects/me",
      }).then((res) => {
        setProjects(res.projects);
      });
    };

    fn();
  }, []);

  const downloadHandler = ({ appName }) => {
    const downloadWindow = window.open(``, "_blank");
    downloadWindow.window.location = `${process.env.REACT_APP_BACKEND}/api/v1/projects/download?appName=${appName}&token=${token}&s3=true`;
    setTimeout(() => {
      downloadWindow.close();
    }, 2000);
  };

  const selectHandler = (id) => {
    const clone = selected;
    if (!clone.includes(id)) {
      setSelected([...clone, id]);
    } else {
      const clone = [...selected];
      setSelected(clone.filter((x) => x !== id));
    }
  };

  const deleteHandler = () => {
    getAxios({
      url: "/projects/delete",
      method: "delete",
      data: selected,
    });
  };

  return (
    <DisplayWrapper>
      <div className="flex justify-between">
        <H2>Projects</H2>
        <div className="w-fit">
          <Link className="btn primary bg-pink-500 " to="/project/new">
            New Project
          </Link>
        </div>
      </div>
      <div className=" flex items-center mt-4 w-fit">
        <div className="mr-4">
          {selected.length > 0 ? (
            <MainButton default onClick={() => setSelected([])}>
              Deselect All
            </MainButton>
          ) : (
            <MainButton
              classes="bg-gray-700 text-white"
              onClick={() => setSelected(projects)}
            >
              Select All
            </MainButton>
          )}
        </div>

        {selected.length > 0 && (
          <MainButton delete onClick={deleteHandler}>
            Delete
          </MainButton>
        )}
      </div>
      <div className="project-list-wrapper grid grid-cols-2 mt-5 gap-4">
        {projects.length > 0 &&
          projects.map((project, id) => (
            <div
              className={`p-2 pl-4 pr-4 flex bg-gray-900 rounded-lg items-center ${
                selected.includes(project) ? "selected-project" : ""
              }`}
              key={project.uuid}
            >
              <input
                type="checkbox"
                name="delete"
                id="deleteHandler"
                className="mr-2"
                checked={selected.includes(project)}
                onChange={() => selectHandler(project)}
              />
              <div className="flex justify-between w-full items-center">
                <H3>{project.name}</H3>
                <div
                  className="flex items-center "
                  onClick={() => downloadHandler({ appName: project.name })}
                >
                  <i className="fas fa-download text-pink-500"></i>
                </div>
              </div>
            </div>
          ))}
      </div>
    </DisplayWrapper>
  );
};

export default Projects;
