//SurveyFormReview handles the review submission component.

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';
import _ from 'lodash';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { //We decide on functional vs. class based components depending on whether we think the component is going to do anything itself or not.
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name} style={{ marginBottom : '5px' }}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-4 btn-flat white-text" onClick={onCancel}> 
                Back
                <i className="material-icons right">arrow_back</i>
            </button>
            <button 
                onClick={() => submitSurvey(formValues, history)}
                className="teal btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>

    );
};

function mapStatetoProps(state){
    return {
        formValues : state.form.surveyForm.values
    };
}

export default connect(mapStatetoProps, actions)(withRouter(SurveyFormReview));