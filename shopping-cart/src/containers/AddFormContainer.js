import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { uploadDocumentRequest } from '../action';

import AddProduct from  '../components/AddProduct';
const afterSubmit = (result, dispatch) =>
  dispatch(reset('productForm'));
const AddProductContainer = ({ handleSubmit, uploadDocumentRequest, alert }) => (
	<AddProduct messageObj={alert} handleSubmit={ handleSubmit } uploadDocumentRequest={ uploadDocumentRequest } />
)

const mapStateToProps = (state) => ({
	alert: state.alert
})

export default withRouter(connect(mapStateToProps,{ uploadDocumentRequest })(reduxForm({
	form:'productForm',
	onSubmitSuccess: afterSubmit,
	pristine: false
})(AddProductContainer)))


