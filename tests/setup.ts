import "@testing-library/jest-dom/vitest";

/* 
  Fix pointer event issues (DOM implementation (Jsdom) does not implement 
  Element.hasPointerCapture() – needed for Radix Select.tsx)
*/

Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  value: () => false,
});

Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
  value: () => {},
});

Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
  value: () => {},
});

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: () => {},
});