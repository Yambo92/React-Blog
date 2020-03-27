import React, {useState, useEffect} from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
    
} from 'react-router-dom'
import "./assets/style/minreset.sass"
import NotFound from './components/notFound/NotFound'
import Admin from './components/admin/Admin'
import Front from "./components/front/Front"
import {Loading} from './components/loading/Loading.jsx'
import {notification, 
    message} from 'antd'
import {connect} from 'react-redux' 
import {bindActionCreators} from 'redux'
import {actions} from './reducers'
const {clear_msg, user_auth} = actions

const App = (props) => {
    let {isFetching} = props;

   const onmessage = (type, text) => {
        message[type](text, () => {
            props.clear_msg()
        })
   }
    return (
        <Router>
            <div className="app-container">
                <Switch>
                    <Route exact path="/" component={Front} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/admin" component={Admin} />
                    <Route component={Front} />
                </Switch>
                {isFetching && <Loading />}
            </div>
        </Router>
    )
    
}

function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching,
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch),
        user_auth: bindActionCreators(user_auth, dispatch)
    }
}
 export default connect(mapStateToProps, mapDispatchToProps)(App);

