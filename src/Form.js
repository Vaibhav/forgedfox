import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {fileHash as FILE_HASH} from "../src/FileHash";
import RaisedButton from 'material-ui/RaisedButton';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: 'Property Value',
      metadataHash: '',
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

    function printLink() {
      var objectURL = URL.createObjectURL(new Blob([this.props.result], { type: "application/pdf" }));
      console.log(objectURL);
    }

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
        <RaisedButton label="Add File" primary={true} style={{ margin: 12 }} onClick={printLink.bind(this)}/>
    </div>
    );
  }
}

export default Form;


// First & Last Name
// Email 
// Show File Details
// Description
// Time Uploaded 
// IP Address
