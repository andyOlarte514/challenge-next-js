import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import FormCreateProject from "../../components/FormCreateProject";

describe("FormCreateProject", () => {
  test("renders the form with input fields", () => {
    const { getByLabelText } = render(
      <FormCreateProject onSubmit={() => {}} />
    );
    const nameInput = getByLabelText("Project Name");
    expect(nameInput).toBeInTheDocument();
  });

  test("displays validation errors when submitting an empty form", async () => {
    const { getByLabelText, getByText } = render(
      <FormCreateProject onSubmit={() => {}} />
    );

    const nameInput = getByLabelText("Project Name");
    expect(nameInput).toBeDefined();
    await act(() => {
      fireEvent.blur(nameInput);
    });
    expect(getByText("The name is mandatory.")).toBeInTheDocument();
  });

  test("calls onSubmit when submitting a valid form", async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <FormCreateProject onSubmit={onSubmitMock} />
    );

    const nameInput = getByLabelText("Project Name");
    const createButton = getByText("Create");

    expect(nameInput).toBeDefined();
    expect(createButton).toBeDefined();

    await act(() => {
      fireEvent.change(nameInput, { target: { value: "New Project" } });
      fireEvent.click(createButton);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(
      { name: "New Project" },
      expect.anything()
    );
  });

  test("disables the submit button when the form is invalid", async () => {
    const { getByText, getByLabelText } = render(
      <FormCreateProject onSubmit={() => {}} />
    );

    const nameInput = getByLabelText("Project Name");
    const createButton = getByText("Create");

    expect(nameInput).toBeDefined();
    expect(createButton).toBeDefined();

    await act(() => {
      fireEvent.blur(nameInput);
    });

    expect(createButton).toBeDisabled();

    await act(() => {
      fireEvent.change(nameInput, { target: { value: "New Project" } });
    });

    expect(createButton).not.toBeDisabled();
  });
});
