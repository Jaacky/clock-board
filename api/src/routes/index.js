import express from 'express';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

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
                res.status(409).json({
                    error: "Email is already used",
                });
                return;
            }
            // Invalid sign up
            res.status(400).json({
                error: "Error signing up, please try again",
            })
            return;
        }
        console.log("Successful signup, result: ", result);
        res.status(201).json({
            email: result.user.getUsername(),
        });
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
            res.status(401).json({
                error: "Invalid verification",
            });
            return;
        }
        console.log('verification call result: ' + result);
        res.status(200).json({
            message: "Successful verification",
        });
        // Return successful verification
    });
});

router.post('/signin', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(`email: ${email}, password: ${password}`);

    let authentcationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    let cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    cognitoUser.authenticateUser(authentcationDetails, {
        onSuccess: (result) => {
            console.log("Successful signin: ", result);
            let accessToken = result.getAccessToken().getJwtToken();
            let idToken = result.getIdToken().getJwtToken();
            console.log("result.getIdToken(): ", result.getIdToken());
            console.log(result.getIdToken().payload);
            res.status(200).json({
                accessToken,
                idToken,
                newUser: false,
            });
            return;
        },
        onFailure: (err) => {
            console.log("Error signing in: ", err);
            if (err.code === 'UserNotConfirmedException') {
                console.log("User has not confirmed acount");
                res.status(200).json({
                    newUser: true,
                });
                return;
            } else {
                res.status(401).json({
                    error: "Unauthorized",
                });
                return;
            }
        },
    });
});

router.post('/forgot-password', (req, res, next) => {
    console.log("Forgot password POST call");
    let email = req.body.email;
    let code = req.body.code;
    let newPassword = req.body.newPassword;

    let cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
            console.log("Password confirmed!");
            res.status(201).json({
                message: "Successfully changed password",
            });
        },
        onFailure: (err) => {
            console.log("Password not confirmed");
            res.status(400).json({
                error: "Unsuccessfully changed password",
            });
        }
    })
    // TODO: this bit is for sending the forgot password request to AWS, the input verification needs to be manunal from user
    // cognitoUser.forgotPassword({
    //     onSuccess: (data) => {
    //         console.log("CodeDeliveryData from forgot password: ", data);
    //     },
    //     onFailure: (err) => {
    //         res.status(400).json({
    //             error: "Error reseting password"
    //         });
    //     },
    //     inputVerificationCode: (data) => {
    //         console.log("Code sent to: ", data);
    //         let code = req.body.code;
    //         let newPassword = req.body.newPassword;

    //         // cognitoUser.confirmPassword(code, newPassword, {
    //         //     onSuccess: () => {
    //         //         console.log("Password confirmed!");
    //         //         res.status(201).json({
    //         //             message: "Successfully changed password",
    //         //         });
    //         //     },
    //         //     onFailure: (err) => {
    //         //         console.log("Password not confirmed");
    //         //         res.status(400).json({
    //         //             error: "Unsuccessfully changed password",
    //         //         });
    //         //     }
    //         // })
    //     }
    // })
});

router.post('/delete', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(`email: ${email}, password: ${password}`);

    let authentcationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    let cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    cognitoUser.authenticateUser(authentcationDetails, {
        onSuccess: (result) => {
            console.log("Successful authentication: ", result);
            
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    console.log("Error deleting user: ", err);
                    console.log("Error deleting user: result", result);
                    res.status(400).json({
                        message: "Error deleting user",
                    });
                    return;
                }
                console.log("Delete user, result: ", result);
                res.status(200).json({
                    message: "Successfully deleted user",
                });
                return;
            });
        },
        onFailure: (err) => {
            console.log("Error deleting user in: ", err);
            res.status(401).json({
                error: "Unauthorized",
            });
            return;
        },
    });
});

export default router;