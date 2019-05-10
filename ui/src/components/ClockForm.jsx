import React from 'react';
import styles from '../scss/styles.scss';

class ClockForm extends React.Component {
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
        console.log("Submit clicked");
        this.setState({
            error: "",
        });

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
        console.log(date);
        let clock = { ends_at: date }

        this.props.onSubmit(clock);
    }

    renderError() {
        if (this.props.error !== undefined) {
            return (
                <h2 className={styles.error}>{this.props.error}</h2>
            )
        } else if (this.state.error !== "") {
            return (
                <h2 className={styles.error}>{this.state.error}</h2>
            )
        }
    }

    render() {
        return (
            <div className={styles.clockPlaceholder}>
                <h1>Countdown to:</h1>
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
                    <button type="submit">Start</button>
                </form>
                {this.renderError()}
            </div>
        )
    }
}

export default ClockForm;