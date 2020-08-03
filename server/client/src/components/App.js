//The scaffolding for our web page! Setting up where/how we access our react components

import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component {
    componentDidMount() { //Has the component been initialized? Has the user been logged in?
        this.props.fetchUser();
    }

    render () {
        return (
            //To configure our routes within browserrouter, we create new route elements with a path (how to get to that component) and component (what component to load)
            <div className="container">
                <BrowserRouter>
                    <div className="container"> 
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App); //first arg is reserved for mount-stage arguments, second is for all the actions we'd like to wire up.