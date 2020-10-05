import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    // case CART_REMOVE_ITEM:
    //   return { loading: false, products: action.payload };

    default:
      return state;
  }
};

// export const cartDetailsReducer = (
//   state = { product: { reviews: [] } },
//   action
// ) => {
//   switch (action.type) {
//     case PRODUCT_DETAILS_REQUEST:
//       return { loading: true, ...state };
//     case PRODUCT_DETAILS_SUCCESS:
//       return { loading: false, product: action.payload };
//     case PRODUCT_DETAILS_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };
