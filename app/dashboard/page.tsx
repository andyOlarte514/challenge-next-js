"use client";

import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import api, { setAuthorizationToken } from "@/config/api";
import { Project } from "@/interfaces/project.interface";
import FormCreateProject from "@/components/FormCreateProject";
import ProjectCard from "@/components/ProjectCard";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const token = Cookies.get("jwt");
  const decodedToken = jwt.decode(token!) as JwtPayload;
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(
        `/projects/by-owner/${decodedToken.username}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error retrieving data from the endpoint:", error);
    }
  }, [decodedToken]);

  const handleCreateProject = useCallback(
    async (values: any, actions: any) => {
      try {
        const response = await api.post("/projects", {
          ...values,
          owner: decodedToken.username,
        });
        if (response.statusText === "Created") {
          actions.resetForm();
          fetchData();
        }
      } catch (error) {
        console.error("Error while trying to create the project:", error);
      }
    },
    [decodedToken, fetchData]
  );

  const handleCreateNote = useCallback(
    async (project: Project, values: any, actions: any) => {
      try {
        const response = await api.post("/notes", {
          ...values,
          project: project.id,
        });
        if (response.statusText === "Created") {
          actions.resetForm();
          fetchData();
        }
      } catch (error) {
        console.error("Error while trying to create the note:", error);
      }
    },
    [fetchData]
  );

  const handleLogout = () => {
    Cookies.remove("jwt");
    router.push("/");
  };

  useEffect(() => {
    setAuthorizationToken(token!);
    fetchData();
  }, []);

  return (
    <div className="flex flex-col px-10 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project List</h1>
        <button className="text-blue-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {!!projects.length &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onAddNote={handleCreateNote}
            />
          ))}
      </div>
      <FormCreateProject onSubmit={handleCreateProject} />
    </div>
  );
};

export default Dashboard;
