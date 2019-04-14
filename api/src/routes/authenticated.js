import express from 'express';
import jose from 'node-jose';
import { awsKeys, clientId } from '../config/aws';

const router = express.Router();

router.post('/clocks', (req, res) => {
    let token = req.body.token;
    console.log("Token passed to authenticated: ", token);
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

            res.status(200).json({
                "clocks": [
                    {"end": new Date("April 20 2019 12:30")},
                    {"end": new Date("April 11 2019 23:58")}
                ],
            });
            return
        })
        .catch(() => {
            res.status(401).json({
                error: "Token signature verification failed",
            })
            return
        })
    })
});

export default router;