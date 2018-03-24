import React, { Component } from 'react';
import TextField from 'material-ui/TextField';


class Form extends Component {
  render() {
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
        />
        <br />
        <br />
        <TextField
          id="text-field-default"
          floatingLabelText="File Hash"
          defaultValue="File Hash"
          disabled={true}
        />
        <br />
        <TextField
          id="text-field-default"
          floatingLabelText="Metadata Hash"
          defaultValue="Metadata Hash"
          disabled={true}
        /><br />
        <br />
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
