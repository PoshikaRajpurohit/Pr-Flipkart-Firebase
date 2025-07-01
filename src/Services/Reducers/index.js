import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import cartReducer from "./CartReducer";
import authReducer from "./AuthReducer";



const rootReducer = combineReducers({
   productReducer,
   cartReducer,
   authReducer
});

export default rootReducer;