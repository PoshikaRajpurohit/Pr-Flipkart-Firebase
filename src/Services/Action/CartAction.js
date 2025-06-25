import { db } from "../../Firebase";
import {collection,doc,setDoc,updateDoc,deleteDoc,getDocs} from "firebase/firestore";
const cartCollection = collection(db, "cart");
export const fetchCartAsync = () => async (dispatch) => {
  try {
    const snapshot = await getDocs(cartCollection);
    const cartItems = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        qty: data.quantity,
      };
    });

    dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    dispatch({ type: "CART_ERROR", payload: error.message });
  }
};
export const addToCartAsync = (product) => async (dispatch, getState) => {
  const existing = getState().cartReducer.cartItems.find(
    (item) => item.id === product.id
  );

  if (existing) {
    dispatch(incrementQtyAsync(product.id));
  } else {
    const newItem = { ...product, quantity: 1 };
    await setDoc(doc(db, "cart", product.id), newItem);
    dispatch({ type: "ADD_TO_CART", payload: { ...newItem, qty: 1 } });
  }
};
export const incrementQtyAsync = (id) => async (dispatch, getState) => {
  const item = getState().cartReducer.cartItems.find((item) => item.id === id);
  const newQty = item.qty + 1;
  await updateDoc(doc(db, "cart", id), { quantity: newQty });
  dispatch({ type: "INCREASE_QUANTITY", payload: id });
};
export const decrementQtyAsync = (id) => async (dispatch, getState) => {
  const item = getState().cartReducer.cartItems.find((item) => item.id === id);
  const newQty = item.qty - 1;
  if (newQty > 0) {
    await updateDoc(doc(db, "cart", id), { quantity: newQty });
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  } else {
    await deleteDoc(doc(db, "cart", id));
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }
};
export const removeFromCartAsync = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "cart", id));
  dispatch({ type: "REMOVE_FROM_CART", payload: id });
};
