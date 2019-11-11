import React from 'react';

export interface FlowChartListEntry {
    id: number;
    name: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModified: Date;
}

const FlowChartListElement = (props: {data: FlowChartListEntry}) => {

    const { data } = props;

    const date = new Date(data.createdDate);

    console.log(date);

    return (
        <div className='flow-chart-list-element'>
            <p className='flow-chart-name'>{data.name}</p>
            <p className='flow-chart-author'>{data.createdBy}</p>
            <p className='flow-chart-created-date'>{date.toDateString()}</p>
        </div>
    )
};

export default FlowChartListElement;