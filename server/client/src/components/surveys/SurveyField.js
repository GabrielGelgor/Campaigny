//SurveyField contains logic to render a single label with text in it
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => { //Pass through all results caught by event handlers
    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom : '5px' }} />
            <div className="red-text" style={{ marginBottom : '20px' }}>
                {touched && error}
            </div>
            
        </div>
    );
};