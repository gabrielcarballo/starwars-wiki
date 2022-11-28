import React from 'react';
import TableHeaders from './TableHeaders';
import TableInfo from './TableInfo';

export default function Table() {
  return (
    <table>
      <thead>
        <tr>
          <TableHeaders />
        </tr>
      </thead>
      <tbody>
        <TableInfo />
      </tbody>
    </table>
  );
}
