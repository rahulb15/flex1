import API from "../utils/api";
import { toast } from 'react-toastify';

export const ACTION_TYPES = {
    PORTFOLIO_CREATE: 'PORTFOLIO_CREATE',
    PORTFOLIO_UPDATE: 'PORTFOLIO_UPDATE',
    PORTFOLIO_DELETE: 'PORTFOLIO_DELETE',
    PORTFOLIO_FETCH: 'PORTFOLIO_FETCH',
    PORTFOLIO_FETCH_ALL: 'PORTFOLIO_FETCH_ALL',
    PORTFOLIO_PAGINATION: 'PORTFOLIO_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.portfolio().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
       
}
export const getdata = () => {
    API.portfolio().getdata()
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", email = "") => dispatch => {
    API.portfolio().fetchPagination(page, Math.abs(limit), name, email)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.portfolio().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.portfolio().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.portfolio().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const Delete = (id, onSuccess) => dispatch => {
    API.portfolio().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.PORTFOLIO_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
   
}

// permissions
export const permissions = (id, input)=> {
    API.portfolio().permissions(id, input)
        .then(res =>{
        // alert(res.data.msg)
        toast.success(res.data.msg);
        })
        .catch(err => console.log(err))
}

