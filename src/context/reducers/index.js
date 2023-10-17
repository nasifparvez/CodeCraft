import { combineReducers } from "redux";
import userAuthReducer from "./UserAuthReducer";
import ProjectReducer from "./projectReducer";
import SearchReducer from "./searchReducer";

const myReducer = combineReducers({
    user: userAuthReducer,
    projects: ProjectReducer,
    searchTerm: SearchReducer,
})

export default myReducer