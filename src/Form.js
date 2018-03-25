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
    }
    if (!this.state.addedFile) {
      return (
        <div>
          <TextField
            hintText="First Name"
            floatingLabelText="First Name"
            value="Paul"
          />
          <br />
          <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            value="Iozzo"
          />
          <br />
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            value="paul@hotmail.com"
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
