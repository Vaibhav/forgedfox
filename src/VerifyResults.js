import React, { Component } from 'react';
import { verifyHash, getUser } from './IPFS';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class VerifyResults extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const USER_ADDRESS = '0x8FDfccE1d7Ff2F00D86c68B7a0e50A074FB76b26' ;

    const verFile = () => {
      verifyHash(USER_ADDRESS, this.props.result)
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