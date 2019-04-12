import express from 'express';

import indexRouter from './routes/index';
import clocksRouter from './routes/clocks';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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