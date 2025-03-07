import { createContext, useState } from 'react';
import { food_list } from '../assets/assets';

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, SetCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      SetCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      SetCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    SetCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    SetCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };
  // eslint-disable-next-line react/prop-types
  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};
export default StoreContextProvider;
