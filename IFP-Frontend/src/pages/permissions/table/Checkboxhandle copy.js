import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';
import {add_permission, delete_permission, update_permission, view_permission } from "../../../actions/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = { 
  id: null, 
 add_permission: false,
 view_permission: false,
 update_permission: false,
 delete_permission: false
}

const Checkboxhandle = (props) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [addCheck, setAddCheck] = useState(false);
  const [viewCheck, setViewCheck] = useState(false);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [deleteCheck,setDeleteCheck] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors ] = useState({});

  // useEffect(() => {
  //   setUserId(props.dataUser[0])
  // }, [props.dataUser])


  const onSuccess = () => {
    props.refresh()
    setOpen(false);
    toast.success('Successful');
}
  

  const handlePermissions = (permissiontocheck) =>{
    console.log("datauserrrrrr", props.dataUser);
    switch(permissiontocheck){
        case 'addCheck':
            setAddCheck(!addCheck);
            // console.log('PROPS',props)
            add_permission(props.dataUser[0],{add_permission:!addCheck},onSuccess)
            break;
        case 'viewCheck':
            setViewCheck(!viewCheck);
            view_permission(props.dataUser[0],{view_permission:!viewCheck},onSuccess)
            break;
        case 'updateCheck':
            setUpdateCheck(!updateCheck);
            update_permission(props.dataUser[0],{update_permission:!updateCheck},onSuccess)
            break;
        case 'deleteCheck':
            setDeleteCheck(!deleteCheck);
            delete_permission(props.dataUser[0],{delete_permission:!deleteCheck},onSuccess)
            break;
        default:
            setAddCheck(false)
            setViewCheck(false)
            setUpdateCheck(false)
            setDeleteCheck(false)
    }
    setErrors({});
    setUser({
      id : props.dataUser[0]
    })
}

  return (
    <div>
      <input type="checkbox"  checked={addCheck} onChange={()=>{handlePermissions('addCheck')} }/>
     Add&emsp;
    <input type="checkbox"  checked={viewCheck} onChange={()=>{handlePermissions('viewCheck')}}/>
     View&emsp;             
         <input type="checkbox"  checked={updateCheck} onChange={()=>{handlePermissions('updateCheck')}}/>
     Update&emsp;
     <input type="checkbox"  checked={deleteCheck} onChange={()=>{handlePermissions('deleteCheck')}}/>
     Delete
    </div>
  );
}

export default Checkboxhandle;