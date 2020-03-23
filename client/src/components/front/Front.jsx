import React, {useEffect} from 'react'
import './style.scss'
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Banner from '../banner/Banner'
import Menus from '../menu/Menus'
import NotFound from '../../components/notFound/NotFound'
import {bindActionCreators} from 'redux'
import Login from '../login/Login'
import Logined from '../logined/Logined'
import {actions as IndexActions} from '../../reducers'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActions} from '../../reducers/frontReducer'
import Home from '../home/Home'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
const {get_all_tags} = actions;
const {get_article_list} = FrontActions

const Front = (props) => {
    const {url} = props.match;
    const {login, register, logout} = props

    useEffect(() => {
        props.get_all_tags();
    }, [])
    return (
        <div>
            <div>
                <Banner />
                <Menus logout={logout}
                      userInfo={props.userInfo}
                       categories={props.categories}
                       getArticleList={(tag)=>props.get_article_list(tag, 1)}
                />
            </div>
            <PerfectScrollbar>
            <div className='front-container'>
                <div className="contentContainer">
                    <div className="content">
                        <Switch>
                            <Route exact path={url} component={Home} />
                            <Route path={`/:tag`} component={Home} />
                            <Route componet={NotFound} />
                        </Switch>
                    </div>
                </div>
                <div className="loginContainer">
                    {   props.userInfo.userId 
                        ? <Logined userInfo={props.userInfo} />
                        :  <Login login={login} register={register}/>
                    }
                       
                </div>
            </div>
           </PerfectScrollbar>
        </div>
    )
}

function mapStateToProps(state){
    return {
        userInfo: state.globalState.userInfo,
        categories: state.admin.tags,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch),
        logout: bindActionCreators(IndexActions.get_logout, dispatch),
        get_all_tags:bindActionCreators(get_all_tags, dispatch),
        get_article_list: bindActionCreators(get_article_list, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)