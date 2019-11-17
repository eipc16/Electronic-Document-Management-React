export interface FlowChartPort {
    id: string;
    type: string;
    properties: {
        result: string;
    };
}

export interface FlowChartLink {
    id: string;
    from: {
        nodeId: string;
        portId: string;
    };
    to: {
        nodeId: string;
        portId: string;
    };
    type?: string;
}

export interface FlowChartNode {
    id: string;
    type: string;
    department: any | null;
    message: string;
    position: {
        x: number;
        y: number;
    };
    size: {
      width: number;
      height: number;
    };
    ports: FlowChartPort[];
    nextCorrect: string | null;
    nextIncorrect: string | null;
}

export interface FlowChartDTO {
    name: string;
    nodes: FlowChartNode[];
    callbacks?: any;
}

export interface FlowChartNodeState {
    id: string;
    type: string;
    department: any | null;
    message: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    ports: {
        [port: string]: FlowChartPort;
    };
}

export interface FlowChartState {
    name: string;
    offset: {
        x: number;
        y: number;
    };
    selected: any;
    hovered: any;
    nodes: {
        [id: string]: FlowChartNodeState;
    };
    links: {
        [id: string]: FlowChartLink;
    };
}