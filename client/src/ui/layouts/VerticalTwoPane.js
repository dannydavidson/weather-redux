import React from 'react';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

export default function({ logger }) {
  return ({top, bottom}) => {
    return (

      <div>
        <Toolbar style={{backgroundColor: 'rgb(0, 188, 212)'}}>
          <ToolbarTitle text="5 Day Forecast" />
          {top}
        </Toolbar>
        <div>
          {bottom}
        </div>
      </div>
    );
  }
}
