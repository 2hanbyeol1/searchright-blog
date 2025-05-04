// id를 이용하여 특정 Element를 가져옵니다.
//
// null인 경우, ElementNotFoundError를 발생시킵니다.
// 특정 Element가 아닌 경우, ElementTypeError를 발생시킵니다.

import ElementNotFoundError from "@/error/ElementNotFoundError";
import ElementTypeError from "@/error/ElementTypeError";

export function getElementBySelector(
  selector: string,
  doc?: Document | Element
) {
  const $element = (doc ?? document).querySelector(selector);
  if (!$element) throw new ElementNotFoundError(selector);
  return $element;
}

export function getTextareaById(elementId: string, doc?: Document) {
  const $element = (doc ?? document).getElementById(elementId);
  if (!$element) throw new ElementNotFoundError(`#${elementId}`);
  if (!($element instanceof HTMLTextAreaElement))
    throw new ElementTypeError(`#${elementId}`, "textarea");
  return $element;
}

export function getDivById(elementId: string, doc?: Document) {
  const $element = (doc ?? document).getElementById(elementId);
  if (!$element) throw new ElementNotFoundError(`#${elementId}`);
  if (!($element instanceof HTMLDivElement))
    throw new ElementTypeError(`#${elementId}`, "div");
  return $element;
}
