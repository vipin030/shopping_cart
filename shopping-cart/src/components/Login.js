import React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = value => (value ? undefined : 'Required')
const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
	<div>
	<label>{label}</label>
	<div>
	<input {...input} placeholder={label} type={type} />
	{touched &&
		((error && <span>{error}</span>) ||
		(warning && <span>{warning}</span>))}
	</div>
	</div>
	);
const Login = ({ submitting, handleSubmit, authAction, historyObj }) => {
	const handleFormSubmit = (formProps) => {
		console.log("form event triggered", formProps);
		authAction(formProps).then(()=>{
			historyObj.push('home');
		},()=> {
			console.log("Auth Failed")
		});
		return;
	}
	return (
		<form  onSubmit={handleSubmit(handleFormSubmit)}>
			<div className="panel panel-default">
        	<div className="input-group">
              <label className="col-sm-2 control-label">Username: </label>
              <div className="col-sm-10">
              <Field type="text" name="username" component={renderField} validate={[required]} />
              </div>
          	</div>
         	<br/>
          	<div className="input-group">
          		<label className="col-sm-2 control-label">Password: </label>
          		<div className="col-sm-10">
            	<Field type="password" name="password" component={renderField} validate={[required]}/>
          		</div>
        	</div>
        	<div>
        	<input type="submit" value="Save" disabled={submitting} />
        	</div>
        	</div>
		</form>
		)
}

export default Login;