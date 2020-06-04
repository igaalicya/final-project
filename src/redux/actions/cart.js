import Axios from "axios";
import { API_URL } from "../../constants/API";

// export const countCartHandler = id => {
//   return dispatch => {
//     let totalItem = 0;
//     Axios.get(`${API_URL}/carts`, {
//       params: {
//         userId: id
//       }
//     })
//       .then(res => {
//         res.data.map(val => {
//           return (totalItem += 1);
//         });

//         // totalItem += res.data.length;

//         dispatch({
//           type: "GET_NUMBER_OF_ITEM",
//           payload: totalItem
//         });
//         // }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// };

export const fillCart = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((res) => {
        dispatch({
          type: "FILL_CART",
          payload: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
