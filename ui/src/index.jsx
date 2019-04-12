import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clocks: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        fetch("/api/1")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({clocks: json.clocks, isLoading: false});
                console.log(JSON.stringify(json));
            });
    }
    render() {
        const { clocks, isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div>
                {clocks.map(clock => {
                    return <h2>{clock.end}</h2>
                }
                )}
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));