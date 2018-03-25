import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Paper from 'material-ui/Paper';
import VerifyResults from './VerifyResults';


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
      console.log('booty', this.state);
      console.log('booty props', this.props);
      return (
        <div style={divStyle}>
          <h2>Dropped File</h2>
            <p>
              {
                this.state.files.map(f => <Paper style={style} zDepth={1} key={f.name}><b>{f.name}</b> - {f.size} bytes</Paper>)
              }
            </p>
            <VerifyResults result={this.state.result} />
        </div>
      )
    }
  }
}

export default VerifyDrop;