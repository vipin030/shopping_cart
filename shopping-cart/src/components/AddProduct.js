import React from 'react';
import { Field } from 'redux-form';
import { FileUpload } from 'redux-file-upload';

import { required, renderField } from '../util/formValidation.js';

const AddProject = ({}) => {
	return (
		<form>
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
              <FileUpload allowedFileTypes={['jpg','png']} data={{type:'picture'}}
              dropzoneId="fileUpload" url="http://localhost:3000/file-upload">
                <button>
                Click or drag here
                </button>
              </FileUpload>
              </div>
          	</div>
         	<br/>
         	<div><button type="submit">Save</button></div>
         </div>
         </form>
		)
}

export default AddProject