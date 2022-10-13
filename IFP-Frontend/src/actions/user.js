import API from "../utils/api";
import { toast } from 'react-toastify';

export const ACTION_TYPES = {
    USER_CREATE: 'USER_CREATE',
    USER_UPDATE: 'USER_UPDATE',
    USER_DELETE: 'USER_DELETE',
    USER_FETCH: 'USER_FETCH',
    USER_FETCH_ALL: 'USER_FETCH_ALL',
    USER_PAGINATION: 'USER_PAGINATION',
    USER_ADD_PERMISSION:'USER_ADD_PERMISSION',
    USER_VIEW_PERMISSION:'USER_VIEW_PERMISSION',
    USER_UPDATE_PERMISSION:'USER_UPDATE_PERMISSION',
    USER_DELETE_PERMISSION:'USER_DELETE_PERMISSION'
}

export const fetchAll = () => dispatch => {
    API.user().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.USER_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
       
}
export const getdata = () => {
    API.user().getdata()
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 5, name = "", email = "") => dispatch => {
    API.user().fetchPagination(page, Math.abs(limit), name, email)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
        
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.user().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    API.user().create(input)
        .then(res =>{
            console.log("resData",res.data)
            dispatch({
                type: ACTION_TYPES.USER_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    API.user().update(id, input)
        .then(res =>{
            console.log("resDataUSER",res.data)
            dispatch({
                type: ACTION_TYPES.USER_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

// export const add_permission = (id, input, onSuccess) => dispatch => {
//     // console.log("first")
//     // API.user().add_permission(id, input)
//     //     .then(res =>{
//     //         dispatch({
//     //             type: ACTION_TYPES.USER_ADD_PERMISSION,
//     //             payload: res.data
//     //         })
//     //         onSuccess()
//     //     })
//     //     .catch(err => console.log(err))
//     alert("hiiiii");
// }

// export const view_permission = (id, input, onSuccess) => dispatch => {
//     API.user().view_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.USER_VIEW_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

// export const update_permission = (id, input, onSuccess) => dispatch => {
//     API.user().update_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.USER_UPDATE_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

// export const delete_permission = (id, input, onSuccess) => dispatch => {
//     API.user().delete_permission(id, input)
//         .then(res =>{
//             dispatch({
//                 type: ACTION_TYPES.USER_DELETE_PERMISSION,
//                 payload: res.data
//             })
//             onSuccess()
//         })
//         .catch(err => console.log(err))
// }

export const Delete = (id, onSuccess) => dispatch => {
    API.user().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.USER_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
   
}

// permissions
export const permissions = (id, input)=> {
    API.user().permissions(id, input)
        .then(res =>{
        // alert(res.data.msg)
        toast.success(res.data.msg);
        })
        .catch(err => console.log(err))
}

export const add_permission = (id, input)=> {
    API.user().add_permission(id, input)
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const view_permission = (id, input)=> {
    API.user().view_permission(id, input)
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const update_permission = (id, input)=> {
    API.user().update_permission(id, input)
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}

export const delete_permission = (id, input)=> {
    API.user().delete_permission(id, input)
        .then(res =>{
            console.log('RESPONSE FROM BACKEND',res)
        })
        .catch(err => console.log(err))
}