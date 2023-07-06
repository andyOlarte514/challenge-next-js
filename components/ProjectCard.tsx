import React, { useState, useCallback } from "react";
import { Project } from "@/interfaces/project.interface";
import FormCreateNote from "./FormCreateNote";

interface Props {
  project: Project;
  onAddNote: (project: Project, values: any, actions: any) => void;
}

const ProjectCard: React.FC<Props> = ({ project, onAddNote }) => {
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleToggleNoteForm = useCallback(() => {
    setShowNoteForm(!showNoteForm);
  }, [showNoteForm]);

  const handleAddNote = useCallback(
    async (values: any, actions: any) => {
      onAddNote(project, values, actions);
    },
    [onAddNote, project]
  );

  return (
    <div className="bg-blue rounded-md shadow-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{`Title: ${project.name}`}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleToggleNoteForm}
        >
          Add Note
        </button>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Owner Name:</span> {project.owner.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Owner Email:</span>{" "}
        {project.owner.email}
      </div>
      {!!project.notes.length && (
        <>
          <h2 className="text-lg font-bold mt-4">Notes</h2>
          {project.notes.map((note) => (
            <div key={`${note.id}-${note.title}`} className="mb-2">
              <span className="font-semibold">Note:</span> {note.title}
            </div>
          ))}
        </>
      )}
      {showNoteForm && <FormCreateNote onSubmit={handleAddNote} />}
    </div>
  );
};

export default ProjectCard;
