import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import { actions } from "../../reducers/admin";
import {actions as IndexActions} from '../../reducers/index'
import { bindActionCreators } from "redux";
import AdminMenu from "../adminMenu/AdminMenu";
import { Layout } from "antd";
import "./style.scss";
import { AdminHome } from "../../page/adminHome/AdminHome";
import { AdminManagerArticle } from "../../page/adminManagerArticle/AdminManagerArticle";
import  AdminManagerTags  from "../../page/adminManagerTags/AdminManagerTags";
import { AdminManagerUser } from "../../page/adminManagerUser/AdminManagerUser";
import { AdminNewArticle } from "../../page/adminNewArticle/AdminNewArticle";
import { AdminManagerComment } from "../../page/adminManagerComment/AdminManagerComment";
import {AdminHeader} from '../adminHeader/AdminHeader'
const { Header, Footer, Sider, Content } = Layout;
const { change_location_admin } = actions;
const {get_logout} = IndexActions
function Admin(props) {
  const { url } = props.match;


useEffect(() => {
  //在adminMenu组件中切换菜单，调用父组件的"change_location_admin" action来更新Admin.jsx组件时必须写在useEffect中，否则报错如下
  //Cannot update a component from inside the function body of a different component
  //官方解释及处理方法：https://zh-hans.reactjs.org/blog/2020/02/26/react-v16.13.0.html
  props.change_location_admin( 
    window.location.pathname.replace(/\/admin/, "") || "/"
  );
})
  if (props.userInfo && props.userInfo.userType) {
    return (
      <div>
        {props.userInfo.userType === "admin" ? (
          <div className="admin-container">
            <Layout className="layout">
              <Sider>
                <AdminMenu
                  history={props.history}
                  url={props.adminUrl}
                  changeUrl={props.change_location_admin}
                />
              </Sider>
              <Layout>
                <Header className="layout-header">
                  <AdminHeader userInfo={props.userInfo} get_logout={props.get_logout} />
                </Header>
                <Content>
                  <Switch>
                    <Route exact path={url} component={AdminHome} />
                    <Route
                      exact
                      path={`${url}/managerUser`}
                      component={AdminManagerUser}
                    />
                    <Route
                      exact
                      path={`${url}/managerTags`}
                      component={AdminManagerTags}
                    />
                    <Route
                      exact
                      path={`${url}/newArticle`}
                      component={AdminNewArticle}
                    />
                    <Route
                      exact
                      path={`${url}/managerArticle`}
                      component={AdminManagerArticle}
                    />
                    <Route
                      exact
                      path={`${url}/managerAComment`}
                      component={AdminManagerComment}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Content>
                <Footer className="layout-footer">Footer</Footer>
              </Layout>
            </Layout>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  } else {
    return <NotFound />;
  }
}

Admin.defaultProps = {
  adminUrl: "/"
};
Admin.propTypes = {
  adminUrl: PropTypes.string,
  change_location_admin: PropTypes.func
};

function mapStateToProps(state) {
  const { url } = state.admin.adminGlobalState;
  return {
    adminUrl: url,
    userInfo: state.globalState.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    change_location_admin: bindActionCreators(change_location_admin, dispatch),
    get_logout: bindActionCreators(get_logout, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
