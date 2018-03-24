import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class Drop extends Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    const divStyle = {
      width: 'fit-content',
      margin: '0 auto',
      textAlign: 'center',
    };

    return (
      <section className='centre' style={divStyle}>
        <div className="dropzone centre">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default Drop;