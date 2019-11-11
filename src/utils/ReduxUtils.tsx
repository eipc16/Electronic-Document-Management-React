import { InputFieldsState, InputFieldState, FormState } from '../redux/types';
import rootReducer from '../redux/reducers'

import { createSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { registerInputField, setCurrentForm } from '../redux/actions';
import { FormProps, InputField } from '../modules/wizards/WizardInterfaces';
import {FlowChartDTO, FlowChartPort, FlowChartState} from "../modules/flowcharts/mapper/FlowChartInterfaces";
import {setPortType} from "../redux/actions/FlowChart";

interface PortCombinerArguments {
    nodeId: string;
    portId: string;
}

const getInputFieldByUuidSelector = createSelector(
    (state: InputFieldsState) => state,
    (state: any, uuid: string) => uuid,
    (fieldsState: InputFieldsState, uuid: string) => fieldsState[uuid]);

const getFlowChartNodeById = createSelector(
    (state: FlowChartDTO) => state,
    (state: any, nodeId: string) => nodeId,
    (flowChartState: FlowChartDTO, nodeId: string) => {
        const nodes = flowChartState.nodes.filter(node => node.id === nodeId)

        if(nodes.length > 0) {
            return nodes[0];
        }
    }
);

const getFlowChartPortByIdAndNode = createSelector(
    (state: FlowChartDTO) => state,
    (state: any, searchParams: PortCombinerArguments) => searchParams,
    (flowChartState: FlowChartDTO, searchParams: PortCombinerArguments) => {
        const ports = flowChartState.nodes
            .filter(node => node.id === searchParams.nodeId)
            .flatMap(nodes => nodes.ports)
            .filter(port => port.id === searchParams.portId);

        if(ports.length > 0) {
            return ports[0]
        }
    }
);

export type ReduxStore = ReturnType<typeof rootReducer>;

export const useSetPortType = (nodeId?: string, portId?: string, newType?: string) => {
    const dispatch = useDispatch();
    dispatch(setPortType({nodeId: nodeId, portId: portId}, newType));
};

export const useNodeById = (nodeId: string) => {
    return useSelector(
        (state: ReduxStore) => {
            if(state.flowChart !== null) {
                return getFlowChartNodeById(state.flowChart, nodeId);
            }
        }
    )
}

export const useFieldStateByUUid = (uuid: string) => {
    return useSelector(
        (state: ReduxStore) =>
                getInputFieldByUuidSelector(state.inputFields, uuid)
        )
};

export const usePortByIdAndNodeId = (nodeId: string, portId: string) => {
    return useSelector(
        (state: ReduxStore) => {
            if(state.flowChart !== null) {
                return getFlowChartPortByIdAndNode(state.flowChart, {nodeId: nodeId, portId: portId});
            }
        }
    )
};

export const useGetStore = () => {
    return useSelector((store: ReduxStore) => store)
};

export const useGetStoreState = (state: string) => {
    return useSelector(
        (store: ReduxStore) => {
            switch(state) {
                case 'blockWall': return store.blockWall;
                case 'flowChart': return store.flowChart;
                case 'form': return store.form;
                case 'inputFields': return store.inputFields;
            }
        }
    )
};

const useRegisterInputField = (props: InputFieldState) => {
    const dispatch = useDispatch();
    dispatch(registerInputField(props))
};

const transformFieldsToNames = (fields: InputField[]) => {
    return fields.map(field => field.name)
};

export const useRegisterCurrentForm = (props: FormProps) => {
    const dispatch = useDispatch();
    dispatch(setCurrentForm({
        uuid: props.uuid,
        title: props.title,
        visible: false,
        endpoint: props.endpoint,
        fields: transformFieldsToNames(props.fields)
    }))
};

export const useRegisterField = (props: InputFieldState) => {
    //working on some way to add conditional dispatch
    useRegisterInputField(props)
};

export const useBlockWallVisiblity = () => {
    return useSelector((state: ReduxStore) => state.blockWall.visible)
};