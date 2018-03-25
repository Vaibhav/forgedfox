import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drop from './Drop';
import DropForVerify from './DropForVerify';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


const AppNavBar = () => (
  <div>
  <Tabs>
    <Tab label="Upload Document" >
      <Drop />
    </Tab>
    <Tab label="Verify Document" >
      <div>
        <DropForVerify />
      </div>
    </Tab>
  </Tabs>
  </div>
);


export default AppNavBar;