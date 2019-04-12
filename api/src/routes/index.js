import express from 'express';
import { CognitoUser } from 'amazon-cognito-identity-js';

import { userPool } from '../config/aws';

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Hello World');
});

router.post('/signup', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(`email: ${email}, password: ${password}`);

    let attributeList = [
        {
            Name: 'email',
            Value: email
        }
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            console.log(err);
            if (err.code == 'UsernameExistsException') {
                // Username already exists
            }
            // Invalid sign up
            return;
        }
        // Return successful sign up event
    });
});

router.post('/verify', (req, res, next) => {
    let email = req.body.email;
    let verificationCode = req.body.verificationCode;
    let userData = {
        Username: email,
        Pool: userPool
    };

    let cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
            console.log("err.message: " + err.message + " // err: " + JSON.stringify(err));
        }
        console.log('verification call result: ' + result);
        // Return successful verification
    });
})

export default router;