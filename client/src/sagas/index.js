import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth, logoutFlow} from './homeSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'
import {getArticleListFlow, addNewArticleFlow} from './adminManagerArticleSaga'
import {getAllUsersFlow, delUserFlow, changeRoleFlow} from './adminManagerUsersSaga'
import {getArticlesListFlow} from './frontSaga'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
    yield fork(logoutFlow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleListFlow);
    yield fork(getAllUsersFlow);
    yield fork(delUserFlow);
    yield fork(changeRoleFlow);
    yield fork(addNewArticleFlow);
    
}