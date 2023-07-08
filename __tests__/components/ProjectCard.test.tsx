import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ProjectCard from "../../components/ProjectCard";

const MOCK_PROJECT = {
  id: 1,
  name: "Test Project",
  owner: {
    name: "John Doe",
    email: "john@example.com",
  },
  collaborators: [],
  notes: [
    { id: 1, title: "Note 1", content: "Note 1 content" },
    { id: 2, title: "Note 2", content: "Note 2 content" },
  ],
};

const onAddNoteMock = jest.fn();

describe("ProjectCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders project title and owner information", () => {
    const { getByText } = render(
      <ProjectCard project={MOCK_PROJECT} onAddNote={onAddNoteMock} />
    );
    expect(getByText("Title: Test Project")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();
  });

  test("renders notes when project has notes", () => {
    const { getByText } = render(
      <ProjectCard project={MOCK_PROJECT} onAddNote={onAddNoteMock} />
    );
    expect(getByText("Notes")).toBeInTheDocument();
    expect(getByText("Note 1")).toBeInTheDocument();
    expect(getByText("Note 2")).toBeInTheDocument();
  });

  test("does not render notes when project has no notes", () => {
    const projectWithoutNotes = { ...MOCK_PROJECT, notes: [] };
    const { queryByText } = render(
      <ProjectCard project={projectWithoutNotes} onAddNote={onAddNoteMock} />
    );
    expect(queryByText("Notes")).toBeNull();
    expect(queryByText("Note 1")).toBeNull();
    expect(queryByText("Note 2")).toBeNull();
  });

  test('toggles note form visibility when "Add Note" button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ProjectCard project={MOCK_PROJECT} onAddNote={onAddNoteMock} />
    );

    const addButton = getByText("Add Note");
    expect(queryByTestId("note-form")).toBeNull();
    fireEvent.click(addButton);
    expect(getByTestId("note-form")).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(queryByTestId("note-form")).toBeNull();
  });

  test("calls onAddNote when a note is added", async () => {
    const { getByText, getByTestId, getByLabelText, debug } = render(
      <ProjectCard project={MOCK_PROJECT} onAddNote={onAddNoteMock} />
    );

    fireEvent.click(getByText("Add Note"));

    const form = getByTestId("note-form");
    const titleInput = getByLabelText("Note Title");
    const contentInput = getByLabelText("Note Content");
    const addButton = getByText("Add");

    expect(titleInput).toBeDefined();
    expect(contentInput).toBeDefined();
    expect(addButton).toBeDefined();

    await act(() => {
      fireEvent.change(titleInput, { target: { value: "New Note Title" } });
      fireEvent.change(contentInput, { target: { value: "New Note Content" } });
    });

    expect(titleInput.value).toBe("New Note Title");
    expect(contentInput.value).toBe("New Note Content");

    await act(() => {
      fireEvent.click(addButton);
      fireEvent.submit(form);
    });

    expect(onAddNoteMock).toHaveBeenCalled();
  });
});
