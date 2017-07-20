import React from 'react';
import format from 'date-fns/format';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';

export default function ({ forecast }) {
  const intervals = forecast.forecast.map((interval) => {
    return (
      <TableRow key={interval.timestamp} selectable={false}>
        <TableRowColumn>{format(interval.timestamp, 'h aa')}</TableRowColumn>
        <TableRowColumn>
          <img src={interval.conditionImage} />
        </TableRowColumn>
        <TableRowColumn>{`${interval.temp} °F`}</TableRowColumn>
        <TableRowColumn>{`${interval.humidity} %`}</TableRowColumn>
      </TableRow>
    );
  });

  return (
    <div>
      <Subheader>{forecast.dayName}</Subheader>
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Time</TableHeaderColumn>
            <TableHeaderColumn>Condition</TableHeaderColumn>
            <TableHeaderColumn>Temp</TableHeaderColumn>
            <TableHeaderColumn>Humidity</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {intervals}
        </TableBody>
      </Table>
    </div>
  );
}
