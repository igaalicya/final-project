export const navbarInputHandler = (e) => {
  const { value } = e.target;

  return {
    type: "ON_SEARCH_INPUT",
    payload: value,
  };
};
