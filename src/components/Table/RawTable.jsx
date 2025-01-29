
const RawTable = ({ rawData }) => {
  // const data = useContext(DataRawContext)
  console.log("rawtable", rawData);
  return (
    <>
      <h3>RawTable</h3>
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
              <td>{row.value}</td>
            </tr>
          ))
        }</tbody>
      </table>
    </>
  );
};

export default RawTable;
