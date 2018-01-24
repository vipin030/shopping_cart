import React from 'react';
import ReactDOM from 'react-dom';
import { Field } from 'redux-form';
import {
  Control,
  Form,
  combineForms
} from 'react-redux-form';

import { required, renderField } from '../util/formValidation.js';

const AddProject = ({ handleSubmit, uploadDocumentRequest, messageObj }) => {
  let image,image_data;
  const onFormSubmit = (data) => {
        let formData = new FormData();
        console.log(data,image_data);
        formData.append('name', data.name)
        formData.append('file', image_data);
        formData.append('description', data.name)
        formData.append('price', data.name)
        formData.append('image', '')
        formData.append('UserId',1)
        console.log(formData);
        uploadDocumentRequest(formData).then((response, image)=>{
          console.log("Response.....",response)
          image.value = "";
        });
  }
  const onChange = (e) => {
        if(e.target.name === "image")
          image_data = e.target.files[0];
  }
	return (
		<form  onSubmit={handleSubmit(onFormSubmit)} encType="multipart/form-data">
		<div className="panel panel-default">
        	<div className="input-group">
              <label className="col-sm-2 control-label">Name: </label>
              <div className="col-sm-10">
              <Field type="text" name="name" component={renderField} validate={[required]} />
              </div>
          	</div>
         	<br/>
         	<div className="input-group">
              <label className="col-sm-2 control-label">Description: </label>
              <div className="col-sm-10">
              <Field type="text" name="description" component={renderField} validate={[required]} />
              </div>
          	</div>
         	<br/>
         	<div className="input-group">
              <label className="col-sm-2 control-label">Price: </label>
              <div className="col-sm-10">
              <Field type="date" name="price" component={renderField} validate={[required]} />
              </div>
          	</div>
         	<br/>
         	<div className="input-group">
              <label className="col-sm-2 control-label">Picture: </label>
              <div className="col-sm-10">
              
              <input type="file" name="image" onChange={onChange} />
              </div>
          	</div>
         	<br/>
         	<div><button type="submit">Save</button></div>
          
          { messageObj.message && (<div>{messageObj.message}</div>)}

         </div>
         </form>
		)
}

export default AddProject