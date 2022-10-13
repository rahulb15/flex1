import API from "../utils/api";
import { toast } from 'react-toastify';

export const ACTION_TYPES = {
    TECHNOLOGY_CREATE: 'TECHNOLOGY_CREATE',
    TECHNOLOGY_UPDATE: 'TECHNOLOGY_UPDATE',
    TECHNOLOGY_DELETE: 'TECHNOLOGY_DELETE',
    TECHNOLOGY_FETCH: 'TECHNOLOGY_FETCH',
    TECHNOLOGY_FETCH_ALL: 'TECHNOLOGY_FETCH_ALL',
    TECHNOLOGY_PAGINATION: 'TECHNOLOGY_PAGINATION'
}

export const fetchAll = () => dispatch => {
    API.technology().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
       
}
export const getdata = () => {
    API.technology().getdata()
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", email = "") => dispatch => {
    API.technology().fetchPagination(page, Math.abs(limit), name, email)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.technology().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.technology().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.technology().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}


export const Delete = (id, onSuccess) => dispatch => {
    API.technology().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.TECHNOLOGY_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
   
}

// permissions
export const permissions = (id, input)=> {
    API.technology().permissions(id, input)
        .then(res =>{
        // alert(res.data.msg)
        toast.success(res.data.msg);
        })
        .catch(err => console.log(err))
}

