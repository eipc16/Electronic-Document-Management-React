import React from 'react';

import './FlowChartListEntry.scss';
import {services} from "../../../context";
import { withRouter } from 'react-router-dom';

export interface FlowChartListEntry {
    id: number;
    name: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModified: Date;
}

const FlowChartListElement = (props: {data: FlowChartListEntry} & any) => {

    const { data, history } = props;

    const date = new Date(data.createdDate);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        services.flowChartService.changePage(history, props.data.id)
    };

    return (
        <div className='flow-chart-list-element' onClick={handleClick}>
            <p className='flow-chart-name'>{data.name}</p>
            <div className='flow-chart-metadata'>
                {/*<p className='flow-chart-author'>Created by: {data.createdBy}</p>*/}
                <p className='flow-chart-created-date'>{date.toDateString()}</p>
            </div>
        </div>
    )
};

export default withRouter(FlowChartListElement);