import React, { Component } from 'react';
import './BlockchainResults.css';
import RaisedButton from 'material-ui/RaisedButton';
import { createFile, getUser } from './IPFS';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class BR extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const meta_data = {
      "description": this.props.description,
      "file_size": this.props.file.size,
      "lastModified": this.props.file.lastModified,
      "name": this.props.file.name,
    }
    const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26' ;

    const popFile = () => {
      createFile(USER_ADDRESS, this.props.result, meta_data)
      .then(block => {
        this.setState({ block, isLoading: false })
        console.log('FINISHED block await call!', block);
      })
      .catch(err => console.log(err));
    }

    const popUser = () => {
      getUser(USER_ADDRESS)
      .then(user => {
        this.setState({ user })
        console.log('FINISHED user await call!', user);
      })
      .catch(err => console.log(err));
    }

    console.log("initial state of BR");
    console.log(this.state);
    popFile();
    popUser();
  }

  render() {
    console.log("render state of BR");
    console.log(this.state);
    console.log('props', this.props);

    if (!this.state.isLoading) {
      return (
        <div className='results'>
        <table className="table-fill">
          <thead>
            <tr>
            <th className="text-left">Property</th>
            <th className="text-left">Value</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            <tr>
              <td className="text-left">Contract Address</td>
              <td className="text-left">{this.state.block.contractAddress}</td>
            </tr>
            <tr>
            <td className="text-left">Owner</td>
            <td className="text-left">{this.state.user.Owner}</td>
            </tr>
            <tr>
            <td className="text-left">Submitted By</td>
            <td className="text-left">{this.state.user.FirstName + ' ' + this.state.user.LastName}</td>
            </tr>
            <tr>
            <td className="text-left">Email</td>
            <td className="text-left">{this.state.user.Email}</td>
            </tr>
            <tr>
            <td className="text-left">Added At</td>
            <td className="text-left">{this.state.block.added_at}</td>
            </tr>
            <tr>
            <td className="text-left">Metadata Hash</td>
            <td className="text-left">{this.state.block.metadata_hash}</td>
            </tr>
            <tr>
            <td className="text-left">File Hash</td>
            <td className="text-left">{this.state.block.hash}</td>
            </tr>
            <tr>
            <td className="text-left">Transaction Hash</td>
            <td className="text-left">{this.state.block.transaction_hash}</td>
            </tr>
            <tr>
            <td className="text-left">Block Hash</td>
            <td className="text-left">{this.state.block.block_hash}</td>
            </tr>
            <tr>
            <td className="text-left">Block Number</td>
            <td className="text-left">{this.state.block.block_number}</td>
            </tr>
          </tbody>
        </table>
        <RaisedButton label="Download File" primary={true} style={{ margin: 12 }}/>
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

export default BR;


