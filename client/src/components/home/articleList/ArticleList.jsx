import React from 'react'
import ArticleListCell from '../articleListCell/ArticleListCell'
function ArticleList(props) {
    return (
        <div>
            {
                props.data.map((item, index) => {
                    return (
                        <ArticleListCell getArticleDetail={props.getArticleDetail} key={index} data={item} />
                    )
                })
            }
        </div>
    )
}

export default ArticleList
