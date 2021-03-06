import React from 'react';

export const required = value => (value ? undefined: 'Required');
export const renderField = ({ input, label, type, meta: { touched, error, warning }}) => (
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

//export required;
//export renderField;