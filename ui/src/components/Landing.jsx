import React from 'react';
import styles from '../scss/styles.scss';

import Clock from '../components/Clock.jsx';

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countdownEndDate: "",
            countdownEndTime: "",
            clocks: [],
            error: ""
        };
    }

    handleChange = (event) => {
        // console.log(event);
        console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.countdownEndTime === "" || this.state.countdownEndDate === "") {
            this.setState({
                error: "Please specify a valid date",
            });
            return
        }

        let year = this.state.countdownEndDate.slice(0, 4);
        let month = this.state.countdownEndDate.slice(5, 7) - 1;
        let day = this.state.countdownEndDate.slice(8);
        let hours = this.state.countdownEndTime.slice(0, 2)
        let minutes = this.state.countdownEndTime.slice(3)

        let date = new Date(year, month, day, hours, minutes);
        let clock = { endTime: date }

        this.setState({
            clocks: [...this.state.clocks, clock],
            countdownEndDate: "",
            countdownEndTime: ""
        })
    }

    renderError() {
        if (this.state.error !== "") {
            return (
                <h2 className={styles.error}>{this.state.error}</h2>
            )
        }
    }

    render() {
        console.log("this.props", this.props);
        if (this.props.loading) {
            return (
                <h1>Loading clocks...</h1>
            )
        }
        // this.renderUserClocks();
        // console.log(this.state.clocks);
        let clocks = this.state.clocks.length == 0
            ? <p>Please add a clock</p>
            : this.state.clocks.map((clock) => (
                <Clock endTime={new Date(clock["ends_at"])}/>
            ))

        let testClocks = [
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-04-13T00:00:00.000Z")} />
        ]
        return (
            <div>
                {this.renderError()}
                <form onSubmit={this.handleSubmit} className={styles.form}>
                    <input
                        name="countdownEndDate"
                        type="date"
                        onChange={this.handleChange}
                        value={this.state.countdownEndDate}
                    />
                    <input
                        name="countdownEndTime"
                        type="time"
                        onChange={this.handleChange}
                        value={this.state.countdownEndTime}
                    />
                    <button
                        type="submit"
                    >
                        Add Countdown
                    </button>
                </form>

                <div className={styles.clocks}>
                    {testClocks}
                    {clocks}
                </div>
            </div>
        )
    }
}

export default Landing;