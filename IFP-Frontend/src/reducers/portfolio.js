import { ACTION_TYPES } from "../actions/portfolio";

const initialState = {
    portfolios: [],
    metaPortfolio: {}
}

export const portfolio = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.PORTFOLIO_FETCH_ALL:
            return {
                ...state,
                portfolios: [...action.payload]
            }
        case ACTION_TYPES.PORTFOLIO_CREATE:
            return {
                ...state,
                portfolios: [...state.portfolios, action.payload]
            }
        case ACTION_TYPES.PORTFOLIO_UPDATE:
            return {
                ...state,
                portfolios: state.portfolios.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.PORTFOLIO_DELETE:
            return {
                ...state,
                portfolios:state.portfolios.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.PORTFOLIO_PAGINATION:
            return {
                ...state,
                portfolios: [...action.payload.portfolios],
                metaPortfolio: action.payload.meta
            }
        default:
            return state;
    }
}