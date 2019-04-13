import React from 'react';

import Clock from '../components/Clock.jsx';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clocks: [],
            countdownEndDate: "",
            countdownEndTime: "",
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

        let date = new Date(this.state.countdownEndDate)
        let hours = this.state.countdownEndTime.slice(0, 2)
        let minutes = this.state.countdownEndTime.slice(3)
        date.setHours(hours)
        date.setMinutes(minutes)

        console.log(date.toISOString());
        let clock = { endTime: date }

        this.setState({
            clocks: [...this.state.clocks, clock],
            countdownEndDate: "",
            countdownEndTime: ""
        })
    }

    render() {
        console.log(this.state.clocks);
        let clocks = this.state.clocks.length == 0
            ? <p>Please add a clock</p>
            : this.state.clocks.map((clock) => (
                <Clock endTime={clock.endTime}/>
            ))

        console.log("After mapping", clocks);
        return (
            <div>
                Dashboard
                <form onSubmit={this.handleSubmit}>
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

                Clocks:

                {clocks}
            </div>
        )
    }
}