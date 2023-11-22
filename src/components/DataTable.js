import { React } from "react";
import Table from "react-bootstrap/Table";

const DataTable = ({ data, header }) => {
  return (
    <Table hover size="sm" className="mt-4">
      <thead>
        <tr>
          <th>#</th>
          {header.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.total}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
