import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth, logoutFlow} from './homeSaga'
import {getAllTagsFlow} from './adminManagerTagsSaga'
import {getArticleListFlow} from './adminManagerArticleSaga'
import {getArticlesListFlow} from './frontSaga'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(user_auth);
    yield fork(logoutFlow);
    yield fork(getAllTagsFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleListFlow);
}