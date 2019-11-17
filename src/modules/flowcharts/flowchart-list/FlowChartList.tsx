import React, {useState} from 'react';

import '../FlowCharts.scss'
import { Button } from 'react-native-paper';
import {InputType} from "../../wizards/inputs/FieldInterfaces";
import {services} from "../../../context";
import FlowChartListElement, {FlowChartListEntry} from "./FlowChartListEntry";
import { withRouter } from 'react-router-dom';

const FlowChartList: React.FC = (props: any) => {
    const UUID = 'flowchart-list-filter-textbox';
    const [listItems, setListItems] = useState<FlowChartListEntry[]>([]);
    const [searchBox, setSearchBox] = useState(null);
    const [mounted, setMouned] = useState(false);

    const updateList = (searchText: string) => {
        services.flowChartService
            .fetchFlowChartListStateless(searchText)
            .then((response: FlowChartListEntry[]) => {
                setListItems(response);
            })
    };

    const handleCreateNewFlowChart = () => {
        services.flowChartService.mainFlowChartPage(props.history);
    };

    if(!mounted) {
        updateList("");

        setSearchBox(services.wizardService.getInputComponent({
            uuid: UUID,
            formUuid: "",
            controllerUrl: "",
            type: InputType.TEXT,
            defaultValue: "",
            isRequired: false,
            isVisible: true,
            label: "Filter flowcharts",
            name: "flowchart-list-filter",
            placeholder: "Type name of the flowchart",
            validators: [],
            errors: []
        }, (data: string) => updateList(data)));

        setMouned(true);
    }

    return (
        <div className='flow-chart-list'>
            <div className='flow-chart-list-search'>
                { searchBox ? searchBox : null}
            </div>
            <div className='flow-chart-list-elements'>
                { listItems &&
                    listItems.map((entry: FlowChartListEntry) => <FlowChartListElement data={entry} key={entry.id}/>)
                }
            </div>
            <div className='add-new-flowchart'>
                <Button mode="contained" onPress={handleCreateNewFlowChart}>
                    NEW FLOWCHART
                </Button>
            </div>
        </div>
    )
};

export default withRouter(FlowChartList);