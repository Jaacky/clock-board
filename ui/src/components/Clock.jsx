import React from 'react';

import styles from '../scss/styles.scss';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        let now = new Date();
        let difference = new Date(props.endTime - now);
        this.state = {
            now,
            difference,
            end: false,
        };
    }

    tick = () => {
        let now = new Date();
        let difference = new Date(this.props.endTime - now);
        // console.log("Now: ", now);
        // console.log("this.props.endtime: ", this.props.endTime);
        // console.log("now >= this.props.endTime: ", now >= this.props.endTime);
        if (now >= this.props.endTime) {
            clearInterval(this.intervalId);
            this.setState({ end: true });
        }
        this.setState({
            now,
            difference
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        if (this.state.end) {
            return (
                <div className={styles.clock}>
                    <h1>Lifted off!</h1>
                    <p>At {this.props.endTime.toLocaleString()}</p>
                </div>
            )
        }
        let difference = this.state.difference;
        let ms = difference % 1000;

        difference = (difference - ms) / 1000;
        let seconds = (difference % 60).toString().padStart(2, '0');
        difference = (difference - seconds) / 60;
        let minutes = (difference % 60).toString().padStart(2, '0');
        difference = (difference - minutes) / 60;
        let hours = (difference % 24).toString().padStart(2, '0');
        let days = ((difference - hours) / 24).toString().padStart(2, '0');

        return (
            <div key={this.props.endTime} className={styles.clock}>
                {/* <p>Now: {this.state.now.toISOString()}</p> */}
                {/* <p>End: {this.props.endTime.toISOString()}</p> */}
                <div className={styles.countdown}>
                    <div className={styles.time}>
                        <div>{days}</div>
                        <div>days</div>
                    </div>
                    <div className={styles.time}>
                        <div>{hours}</div>
                        <div>hours</div>
                    </div>
                    <div className={styles.time}>
                        <div>{minutes}</div>
                        <div>minutes</div>
                    </div>
                    <div className={styles.time}>
                        <div>{seconds}</div>
                        <div>seconds</div>
                    </div>
                </div>
                <div>
                    Until: {this.props.endTime.toLocaleString()}
                </div>
                <button>Stop</button>
            </div>
        )
    }
}