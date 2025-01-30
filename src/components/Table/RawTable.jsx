import { useEffect, useState } from "react";

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

const RawTable = ({ title = 'Raw Table', rawData, onSelect }) => {
  const { styles } = useStyle();

  const data = rawData
  // const data = rawData.map((row, idx) => ({
  //   ...row
  // }))

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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE
    ],
  };

  // console.log({ selectedRowKeys })

  useEffect(() => {
    onSelect && onSelect(selectedRowKeys);
  }, [selectedRowKeys])
  useEffect(() => {

    setSelectedRowKeys([]);
  }, [data.length])


  return (
    <>
      <h3>{title} ({data.length} items) | total: {formatMoney(_.sumBy(data, 'value'))})</h3>
      <Table
        size="small"
        className={styles.customTable}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            selectedRowKeys.includes(record.key) ?
              setSelectedRowKeys(selectedRowKeys.filter((k) => k != record.key)) :
              setSelectedRowKeys([...selectedRowKeys, record.key])
          }
        })}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 20 }}

        scroll={{
          y: 39 * 10,
        }}
      />
    </>
  );
};

export default RawTable;
