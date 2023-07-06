'use client';

import React from 'react';

const projects = [
    { id: 1, name: 'Proyecto 1' },
    { id: 2, name: 'Proyecto 2' },
    { id: 3, name: 'Proyecto 3' },
  ];

const Dashboard: React.FC = () => {
    return (
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Lista de Proyectos</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <li key={project.id} className="bg-white rounded-md shadow-md p-4">
                <h2 className="text-lg font-bold">{project.name}</h2>
                <p className="mt-2">ID: {project.id}</p>
              </li>
            ))}
          </ul>
        </div>
      );
};


export default Dashboard;