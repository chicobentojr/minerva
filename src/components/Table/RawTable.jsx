import { Table } from "antd";
import _ from "lodash";
import { createStyles } from 'antd-style';
import { formatMoney } from "../../utils/formatters";
import moment from "moment";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const RawTable = ({ title = 'Raw Table', rawData }) => {
  const { styles } = useStyle();


  const data = rawData.map((row, idx) => ({
    ...row,
    key: idx,
    isoDate: moment(row.date, 'DD/MM/YYYY').toISOString()
  }))

  const columns = [
    {
      title: 'Date',
      dataIndex: 'isoDate',
      render: (text) => moment(text).format('DD/MM/YYYY'),
      width: 150,
    },
    { title: 'Label', dataIndex: 'label', },
    {
      title: 'Value',
      dataIndex: 'value',
      render: formatMoney,
    },
  ]

  return (
    <>
      <h3>{title} ({data.length} items) | total: {formatMoney(_.sumBy(data, 'value'))})</h3>
      <Table
        className={styles.customTable}
        // rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 55 * 7,
        }}
      />
      {/* <table>
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
      </table> */}
    </>
  );
};

export default RawTable;
