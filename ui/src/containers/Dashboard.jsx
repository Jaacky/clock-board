import React from 'react';
import { connect } from 'react-redux';
import styles from '../scss/styles.scss';

import Clock from 'components/Clock';
import ClockForm from 'components/ClockForm';

import {
    clocksRequest,
    addClockRequest,
    removeClockRequest,
} from 'actions';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("dashboard component did mount");
        this.props.sendClocksRequest(this.props.user.email);
    }

    handlePersistentClockSubmit = (clock) => {
        let { sendAddClockRequest } = this.props;
        let isoTimeString = clock.ends_at.toISOString();
        sendAddClockRequest(isoTimeString);
        // this.setState({
        //     clocks: [...this.state.clocks, clock],
        // });
    }

    handlePersistentClockStop = (id, ends_at) => {
        let { sendRemoveClockRequest } = this.props;
        sendRemoveClockRequest(id, ends_at);
        // console.log("Hello");
    }

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

        let clocks = this.props.clocks.map((clock) => (
            <Clock
                id={clock["id"]}
                endTime={new Date(clock["ends_at"])}
                onStop={this.handlePersistentClockStop}
            />
        ))

        let testClocks = [
            // <Clock endTime={new Date("2019-05-17T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-05-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-05-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-05-13T00:00:00.000Z")} />,
            // <Clock endTime={new Date("2019-05-13T00:00:00.000Z")} />,
        ]
        return (
            <div>
                <button onClick={this.testCookie}>Test Cookie</button>
                {this.renderError()}
                <div className={styles.clocks}>
                    <ClockForm onSubmit={this.handlePersistentClockSubmit}/>
                    {testClocks}
                    {clocks}
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
        sendAddClockRequest: (ends_at) => {
            dispatch(addClockRequest(ends_at));
        },
        sendRemoveClockRequest: (id, ends_at) => {
            console.log("send remove clock request, id, ends_at", id, ends_at);
            dispatch(removeClockRequest(id, ends_at));
        },
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;