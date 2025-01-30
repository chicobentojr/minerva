import { formatMoney } from "../../utils/formatters";

const RawTable = ({ title = 'Raw Table', rawData }) => {
  return (
    <>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{
          rawData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.label}</td>
              <td>{formatMoney(row.value)}</td>
            </tr>
          ))
        }</tbody>
      </table>
    </>
  );
};

export default RawTable;
