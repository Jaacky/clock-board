import express from 'express';
import jose from 'node-jose';
import { awsKeys, clientId } from '../config/aws';

import { getClocks, addClock } from '../db/db';

const router = express.Router();

const authenticated = (req, res, next) => {
    let token = (req.session !== undefined && req.session !== null)
        ? req.session.jwt 
        : null;

    if (token === undefined || token === null) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return
    }

    // if (req.body === undefined || req.body.token === undefined) {
    //     res.status(401).json({
    //         error: "Unauthorized",
    //     });
    // }
    // let token = req.body.token;
    // console.log("Token passed to authenticated middleware: ", token);

    let sections = token.split('.');
    let decoded = jose.util.base64url.decode(sections[0]);
    let header = JSON.parse(decoded)
    let kid = header.kid;

    let keyIndex = -1;
    for (let i=0; i<awsKeys.length; i++) {

        if (kid === awsKeys[i].kid) {
            keyIndex = i;
            break;
        }
    }

    if (keyIndex == -1) {
        console.log("Public key not found");
        res.status(403).json({
            error: "Public key not found"
        });
        return
    }

    jose.JWK.asKey(awsKeys[keyIndex])
    .then((keystore) => {
        jose.JWS.createVerify(keystore)
        .verify(token)
        .then((results) => {
            let claims = JSON.parse(results.payload);
            console.log("Claims of JWT: ", claims);
            // Check that token has not expired
            var current_ts = Math.floor(new Date() / 1000);
            if (current_ts > claims.exp) {
                console.log("Valid token has expired");
                res.status(401).json({
                    error: "Token has expired",
                });
                return
            }

            // Check that the client ID matches
            if (claims.aud != clientId) {
                console.log("Valid token has the wrong client ID");
                res.status(401).json({
                    error: "Token was not issued for this audience",
                });
                return
            }
            req.jwt = token;
            req.jwtClaims = claims;
            next();
        })
        .catch(() => {
            res.status(401).json({
                error: "Token signature verification failed",
            });
            return
        })
    })
}

router.use(authenticated);

router.post('/', (req, res) => {
    console.log("authentication check");
    res.status(200).json({
        email: req.jwtClaims.email,
    });
    return;
});

// https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.js
router.post('/clocks', async (req, res) => {
    try {
        let email = req.jwtClaims.email;
        let clocks = await getClocks(email);
        res.status(200).json({
            "clocks": clocks
        });
    } catch(err) {
        console.log("err in post clock catch block: ", err);
        res.status(500).json({
            "error": "Error retrieving clocks for user",
        });
    }
});

router.post('/clocks/add', async (req, res) => {
    try {
        let email = req.jwtClaims.email;
        let ends_at = req.body.ends_at;
        let result = await addClock(email, ends_at);
        let clock = result[0];
        console.log("Added this clock: ", clock);
        res.status(200).json({
            clock,
        });

    } catch(err) {
        res.status(500).json({
            "error": "Error adding clock for user",
        });
    }
});

router.post('/clocks/remove', async (req, res) => {
    try {
        let email = req.jwtClaims.email;
        let ends_at = "2019-07-13T00:00:00.000Z";
        let id = req.body.id;
        let result = await removeClock(email, id, ends_at);
        console.log("Result from remove", result);
        res.status(200).json({
            result
        })
    } catch(err) {
        console.log("Error from clock remove", err);
        res.status(500).json({
            "error": "Error removing clock for user"
        });
    }
});

export default router;