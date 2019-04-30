import React from 'react';
import { connect } from 'react-redux';
import styles from '../scss/styles.scss';

import Clock from '../components/Clock.jsx';

import {
    clocksRequest,
    clocksRetrieved
} from 'actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countdownEndDate: "",
            countdownEndTime: "",
        };
    }

    componentDidMount() {
        console.log("dashboard component did mount");
        this.props.sendClocksRequest(this.props.user.email);
    }

    handleAddClock = () => {

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
        // console.log("this.state.countdownEndDate: ", this.state.countdownEndDate);
        // console.log("this.state.countdownEndTime: ", this.state.countdownEndTime);
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

    // renderUserClocks = async () => {
    //     if (!(this.props.user.idToken === undefined)) {
    //         this.setState({
    //             isLoading: true,
    //         });
    //         try {
    //             let response = await fetch("/api/authenticated/clocks", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({
    //                     token: this.props.user.accessToken,
    //                 }),
    //             });
    //             console.log("fetch clcoks response ok", response.ok);
    //             if (response.ok) {
    //                 let json = await response.json();
    //                 console.log("json response from fetch clocks", json);
    //                 this.props.clocksRetrieved(json.clocks);
    //             }
    //         } catch(err) {

    //         }
    //     }
    // }

    renderError() {
        if (this.props.error.flag) {
            return (
                <h2>Error! {this.props.error.message}</h2>
            )
        }
    }

    async testCookie() {
        console.log("testCookie called");
        try {
            const response = await fetch("/api/", {
                method: "POST",
            });
            console.log("Response yielded: ", response);
            console.log("response ok: ", response.ok);
            const json = await response.json();
            console.log("json response from test cookie", json);
            return json;
        } catch (err) {
            console.log("Error in test cookie", err);
            return {};
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
        let clocks = this.props.clocks.length == 0
            ? <p>Please add a clock</p>
            : this.props.clocks.map((clock) => (
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
                <button onClick={this.testCookie}>Test Cookie</button>
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
                {this.renderError()}
                <div className={styles.clocks}>
                    {testClocks}
                    {clocks}
                    {/* {this.renderUserClocks()} */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state update in dashboard", state);
    return {
        user: state.user,
        clocks: state.clocks,
        loading: state.loading.dashboard,
        error: state.error.dashboard,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendClocksRequest: (email) => {
            dispatch(clocksRequest(email));
        },
        clocksRetrieved: (clocks) => {
            dispatch(clocksRetrieved(clocks));
        },
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;