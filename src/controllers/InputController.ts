const inputController = (() => {
  window.addEventListener("keydown", ({ code }) => {
    console.log(code);
  });
  window.addEventListener("keyup", ({ code }) => {
    console.log(code);
  });
  console.log(window);
  return {};
})();

export default inputController;
