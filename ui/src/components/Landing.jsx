import React from 'react';
import { Link } from 'react-router-dom'

import styles from '../scss/styles.scss';

import Clock from '../components/Clock.jsx';
import ClockForm from 'components/ClockForm';

class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countdownEndDate: "",
            countdownEndTime: "",
            clocks: [
                {
                    ends_at: "2019-07-13T00:00:00.000Z"
                },
            ],
            error: ""
        };
    }

    componentDidMount() {
        // this.props.sendAuthenticationCheckRequest();
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
        console.log(date);
        let clock = { ends_at: date }

        this.setState({
            clocks: [...this.state.clocks, clock],
            countdownEndDate: "",
            countdownEndTime: ""
        })
    }

    handleInMemoryClockSubmit = (clock) => {
        this.setState({
            clocks: [...this.state.clocks, clock],
        });
    }

    handleInMemoryClockStop = () => {
        this.setState({
            clocks: []
        });
    }

    renderForm() {
        if (this.state.clocks.length > 0) {
            return (
                <div className={styles.clockBox}>
                    <div className={styles.clockPlaceholder}>
                        <h2>To create more please:</h2>
                        <div className={styles.cta}>
                            <Link key="headerRegister" to="/register">
                                <button className={styles.signUp}>Sign Up</button>
                            </Link>
                        </div>
                        <div className={styles.cta}>
                            <Link key="headerLogin" to="/login">
                                <button className={styles.secondary}>Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <ClockForm
                onSubmit={this.handleInMemoryClockSubmit}
            />
        )
    }

    renderError() {
        if (this.state.error !== "") {
            return (
                <h2 className={styles.error}>{this.state.error}</h2>
            )
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <h1>Loading clocks...</h1>
            )
        }
        let clocks = this.state.clocks.map((clock) => (
            <Clock
                id={5}
                endTime={new Date(clock["ends_at"])}
                onStop={this.handleInMemoryClockStop}
            />
        ))

        return (
            <div className={styles.landing}>
                {this.renderError()}
                
                <div className={styles.clocks}>
                    {clocks}
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}

export default Landing;