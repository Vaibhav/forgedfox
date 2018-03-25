import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {fileHash as FILE_HASH} from "../src/FileHash";
import RaisedButton from 'material-ui/RaisedButton';
import BR from './BlockchainResults';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: 'Property Value',
      metadataHash: '',
      addedFile: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      description: event.target.value,
      metadataHash: FILE_HASH(event.target.value),
    });
  };

  render() {
    var fileHash = FILE_HASH((this.props.file.lastModified + this.props.file.size).toString() + this.props.file.name);
    console.log(this.props.file);
    function onclickHandler() {
      this.setState({
        addedFile: true,
      });
      // var objectURL = URL.createObjectURL(new Blob([this.props.result], { type: "application/pdf" }));
      // console.log(objectURL);
      // const meta_data = {
      //   "description": this.state.description,
      //   "file_size": this.props.file.size,
      //   "lastModified": this.props.file.lastModified,
      //   "name": this.props.file.name
      // }
      // const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26';
      // var xxx = createFile(USER_ADDRESS, this.props.result, meta_data);
      // console.log(xxx);
    }
    if (!this.state.addedFile) {
      return (
        <div>
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
          />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
          />
          <br />
          <br />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
          /><br />
          <TextField
            hintText="File Description"
            floatingLabelText="File Description"
            multiLine={true}
            rows={2}
            floatingLabelStyle={{ position: 'relative'}}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <TextField
            id="text-field-default"
            floatingLabelText="File Hash"
            value={fileHash}
            disabled={true}
          />
          <br />
          <TextField
            id="text-field-default"
            floatingLabelText="Metadata Hash"
            value={this.state.metadataHash}
            disabled={true}
          /><br />
          <br />
          <RaisedButton label="Add File" primary={true} style={{ margin: 12 }} onClick={onclickHandler.bind(this)}/>
      </div>
      );
    }
    return (
      <BR description={this.state.description} {...this.props}/>
    )
  }
}

export default Form;


// First & Last Name
// Email 
// Show File Details
// Description
// Time Uploaded 
// IP Address
