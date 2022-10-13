import { ACTION_TYPES } from "../actions/industry";

const initialState = {
    industrys: [],
    metaIndustry: {}
}

export const industry = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.INDUSTRY_FETCH_ALL:
            return {
                ...state,
                industrys: [...action.payload]
            }
        case ACTION_TYPES.INDUSTRY_CREATE:
            return {
                ...state,
                industrys: [...state.industrys, action.payload]
            }
        case ACTION_TYPES.INDUSTRY_UPDATE:
            return {
                ...state,
                industrys: state.industrys.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.INDUSTRY_DELETE:
            return {
                ...state,
                industrys:state.industrys.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.INDUSTRY_PAGINATION:
            return {
                ...state,
                industrys: [...action.payload.industrys],
                metaIndustry: action.payload.meta
            }
        default:
            return state;
    }
}