import Express from 'express'
const router = Express.Router();
import User from '../../models/user'
import {MD5_SUFFIX,responseClient,md5} from '../util'


/**
 *定义回复模板
 */


router.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (!username) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if (userInfo) {
            //登录成功
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            //登录成功后设置session
            req.session.userInfo = data;

            responseClient(res, 200, 0, '登录成功', data);
            return;
        }
        responseClient(res, 200, 1, '用户名密码错误');

    }).catch(err => {
        responseClient(res, 200, 1, '用户名密码错误');
    })
});


router.post('/register', (req, res) => {
    let {username, password, passwordRe} = req.body;
    if (!username) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    if (password !== passwordRe) {
        responseClient(res, 400, 2, '两次密码不一致');
        return;
    }
    //验证用户是否已经在数据库中
    User.findOne({username: username})
        .then(data => {
            if (data) {
                responseClient(res, 200, 1, '用户名已存在');
                return;
            }
            //保存到数据库
            let user = new User({
                username: username,
                password: md5(password + MD5_SUFFIX),
                type: 'user'
            });
            user.save()
                .then(function () {
                    User.findOne({username: username})
                        .then(userInfo=>{
                            let data = {};
                            data.username = userInfo.username;
                            data.userType = userInfo.type;
                            data.userId = userInfo._id;
                            responseClient(res, 200, 0, '注册成功', data);
                            return;
                        });
                })
        }).catch(err => {
        responseClient(res);
        return;
    });
});

//用户验证
router.get('/userInfo',function (req,res) {
    if(req.session.userInfo){
        responseClient(res,200,0,'',req.session.userInfo)
    }else{
        responseClient(res,200,1,'请重新登录',req.session.userInfo)
    }
});

router.get('/logout',function (req,res) {
    req.session.destroy();
    // res.redirect('/');
    responseClient(res, 200, 0, '登出成功');
});

//删除用户
router.post('/deluser', function (req, res) {
    let idList = [];
    idList = eval(req.body._id);
    User.deleteMany({_id: {$in: idList}}, function(err){
        if(err){
            responseClient(res);
        }else{
            responseClient(res,200,0,'', {data: "删除成功"})
        }
    })
})
//修改用户角色
router.post('/changeRole', function (req, res) {
    let _id = req.body._id;
    let type = req.body.type
    User.findOneAndUpdate(
        { _id: _id},{type: type},{new: true, runValidators: true}
    ).then(doc => {
        responseClient(res,200,0,'', {data: doc})
    })
    .catch(err => {
        responseClient(res,200,1,'更新失败',err.message)
    })
})

module.exports = router;