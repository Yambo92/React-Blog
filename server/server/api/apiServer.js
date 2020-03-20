/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */

import config from '../../config/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
const express = require('express')
const port = config.apiPort;
const path = require('path')
const app = express();
console.log("dirname:",__dirname);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//过期时间
}));


//展示页面路由
app.use('/', require('./main'));
//管理页面路由
app.use('/admin', require('./admin'));

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../../../client/dist/index.html'));
// });

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});
