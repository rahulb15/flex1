import API from "../utils/api";
import { toast } from 'react-toastify';

export const ACTION_TYPES = {
    FEATURES_CREATE: 'FEATURES_CREATE',
    FEATURES_UPDATE: 'FEATURES_UPDATE',
    FEATURES_DELETE: 'FEATURES_DELETE',
    FEATURES_FETCH: 'FEATURES_FETCH',
    FEATURES_FETCH_ALL: 'FEATURES_FETCH_ALL',
    FEATURES_PAGINATION: 'FEATURES_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.features().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.FEATURES_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
       
}
export const getdata = () => {
    API.features().getdata()
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", email = "") => dispatch => {
    API.features().fetchPagination(page, Math.abs(limit), name, email)
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res.data)
            dispatch({
                type: ACTION_TYPES.FEATURES_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.features().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FEATURES_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.features().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FEATURES_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.features().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FEATURES_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const Delete = (id, onSuccess) => dispatch => {
    API.features().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.FEATURES_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
   
}

// permissions
export const permissions = (id, input)=> {
    API.features().permissions(id, input)
        .then(res =>{
        // alert(res.data.msg)
        toast.success(res.data.msg);
        })
        .catch(err => console.log(err))
}

