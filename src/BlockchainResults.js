import React, { Component } from 'react';
import './BlockchainResults.css';
import RaisedButton from 'material-ui/RaisedButton';
import { createFile } from './IPFS';

class BR extends Component {

  componentWillMount() {
    console.log("BR BR");
    console.log(this.props);
  }

  componentDidMount() {

    const meta_data = {
      "description": this.props.description,
      "file_size": this.props.file.size,
      "lastModified": this.props.file.lastModified,
      "name": this.props.file.name
    }
    const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26' ;
    // var xxx = createFile(USER_ADDRESS, this.props.result, meta_data);
    // console.log(xxx);

    const fun = () => {
      createFile(USER_ADDRESS, "asdasd", {
        "description": "yooo"
    })//this.props.result, meta_data)
      .then(block => {
        this.setState({ block })
        console.log(block);
      })
      .catch(err => console.log(err));
    }
    fun();
  }

  render() {

    console.log("state of BR");
    console.log(this.state);

    const blockchain_user = {
      firstName: "Paul",
      lastName: "Iozzo",
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
          <td className="text-left">{blockchain_file_contents.added_at}</td>
          </tr>
          <tr>
          <td className="text-left">Metadata Hash</td>
          <td className="text-left">{blockchain_file_contents.metadata_hash}</td>
          </tr>
          <tr>
          <td className="text-left">File Hash</td>
          <td className="text-left">{blockchain_file_contents.hash}</td>
          </tr>
          <tr>
          <td className="text-left">Transaction Hash</td>
          <td className="text-left">{blockchain_file_contents.transaction_hash}</td>
          </tr>
          <tr>
          <td className="text-left">Block Hash</td>
          <td className="text-left">{blockchain_file_contents.block_hash}</td>
          </tr>
          <tr>
          <td className="text-left">Block Number</td>
          <td className="text-left">{blockchain_file_contents.block_number}</td>
          </tr>
        </tbody>
      </table>
      <RaisedButton label="Download File" primary={true} style={{ margin: 12 }}/>
      </div>
    );
  }
}

export default BR;


