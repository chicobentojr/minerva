import { Button, Dropdown, message } from 'antd';
import { DataRawContext, TagsContext } from '../contexts/DataContext';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { filterByTag, filterData, getOnlyRestItems, getTagItems, isRowFromTag } from '../services/tags';

import { Bar } from 'react-chartjs-2';
import { REST_TAG } from '../utils/constants';
import RawTable from '../components/Table/RawTable';
import { UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { fillDataWithTags } from '../services/config';

const ChartsPage = () => {
  const { data, setData } = useContext(DataRawContext)
  const chartRef = useRef()
  // const rawData = useContext(DataRawContext).slice(0, 20)

  const [filteredTag, setFilteredTag] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { tags: baseTags, setTags } = useContext(TagsContext);
  const tags = [...baseTags, REST_TAG]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        onHover: (args) => {
          console.log('onHover', args)
        }
      },
      tooltip: {
        callbacks: {
          title: ([item]) => {
            // console.log('label hover', item)
            const tag = baseTags.find((t) => t.label === item.label)
            const count = filterByTag(data, tag).length
            const newLabel = `${item.label} (${count})`

            return newLabel;
          }
        }
      },
      title: {
        display: true,
        text: `Chart.js Bar Chart (${data.length} items)`,
      },
    },
  };

  // console.log({ tags })

  // let tagsValues = {}
  // tags.forEach(t => tagsValues[t.label] = 0);

  // rawData.forEach((row) => {
  //   const tagFound = tags.find((tag) => isRowFromTag(row, tag));
  //   tagsValues[tagFound.label] += row.value
  // })



  const chartData = {
    labels: tags.map((tag) => tag.label),
    datasets: [
      {
        label: 'Total Gasto R$',
        // data: tags.map((t) => _.sumBy(t.onlyRestItems ? getOnlyRestItems(rawData, baseTags) : getTagItems(t, rawData), 'value')),
        data: tags.map((t) => _.sumBy(t.onlyRestItems ? getOnlyRestItems(data, baseTags) : filterByTag(data, t), 'value')),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //     label: 'Dataset 2',
      //     data: labels.map(() => Number.parseInt(Math.random() * 1000)),
      // backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  const onChartClick = (event) => {
    const chart = chartRef.current;
    const xClick = chart.scales.x.getValueForPixel(event.nativeEvent.offsetX);
    const barElement = chart.getDatasetMeta(0).data[xClick];
    const selectedTag = {
      label: chart.data.labels[barElement.$context.index],
      value: barElement.$context.raw
    }

    if (selectedTag.label === filteredTag?.label) {
      setFilteredTag(null)
    } else {
      setFilteredTag(selectedTag)
    }
  }


  const filteredData = useMemo(() => {
    const tag = tags.find((t) => t.label === filteredTag?.label)
    if (tag) {
      const isRestTag = tag == REST_TAG

      return isRestTag ?
        filterData(data, baseTags, isRestTag) :
        filterByTag(data, tag)
      // getTagItems(tag, data)
    }

    return []




  }, [filteredTag])


  const handleCreateTag = () => {
    const selectedRows = selectedRowKeys.map((k) => filteredData[k])
    console.log('selectedRows', selectedRows)


    const newTag = {
      label: `Tag #${baseTags.length + 1}`,
      itemsKey: selectedRowKeys,
    }

    console.log({ newTag })

    setTags([...baseTags, newTag])
    setFilteredTag(newTag)
  }

  const items = [
    // {
    //   label: '1st menu item',
    //   key: '1',
    //   icon: <UserOutlined />,
    // },
    // {
    //   label: '2nd menu item',
    //   key: '2',
    //   icon: <UserOutlined />,
    // },
    {
      label: 'Mover para',
      key: '1',
      icon: <UserOutlined />,
      children: baseTags.map((tag) => ({
        key: tag.label, label: tag.label, onClick: ({ domEvent }) => {
          // console.log(tag, 'clicked', event)

          console.log('move to ', tag.label);


          console.log({ selectedRowKeys })


          const updatedTags = baseTags.map((t) => {
            if (t.label == tag.label) {
              return { ...t, itemsKey: selectedRowKeys }
            }
            return t
          })

          // const newTag = {
          //   label: `Tag #${baseTags.length + 1}`,
          //   itemsKey: selectedRowKeys,
          // }

          console.log({ updatedTags })

          // setTags([...baseTags, newTag])
          setTags(updatedTags)
          setData(fillDataWithTags(data, updatedTags))
          setFilteredTag(tag)
        }
      })),
    },
    // {
    //   label: '3rd menu item',
    //   key: '3',
    //   icon: <UserOutlined />,
    //   danger: true,
    // },
    // {
    //   label: '4rd menu item',
    //   key: '4',
    //   icon: <UserOutlined />,
    //   danger: true,
    //   disabled: true,
    // },
  ];
  // const handleMenuClick = (e) => {
  //   message.info('Click on menu item.');
  //   console.log('click', e);
  // };
  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };



  // console.log({ rawData, tags, tagsValues, filteredData, filteredElements, data })
  return (
    <>
      <h2>Charts</h2>
      <div className='chart__container'>
        <Bar ref={chartRef} options={options} data={chartData} onClick={onChartClick} />
      </div>
      <div>

        {/* <Button disabled={!selectedRowKeys.length} onClick={handleCreateTag}>Create Tag {selectedRowKeys.length ? `(${selectedRowKeys.length} items)` : ''}</Button> */}
        <Dropdown.Button menu={menuProps} onClick={handleCreateTag} disabled={!selectedRowKeys.length}>
          Create Tag {selectedRowKeys.length ? `(${selectedRowKeys.length} items)` : ''}
        </Dropdown.Button>
      </div>
      <div className='table__container'>
        {filteredData.length !== 0 &&
          <RawTable
            onSelect={(newKeys) => { console.log('newkeys', newKeys); setSelectedRowKeys(newKeys) }}
            title={filteredTag.label}
            rawData={filteredData} />}
      </div>
    </>
  )
}

export default ChartsPage;