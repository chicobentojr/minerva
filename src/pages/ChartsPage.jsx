import { DataRawContext, TagsContext } from '../contexts/DataContext';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { filterData, getOnlyRestItems, getTagItems, isRowFromTag } from '../services/tags';

import { Bar } from 'react-chartjs-2';
import { Button } from 'antd';
import { REST_TAG } from '../utils/constants';
import RawTable from '../components/Table/RawTable';
import _ from 'lodash';

const ChartsPage = () => {
  const rawData = useContext(DataRawContext)
  const chartRef = useRef()
  // const rawData = useContext(DataRawContext).slice(0, 20)

  const [filteredTag, setFilteredTag] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const { tags: baseTags, setTags } = useContext(TagsContext);
  const tags = [...baseTags, REST_TAG]

  // console.log({ tags })

  // let tagsValues = {}
  // tags.forEach(t => tagsValues[t.label] = 0);

  // rawData.forEach((row) => {
  //   const tagFound = tags.find((tag) => isRowFromTag(row, tag));
  //   tagsValues[tagFound.label] += row.value
  // })



  const data = {
    labels: tags.map((tag) => tag.label),
    datasets: [
      {
        label: 'Total Gasto R$',
        data: tags.map((t) => _.sumBy(t.onlyRestItems ? getOnlyRestItems(rawData, baseTags) : getTagItems(t, rawData), 'value')),
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
        filterData(rawData, baseTags, isRestTag) :
        getTagItems(tag, rawData)
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


  // console.log({ rawData, tags, tagsValues, filteredData, filteredElements, data })
  return (
    <>
      <h2>Charts</h2>
      <div className='chart__container'>
        <Bar ref={chartRef} options={options} data={data} onClick={onChartClick} />

      </div>
      <div>

        <Button disabled={!selectedRowKeys.length} onClick={handleCreateTag}>Create Tag {selectedRowKeys.length ? `(${selectedRowKeys.length} items)` : ''}</Button>
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