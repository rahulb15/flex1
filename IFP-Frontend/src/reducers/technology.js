import { ACTION_TYPES } from "../actions/technology";

const initialState = {
    technologys: [],
    metaTechnology: {}
}

export const technology = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.TECHNOLOGY_FETCH_ALL:
            return {
                ...state,
                technologys: [...action.payload]
            }
        case ACTION_TYPES.TECHNOLOGY_CREATE:
            return {
                ...state,
                technologys: [...state.technologys, action.payload]
            }
        case ACTION_TYPES.TECHNOLOGY_UPDATE:
            return {
                ...state,
                technologys: state.technologys.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.TECHNOLOGY_DELETE:
            return {
                ...state,
                technologys:state.technologys.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.TECHNOLOGY_PAGINATION:
            return {
                ...state,
                technologys: [...action.payload.technologys],
                metaTechnology: action.payload.meta
            }
        default:
            return state;
    }
}