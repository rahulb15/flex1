import { ACTION_TYPES } from "../actions/features";

const initialState = {
    featuress: [],
    metaFeatures: {}
}

export const features = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FEATURES_FETCH_ALL:
            return {
                ...state,
                featuress: [...action.payload]
            }
        case ACTION_TYPES.FEATURES_CREATE:
            return {
                ...state,
                featuress: [...state.featuress, action.payload]
            }
        case ACTION_TYPES.FEATURES_UPDATE:
            return {
                ...state,
                featuress: state.featuress.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.FEATURES_DELETE:
            return {
                ...state,
                featuress:state.featuress.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.FEATURES_PAGINATION:
            return {
                ...state,
                featuress: [...action.payload.featuress],
                metaFeatures: action.payload.meta
            }
        default:
            return state;
    }
}