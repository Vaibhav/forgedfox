import React, { Component } from 'react';
import { verifyHash, getUser } from './IPFS';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class VerifyResults extends Component {
  constructor() {
    super();
    this.state = { isLoading: true, address: false};
  }

  handleChange = (event) => {
    this.setState({
      contract_address: event.target.value,
    });
  };


  componentDidMount() {
    const CONTRACT_ADDRESS = this.state.contract_address;

    const verFile = () => {
      verifyHash(CONTRACT_ADDRESS, this.props.result)
      .then(verify => {
        this.setState({ verify, isLoading: false })
        console.log('FINISHED block await call!', verify);
      })
      .catch(err => console.log(err));
    }

    console.log("initial state of VF");
    console.log(this.state);
    if (this.state.address) verFile();
  }

  render() {

    const verFile = () => {
      verifyHash(this.state.contract_address, this.props.result)
      .then(verify => {
        this.setState({ verify, isLoading: false })
        console.log('FINISHED block await call!', verify);
      })
      .catch(err => console.log(err));
    }

    function onclickHandler() {
      this.setState({
        address: true,
      });
      verFile();
    }


    if (!this.state.address) {
      return (
        <div>
        <TextField
            hintText="Enter Conctract Address"
            floatingLabelText="Conctract Address"
            multiLine={true}
            rows={2}
            floatingLabelStyle={{ position: 'relative'}}
            onChange={this.handleChange}
          />
      <RaisedButton label="Add File" primary={true} style={{ margin: 12 }} onClick={onclickHandler.bind(this)}/>
      </div>
      );

    } else if (!this.state.isLoading) {
      return (
        <div className='results'>
        <h2> 
          {this.state.verify.found ? "File Could Not Be Found" : 
          <div> 
            ipfsPath : {this.state.verify.ipfsPath}
            addedAt : {this.state.verify.addedAt}
            creator : {this.state.verify.creator}
            fileHash : {this.state.verify.fileHash}
            metaDataHash : {this.state.verify.metadataHash}
          </div>}
        </h2>
        </div>
      );
    }
    return (
      <div className='center'>
        <RefreshIndicator
          size={75}
          left={70}
          top={0}
          loadingColor="#FF9800"
          status="loading"
          style={{ position: 'relative' }}
        />
      </div>
    )
  }
}

export default VerifyResults;