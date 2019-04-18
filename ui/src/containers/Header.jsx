import React from 'react';
import { connect } from 'react-redux';

import Login from 'components/Login';
import Registration from 'containers/Registration';

import { login } from 'actions';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAccountPrompts = () => {
        if (this.props.user.idToken === undefined) {
            return (
                <div>
                    <Registration/>
                    <Login login={this.props.login}/>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderAccountPrompts()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state in header", state);
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch(login(user));
        },
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);

export default HeaderContainer;