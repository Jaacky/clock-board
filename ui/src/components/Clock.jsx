import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        let now = new Date()
        let difference = new Date(props.endTime - now)
        this.state = {
            now,
            difference
        }
    }

    tick = () => {
        let now = new Date()
        let difference = new Date(this.props.endTime - now)
        this.setState({
            now,
            difference
        })
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
        let days = Math.ceil(this.state.difference / (1000 * 3600 * 24)).toString().padStart(3, '0');
        let hours = this.state.difference.getUTCHours().toString().padStart(2, '0');
        let minutes = this.state.difference.getUTCMinutes().toString().padStart(2, '0');
        let seconds = this.state.difference.getUTCSeconds().toString().padStart(2, '0');
        return (
            <div key={this.props.endTime}>
                <p>Now: {this.state.now.toISOString()}</p>
                <p>End: {this.props.endTime.toISOString()}</p>
                <div>
                    <div>
                        {days}
                        <span>days</span>
                    </div>
                    <div>
                        {hours}
                        <span>hours</span>
                    </div>
                    <div>
                        {minutes}
                        <span>minutes</span>
                    </div>
                    <div>
                        {seconds}
                        <span>seconds</span>
                    </div>
                </div>
            </div>
        )
    }
}