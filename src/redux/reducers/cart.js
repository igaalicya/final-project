const init_state = {
  total: 0,
};

export default (state = init_state, action) => {
  switch (action.type) {
    //   case "GET_NUMBER_OF_ITEM":
    //     return {
    //       ...state,
    //       total: action.payload
    //     };
    case "FILL_CART":
      return { ...state, cartItems: action.payload };
    default:
      return { ...state };
  }
};
