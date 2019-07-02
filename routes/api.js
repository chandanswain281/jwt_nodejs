var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
      text:"My Api"
  });
});

router.post('/login', function(req, res){
    const user = {id:3,name: "chandan",email:"chandan@gmail.com"}
    const token = jwt.sign({user},'mysecretekey');
    res.json({
        token: token
    });
})

router.get('/protected', ensuretoken, function(req, res){
    jwt.verify(req.token,'mysecretekey', function(err,data){
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                text: 'this is protected method',
                data: data
            })
        }
    })
})


function ensuretoken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}

module.exports = router;
