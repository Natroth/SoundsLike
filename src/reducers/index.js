import { combineReducers } from "redux";
import search from "./search";
import recs from "./recs";

export default combineReducers({ search, recs });
