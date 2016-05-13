import express from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../jwt.config.json';
const router = express.Router();

router.post('/login', function(req, res) {
      const credentials = req.body;
      if(credentials.user==='admin' && credentials.password==='password'){

        const profile = {'user': credentials.user, 'role': 'ADMIN'};
        const jwtToken = jwt.sign(profile, jwtConfig.secret, {'expiresIn' : 5*60}); 
        res.status(200).json({
          id_token: jwtToken
        });

        //res.json({'user': credentials.user, 'role': 'ADMIN'});   
      }else{
        res.status(401).json({'message' : '账户/密码不正确'});
      }
});

router.post('/logout', function(req, res) {
    res.status(200).json({'message' : '用户登出'});   
});

module.exports = router;
