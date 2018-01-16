import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import AddProduct from  '../components/AddProduct';

const AddProductContainer = () => (
	<AddProduct />
)

export default withRouter(connect(null)(reduxForm({
	form:'productForm',
	pristine: false
})(AddProductContainer)))


