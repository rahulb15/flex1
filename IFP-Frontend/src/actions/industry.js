import API from "../utils/api";
import { toast } from 'react-toastify';

export const ACTION_TYPES = {
    INDUSTRY_CREATE: 'INDUSTRY_CREATE',
    INDUSTRY_UPDATE: 'INDUSTRY_UPDATE',
    INDUSTRY_DELETE: 'INDUSTRY_DELETE',
    INDUSTRY_FETCH: 'INDUSTRY_FETCH',
    INDUSTRY_FETCH_ALL: 'INDUSTRY_FETCH_ALL',
    INDUSTRY_PAGINATION: 'INDUSTRY_PAGINATION',
    INDUSTRY_ADD_PERMISSION:'INDUSTRY_ADD_PERMISSION',
    INDUSTRY_VIEW_PERMISSION:'INDUSTRY_VIEW_PERMISSION',
    INDUSTRY_UPDATE_PERMISSION:'INDUSTRY_UPDATE_PERMISSION',
    INDUSTRY_DELETE_PERMISSION:'INDUSTRY_DELETE_PERMISSION'
}

export const fetchAll = () => dispatch => {
    API.industry().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.INDUSTRY_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
       
}
export const getdata = () => {
    API.industry().getdata()
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", email = "") => dispatch => {
    API.industry().fetchPagination(page, Math.abs(limit), name, email)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.INDUSTRY_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.industry().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.INDUSTRY_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.industry().create(input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.INDUSTRY_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
        
}

export const update = (id, input, onSuccess) => dispatch => {
    API.industry().update(id, input)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.INDUSTRY_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

// export const add_permission = (id, input, onSuccess) => dispatch => {
//     // console.log("first")
//     // API.industry().add_permission(id, input)
//     //     .then(res =>{
//     //         dispatch({
//     //             type: ACTION_TYPES.INDUSTRY_ADD_PERMISSION,
//     //             payload: res.data
//     //         })
//     //         onSuccess()
//     //     })
//     //     .catch(err => console.log(err))
//     alert("hiiiii");
// }

// export const view_permission = (id, input, onSuccess) => dispatch => {
//     API.industry().view_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.INDUSTRY_VIEW_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

// export const update_permission = (id, input, onSuccess) => dispatch => {
//     API.industry().update_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.INDUSTRY_UPDATE_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

// export const delete_permission = (id, input, onSuccess) => dispatch => {
//     API.industry().delete_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.INDUSTRY_DELETE_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

export const Delete = (id, onSuccess) => dispatch => {
    API.industry().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.INDUSTRY_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
   
}

// permissions
export const permissions = (id, input)=> {
    API.industry().permissions(id, input)
        .then(res =>{
        // alert(res.data.msg)
        toast.success(res.data.msg);
        })
        .catch(err => console.log(err))
}

// export const add_permission = (id, input)=> {
//     API.industry().add_permission(id, input)
//         .then(res =>{
//             console.log('RESPONSE FROM BACKEND',res)
//         })
//         .catch(err => console.log(err))
// }

// export const view_permission = (id, input)=> {
//     API.industry().view_permission(id, input)
//         .then(res =>{
//             console.log('RESPONSE FROM BACKEND',res)
//         })
//         .catch(err => console.log(err))
// }

// export const update_permission = (id, input)=> {
//     API.industry().update_permission(id, input)
//         .then(res =>{
//             console.log('RESPONSE FROM BACKEND',res)
//         })
//         .catch(err => console.log(err))
// }

// export const delete_permission = (id, input)=> {
//     API.industry().delete_permission(id, input)
//         .then(res =>{
//             console.log('RESPONSE FROM BACKEND',res)
//         })
//         .catch(err => console.log(err))
// }