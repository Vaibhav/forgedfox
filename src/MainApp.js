import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MainApp extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppNavBar />  
        </MuiThemeProvider>
      </div>
    );
  }

}

export default MainApp;