import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../../app/layout";
import { Inter } from "next/font/google";

jest.mock("next/font/google");

jest.mock("next/font/google", () => ({
  Inter: jest.fn().mockImplementation(() => ({
    className: "mocked-inter-class",
  })),
}));

describe("RootLayout", () => {
  test("renders the children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Hello, World!</div>
      </RootLayout>
    );

    const helloText = getByText("Hello, World!");
    expect(helloText).toBeInTheDocument();
  });

  test("applies the mocked CSS class to the body element", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Hello, World!</div>
      </RootLayout>
    );

    const bodyElement = getByText("Hello, World!").parentNode;
    expect(bodyElement).toHaveClass("mocked-inter-class");
  });
});
