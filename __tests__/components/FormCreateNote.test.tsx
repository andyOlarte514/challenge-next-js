import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import FormCreateNote from "../../components/FormCreateNote";

describe("FormCreateNote", () => {
  test("renders the form with input fields", () => {
    const { getByLabelText } = render(<FormCreateNote onSubmit={() => {}} />);

    const titleInput = getByLabelText("Note Title");
    const contentInput = getByLabelText("Note Content");

    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
  });

  test("displays validation error messages", async () => {
    const { getByLabelText, getByText } = render(
      <FormCreateNote onSubmit={() => {}} />
    );

    const titleInput = getByLabelText("Note Title");
    const contentInput = getByLabelText("Note Content");

    expect(titleInput).toBeDefined();
    expect(contentInput).toBeDefined();

    await act(() => {
      fireEvent.blur(titleInput);
      fireEvent.blur(contentInput);
    });

    expect(getByText("The title is mandatory.")).toBeInTheDocument();
    expect(getByText("The content is mandatory.")).toBeInTheDocument();
  });

  test("calls onSubmit when submitting a valid form", async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <FormCreateNote onSubmit={onSubmitMock} />
    );

    const titleInput = getByLabelText("Note Title");
    const contentInput = getByLabelText("Note Content");
    const addButton = getByText("Add");

    await act(() => {
      fireEvent.change(titleInput, { target: { value: "New Note Title" } });
      fireEvent.change(contentInput, { target: { value: "New Note Content" } });
      fireEvent.click(addButton);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        title: "New Note Title",
        content: "New Note Content",
      },
      expect.anything()
    );
  });

  test("disables the submit button when the form is invalid", async () => {
    const { getByText, getByLabelText } = render(
      <FormCreateNote onSubmit={() => {}} />
    );

    const titleInput = getByLabelText("Note Title");
    const contentInput = getByLabelText("Note Content");
    const addButton = getByText("Add");

    await act(() => {
      fireEvent.blur(titleInput);
      fireEvent.blur(contentInput);
    });

    expect(addButton).toBeDisabled();

    await act(() => {
      fireEvent.change(titleInput, { target: { value: "New Note Title" } });
      fireEvent.change(contentInput, { target: { value: "New Note Content" } });
    });

    expect(addButton).not.toBeDisabled();
  });
});
