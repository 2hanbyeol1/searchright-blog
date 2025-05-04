import {
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
} from "@testing-library/dom";

import MainPage from "./page";

let $container: HTMLElement;
let $element: HTMLElement;

beforeEach(() => {
  const mainPage = new MainPage();
  $element = mainPage.render();
  document.body.append($element);
  $container = document.body;
});

afterEach(() => {
  document.body.removeChild($element);
});

describe("메인 페이지", () => {
  describe("렌더링", () => {
    it("제목이 렌더링된다", () => {
      const title = getByRole($container, "heading", {
        level: 1,
      });

      expect(title).toBeInTheDocument();
    });

    it("업로드 버튼이 렌더링된다", () => {
      const uploadLabel = getByText($container, "업로드");
      const uploadFileInput = getByLabelText($container, "업로드");

      expect(uploadLabel).toBeInTheDocument();
      expect(uploadFileInput).toBeInTheDocument();
    });

    it("텍스트 입력창이 렌더링된다. 처음에는 읽기 전용이다.", () => {
      const textArea = getByTestId($container, "file-editor");

      expect(textArea).toBeInTheDocument();
      expect(textArea).toHaveAttribute("readonly");
    });
  });

  // describe("기능", () => {});
});
