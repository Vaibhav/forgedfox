import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {fileHash as FILE_HASH} from "../src/FileHash";
import RaisedButton from 'material-ui/RaisedButton';

const blockchain_user = {
  firstName: "Harman",
  lastName: "Singh",
  email: "harman.j.singh@hotmail.com"
}

const blockchain_file_contents = {
  "ipfs_path": "https://ipfs.io/ipfs/QmXgZAUWd8yo4tvjBETqzUy3wLx5YRzuDwUQnBwRGrAmAo",
  "metadata_hash": "123123123",
  "hash": "asc9898suc912",
  "added_at": Date.now(),
  "transaction_hash": "0-12i9di9i30",
  "block_number": 3,
  "block_hash": "123123123",
}

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
