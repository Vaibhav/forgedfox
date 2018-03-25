import React, { Component } from 'react';
import './BlockchainResults.css';
import RaisedButton from 'material-ui/RaisedButton';
import { createFile } from './IPFS';
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
      "name": this.props.file.name
    }
    const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26' ;

    const fun = () => {
      createFile(USER_ADDRESS, this.props.result, meta_data)
      .then(block => {
        this.setState({ block, isLoading: false })
        this.setState()
        console.log('FINISHED await call!', block);
      })
      .catch(err => console.log(err));
    }
    console.log("initial state of BR");
    console.log(this.state);
    fun();
  }

  render() {
    console.log("render state of BR");
    console.log(this.state);

    const blockchain_user = {
      firstName: "Paul",
      lastName: "Iozzo",
      email: "harman.j.singh@hotmail.com"
    }

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
              <td className="text-left">Filename</td>
              <td className="text-left">{'filename'}</td>
            </tr>
            <tr>
            <td className="text-left">Submitted By</td>
            <td className="text-left">{blockchain_user.firstName + ' ' + blockchain_user.lastName}</td>
            </tr>
            <tr>
            <td className="text-left">Email</td>
            <td className="text-left">{blockchain_user.email}</td>
            </tr>
            <tr>
            <td className="text-left">Added At</td>
            <td className="text-left">{this.state.added_at}</td>
            </tr>
            <tr>
            <td className="text-left">Metadata Hash</td>
            <td className="text-left">{this.state.metadata_hash}</td>
            </tr>
            <tr>
            <td className="text-left">File Hash</td>
            <td className="text-left">{this.state.hash}</td>
            </tr>
            <tr>
            <td className="text-left">Transaction Hash</td>
            <td className="text-left">{this.state.transaction_hash}</td>
            </tr>
            <tr>
            <td className="text-left">Block Hash</td>
            <td className="text-left">{this.state.block_hash}</td>
            </tr>
            <tr>
            <td className="text-left">Block Number</td>
            <td className="text-left">{this.state.block_number}</td>
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
          size={50}
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


