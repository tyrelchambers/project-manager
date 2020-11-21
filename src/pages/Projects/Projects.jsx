import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { getAxios } from "../../api/index";
import { H2, H3 } from "../../components/Headings/Headings";
import "./Projects.css";
import useStorage from "../../hooks/useStorage";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [token, _] = useStorage("token");
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/projects/me",
      }).then((res) => {
        setProjects([...res.projects]);
      });
    };

    fn();
  }, []);

  const downloadHandler = ({ appName }) => {
    const downloadWindow = window.open(``, "_blank");
    downloadWindow.window.location = `http://localhost:4000/api/v1/projects/download?appName=${appName}&token=${token}`;
    setTimeout(() => {
      downloadWindow.close();
    }, 500);
  };
  return (
    <DisplayWrapper>
      <H2>Projects</H2>
      <div className="project-list-wrapper grid grid-cols-2 mt-5 gap-4">
        {projects.length > 0 &&
          projects.map((project, id) => (
            <div className="p-2 flex bg-gray-900 rounded-lg">
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
