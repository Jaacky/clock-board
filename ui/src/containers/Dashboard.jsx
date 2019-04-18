import React from 'react';
import { connect } from 'react-redux';
import styles from '../scss/styles.scss';

import Clock from '../components/Clock.jsx';

import { clocksRetrieved } from 'actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countdownEndDate: "",
            countdownEndTime: "",

            isLoadingClocks: false,
        };
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
    //             isLoadingClocks: true,
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

    render() {
        // this.renderUserClocks();
        // console.log(this.state.clocks);
        let clocks = this.props.clocks.length == 0
            ? <p>Please add a clock</p>
            : this.props.clocks.map((clock) => (
                <Clock endTime={clock["ends_at"]}/>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clocksRetrieved: (clocks) => {
            dispatch(clocksRetrieved(clocks));
        },
    }
}

const DashboardContainer = connect(
    mapStateToProps,
)(Dashboard);

export default DashboardContainer;