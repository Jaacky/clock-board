import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            idtoken: "",
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            let response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": event.target.email.value,
                    "password": event.target.password.value,
                }),
            });
            console.log("response ok: ", response.ok);
            if (response.ok) {
                let json = await response.json();
                console.log("json response from submit", json);
                this.setState({
                    "idToken": json.idToken,
                });
            } else {
                // Login unsuccessful
            }
        } catch(err) {
            console.log("Network err in post request", err);
        }

        this.setState({ isLoading: false });
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    <input name="email" type="email" placeholder="Email"/>
                    <label>Password:</label>
                    <input name="password" type="password" placeholder="Password"/>
                    <button type="submit" disabled={this.state.isLoading}>Login</button>
                </form>
            </div>
        )
    }
}