import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { reduxForm } from 'redux-form';
import { authAction } from '../action';

import Login from '../components/Login';
const afterSubmit = (result, dispatch) => {
 	console.log("Succes...", result)
}
const LoginContainer = ({handleSubmit, authAction, history}) => (
	<Login handleSubmit={handleSubmit} authAction={authAction} historyObj={history}/>
)

export default withRouter(connect(null,{authAction})(reduxForm({
  form: 'fieldLevelValidation', // a unique identifier for this for
  onSubmitSuccess: afterSubmit,
  pristine:false,
})(LoginContainer)))