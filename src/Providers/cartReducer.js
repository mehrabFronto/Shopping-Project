import { toast } from "react-toastify";

const cartReducer = (state, action) => {
   switch (action.type) {
      case "ADD_TO_CART": {
         const updatedCart = [...state.cart];

         const index = updatedCart.findIndex(
            (item) => item.id === action.payload.id,
         );

         if (index < 0) {
            updatedCart.push({ ...action.payload, qty: 1 });
            toast.success("product added to the cart");
         } else {
            const updatedItem = { ...updatedCart[index] };
            updatedItem.qty++;
            updatedCart[index] = updatedItem;
         }
         return {
            ...state,
            cart: updatedCart,
            total: state.total + action.payload.price,
         };
      }

      case "REMOVE_PRODUCT": {
         const updatedCart = [...state.cart];

         const index = updatedCart.findIndex((p) => p.id === action.payload.id);

         const updatedItem = { ...updatedCart[index] };

         if (updatedItem.qty === 1) {
            toast.success("product removed from the cart");
            const filteredCart = updatedCart.filter(
               (c) => c.id !== action.payload.id,
            );
            return {
               ...state,
               cart: filteredCart,
               total: state.total - action.payload.price,
            };
         } else {
            updatedItem.qty--;
            updatedCart[index] = updatedItem;
            return {
               ...state,
               cart: updatedCart,
               total: state.total - action.payload.price,
            };
         }
      }

      default:
         return state;
   }
};

export default cartReducer;
