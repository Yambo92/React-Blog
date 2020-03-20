import React from 'react'
import {useHistory} from 'react-router-dom'
import './style.scss'
import { CalendarOutlined,EyeOutlined,CommentOutlined } from '@ant-design/icons';
import {formateDate} from '../../../utils/dateUtils'
function ArticleListCell(props) {
    const history = useHistory();
    let date = formateDate(props.data.time)
    return (
        <div className="articleListCell-container" onClick={() => {history.push(`/detail/${props.data._id}`, props.getArticleDetail(props.data._id))}}>
            <div>
                <img src={props.data.coverImg} alt="" />    
            </div>   
            <div className="bottomContainer">
                <p className="title">
                    {props.data.title}
                </p>
                <p className="summary">
                    摘要
                </p>
                <div>
                    <p>
                        <span title="发表时间">
                            <CalendarOutlined className="img" />&nbsp; {date} 
                        </span>&nbsp;&nbsp;
                        <span title="浏览次数">
                            <EyeOutlined className="img" />&nbsp; {props.data.viewCount} 
                        </span>&nbsp;&nbsp;
                        <span title="评论次数">
                            <CommentOutlined className="img" /> &nbsp;{props.data.commentCount} 
                        </span>
                    </p>
                    <span className="lastSpan"> 
                        阅读全文 <span>》</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ArticleListCell
