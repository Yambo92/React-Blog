import React,{useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import './style.scss'
import ArticleList from "./articleList/ArticleList"
import {Pagination} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
import {PAGE_SIZE} from '../../constants'
import PropTypes from 'prop-types'
import {Blank} from '../blank/Blank'

const {get_article_list, get_article_detail} = frontActions

const Home = (props) => {
    const [currnetPage, setCurrentPage] = useState(1)
    const {tags} = props
    const tagsNameList = tags.reduce((pre, tag) => {
        pre.push(tag.name)
        return pre
    },[])
    useEffect(() => {
        props.get_article_list(props.match.params.tag ? props.match.params.tag : '', currnetPage)
    }, [currnetPage])

    return (
        tags.length > 1 && props.match.params.tag && (tagsNameList.indexOf(props.match.params.tag) === -1 || props.location.pathname.lastIndexOf('\/') > 0)
        ?
        <Redirect to="/404/" />
        :
        <div className="home-container">
            <ArticleList 
                data={props.articleList}
                getAritcleDetail={props.get_article_detail}
            />
            {
                props.articleList.length
                 ? 
                 <div className="paginationContainer">
                    <Pagination 
                        defaultPageSize={PAGE_SIZE}
                        pageSize={PAGE_SIZE}
                        onChange={(page) => setCurrentPage(page)}
                        current={currnetPage}
                        total={props.total}
                    />
                </div>
                :
                <Blank>暂无内容 ^_^</Blank>
            }
            
        </div>
    )
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNm: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail: bindActionCreators(get_article_detail, dispatch)
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Home)