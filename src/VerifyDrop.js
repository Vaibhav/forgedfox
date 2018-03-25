import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Form from './Form';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { verifyHash, getUser } from './IPFS';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Verify extends Component {
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

    const verFile = () => {
      verifyHash(USER_ADDRESS, this.props.result, meta_data)
      .then(verify => {
        this.setState({ verify, isLoading: false })
        console.log('FINISHED block await call!', verify);
      })
      .catch(err => console.log(err));
    }

    console.log("initial state of VF");
    console.log(this.state);
    verFile();
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div className='results'>
        {
          ...this.state
        }
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




class VerifyDrop extends Component {
  constructor() {
    super()
    this.state = { files: [], uploaded: false, result: null }
  }

  onDrop(files) {
    var file = files[0]
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log(event.target.result);
      this.setState({
        result: event.target.result,
      });
    };

    reader.readAsText(file);
    this.setState({
      files,
      uploaded: true,
      result: reader.result,
    });
  }

  render() {
    const divStyle = {
      width: 'fit-content',
      margin: 'auto',
      'margin-top': '10px',
      textAlign: 'center',
    };

    const style = {
      height: 25,
      width: 'fit-content',
      margin: 20,
      textAlign: 'center',
      verticalAlign: 'middle',
      display: 'inline-block',
    };

    const dropStyle = {
      width: 1000,
      height: 750,
      'border-width': 2,
      'border-color': 'rgb(102, 102, 102)',
      'border-style': 'dashed',
      'border-radius': '5px',
    }

    if (!this.state.uploaded) {
      return (
        <section className='centre' style={divStyle}>
          <div className="dropzone centre">
            <Dropzone onDrop={this.onDrop.bind(this)} style={dropStyle}>
              <p>Click here or drag and drop your file here.</p>
            </Dropzone>
          </div>
        </section>
      );
    } else {
      return (
        <div style={divStyle}>
          <h2>Dropped File</h2>
            <p>
              {
                this.state.files.map(f => <Paper style={style} zDepth={1} key={f.name}><b>{f.name}</b> - {f.size} bytes</Paper>)
              }
            </p>

        </div>
      )
    }
  }
}

export default VerifyDrop;