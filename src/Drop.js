import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Form from './Form';

class Drop extends Component {
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
    const tmp = reader.readAsArrayBuffer(file);
    console.log(tmp);
    this.setState({
      files,
      uploaded: true,
      result: reader.result,
    });
  }

  render() {
    const divStyle = {
      width: 'fit-content',
      margin: '0 auto',
      textAlign: 'center',
    };

    if (!this.state.uploaded) {
      return (
        <section className='centre' style={divStyle}>
          <div className="dropzone centre">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
        </section>
      );
    } else {
      return (
        <div style={divStyle}>
          <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <Form file={this.state.files} result={this.state.result}/>
        </div>
      )
    }
  }
}

export default Drop;