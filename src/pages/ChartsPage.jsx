import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { DataRawContext } from '../contexts/DataContext';
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


    const tags = [
        { label: 'Amazon', match: 'amazon' },
        { label: 'Uber', match: 'uber' },
        { label: 'Riacheulo', match: 'riachuelo' },
        { label: 'Ifood', match: 'ifood' },
        { label: 'Docelandia', match: 'docelandia' },
        { label: 'Kitanda', match: 'antoniaelisangela' },
        { label: 'Mercadinho', match: 'lvconveniencia' },
        { label: 'Cachorro Quente', match: 'betellanches' },
        { label: 'Outros', match: '' }
    ]


    // const dates = Array.from(new Set(rawData.map((row) => row.date)))

    let tagsValues = {}
    tags.forEach(t => tagsValues[t.label] = 0);



    rawData.forEach((r) => {
        const tag = tags.find((t) => r.label.toLowerCase().includes(t.match));

        tagsValues[tag.label] += r.value
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

        console.log({ barClicked })

        setFilteredElements(barClicked)

    }


    const filteredData = useMemo(() => {
        const tag = tags.find((t) => t.label === filteredElements?.label)

        if (tag) {
            return rawData.filter((r) => r.label.toLowerCase().includes(tag.match))
        }
        return []

    }, [filteredElements])


    console.log({ rawData, tags, tagsValues, filteredData, filteredElements, data })

    return (
        <>
            <h1>Charts</h1>
            <div className='chart__container'>
                <Bar ref={chartRef} options={options} data={data} onClick={onChartClick} />

            </div>
            {filteredData.length && <RawTable title={filteredElements.label} rawData={filteredData} />}

            <RawTable rawData={rawData} />
        </>
    )
}

export default ChartsPage;