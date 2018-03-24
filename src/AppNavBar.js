import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drop from './Drop';

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
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab
      label="Manage Document"
    >
      <div>
        <h2 style={styles.headline}>Tab Three</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
  </div>
);


export default AppNavBar;