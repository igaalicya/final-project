const init_state = {
  searchValue: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_SEARCH_INPUT":
      return { ...state, searchValue: action.payload };
    default:
      return { ...state };
  }
};
