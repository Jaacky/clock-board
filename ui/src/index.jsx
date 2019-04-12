import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        console.log("Hi?");
        return (
            <div>Hello world from React</div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));