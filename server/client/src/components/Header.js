import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //The link tag is used to navigate around our react components without jumping full HTML pages. ReactRouter!
import Payments from './Payments';

class Header extends Component {
    renderContent() { //The helper method that will help us modify the component depending on the login state of our user.
        switch (this.props.auth) {
            case null:
                return;

            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );

            default: //This array return allows us to pass back multiple elements
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render(){
        return (
            <nav>
                <div className='nav-wrapper'>
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                      { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }){ //Links our component to the state in the overall redux store
    return { auth };
}

export default connect(mapStateToProps)(Header);