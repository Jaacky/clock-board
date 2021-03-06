import express from 'express';
import cookieSession from 'cookie-session';

import indexRouter from './routes/index';
import clocksRouter from './routes/clocks';
import authenticatedRouter from './routes/authenticated';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'ninjacatz',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secret: 'keyboardcatz',
}));

var users = {
    "1": {
        "clocks": [
            {"end": new Date("April 20 2019 12:30")},
            {"end": new Date("April 11 2019 23:58")}
        ]
    }
}

app.use('/', indexRouter);
app.use('/clocks', clocksRouter);
app.use('/authenticated', authenticatedRouter);

app.get('/:userId', (req, res) => {
    console.log("Request made");
    if (req.params) {
        let userId = req.params.userId;
        if (userId in users) {
            res.json(users[userId]);
        }
        else {
            res.send("User does not exist")
        }
    } else {
        res.send("Currently invalid path")
    }
});

export default app;