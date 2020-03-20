import React, {useState} from 'react'
import {
    Switch,
    Route,
    Redirect,
    useHistory
} from 'react-router-dom'
import NotFound from '../notFound/NotFound'

function Admin(props){
    const {url} = props.match;
    if(props.userInfo && props.userInfo.userType){
        return (
            <div>Admin</div>
        )
    }else{
        return <NotFound/>
    }
    
}
export default Admin