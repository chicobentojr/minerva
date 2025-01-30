import { DataRawContext, TagsContext } from '../contexts/DataContext';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { filterData, isRowFromTag } from '../services/tags';

import { Bar } from 'react-chartjs-2';
import { REST_TAG } from '../utils/constants';
import RawTable from '../components/Table/RawTable';
import _ from 'lodash';

const ChartsPage = () => {
  const rawData = useContext(DataRawContext)
  const chartRef = useRef()
  // const rawData = useContext(DataRawContext).slice(0, 20)

  const [filteredElements, setFilteredElements] = useState(null);

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

  const { tags: baseTags } = useContext(TagsContext);
  const tags = [...baseTags, REST_TAG]

  // console.log({ tags })

  let tagsValues = {}
  tags.forEach(t => tagsValues[t.label] = 0);



  rawData.forEach((row) => {
    const tagFound = tags.find((tag) => isRowFromTag(row, tag));
    tagsValues[tagFound.label] += row.value
  })



  const data = {
    labels: tags.map((tag) => tag.label),
    datasets: [
      {
        label: 'Total Gasto R$',
        data: tags.map((t) => tagsValues[t.label]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //     label: 'Dataset 2',
      //     data: labels.map(() => Number.parseInt(Math.random() * 1000)),
      //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  const onChartClick = (event) => {
    const chart = chartRef.current;
    const xClick = chart.scales.x.getValueForPixel(event.nativeEvent.offsetX);
    const barElement = chart.getDatasetMeta(0).data[xClick];
    const barClicked = {
      label: chart.data.labels[barElement.$context.index],
      value: barElement.$context.raw
    }

    // console.log({ barClicked })

    if (barClicked.label === filteredElements?.label) {
      setFilteredElements(null)
    } else {
      setFilteredElements(barClicked)
    }


  }


  const filteredData = useMemo(() => {
    const tag = tags.find((t) => t.label === filteredElements?.label)
    if (tag) {
      const isRestTag = tag == REST_TAG

      return isRestTag ? filterData(rawData, baseTags, isRestTag) : filterData(rawData, [tag], isRestTag)
    }

    return []




  }, [filteredElements])

  // const othersData = useMemo(() => {
  //   return filterData(rawData, tags);
  // }, [tags])


  console.log({ rawData, tags, tagsValues, filteredData, filteredElements, data })

  return (
    <>
      <h1>Charts</h1>
      <div className='chart__container'>
        <Bar ref={chartRef} options={options} data={data} onClick={onChartClick} />

      </div>
      <div className='table__container'>
        {filteredData.length !== 0 && <RawTable title={filteredElements.label} rawData={filteredData} />}
      </div>
    </>
  )
}

export default ChartsPage;