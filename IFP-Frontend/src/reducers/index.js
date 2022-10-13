import { combineReducers } from "redux";
import { map } from "./map";
import { user } from "./user";
import {industry} from "./industry";
import {portfolio} from "./portfolio";
import {technology} from "./technology";
import {features} from "./features";

export const reducers = combineReducers({
    map, user ,industry ,technology , portfolio ,features
})