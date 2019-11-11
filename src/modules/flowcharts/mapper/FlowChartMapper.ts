import {defaultFlowChart} from "../../../static/flowchart";
import {
    FlowChartDTO,
    FlowChartLink,
    FlowChartNode,
    FlowChartNodeState,
    FlowChartPort,
    FlowChartState
} from "./FlowChartInterfaces";

function linkFromString(linkString: string | null): FlowChartLink | null {
    if(linkString === null) {
        return null
    }
    
    const stringArray = linkString.split('_');

    if(stringArray.length < 5) {
        return null
    }

    return {
        id: stringArray[0],
        from: {
            nodeId: stringArray[1],
            portId: stringArray[2]
        },
        to: {
            nodeId: stringArray[3],
            portId: stringArray[4]
        }
    }
}

function linkToString(link: FlowChartLink): string {
    return `${link.id}_${link.from.nodeId}_${link.from.portId}_${link.to.nodeId}_${link.to.portId}`;
}

export const mapFlowChartFromDTO = (flowchartDTO: FlowChartDTO | null): FlowChartState => {
    
    const mapPortList = (ports: FlowChartPort[]) => {
        let portsObject = {}

        ports.forEach((port: FlowChartPort) => {
            portsObject = {
                ...portsObject,
                [port.id]: port
            }
        })

        return portsObject
    }


    const mapLinks = (correctNode: string | null, incorrectNode: string | null) => {
        const linkList = [
            linkFromString(correctNode),
            linkFromString(incorrectNode)
        ]

        let result = {}

        linkList.forEach(link => {
            if(link !== null && link.id !== '') {
                result = {
                    ...result,
                    [link.id]: link
                }
            }
        })
      
        return result;
    }

    const getNodesFromDTO = (nodes: FlowChartNode[]) => {
        let nodesObject = {}

        nodes.forEach((node: FlowChartNode) => {
            nodesObject = {
                ...nodesObject,
                [node.id]: {
                    id: node.id,
                    type: node.type,
                    department: node.department,
                    message: node.message,
                    position: {
                        x: node.position.x,
                        y: node.position.y
                    },
                    size: {
                      width: node.size.width,
                      height: node.size.height
                    },
                    ports: mapPortList(node.ports)
                }
            }
        })

        return nodesObject;
    }

    const getLinksFromDTO = (nodes: FlowChartNode[]) => {
        let links = {}

        nodes.forEach((node: FlowChartNode) => {
            links = {
                ...links, 
                ...mapLinks(node.nextCorrect, node.nextIncorrect)}
        })

        return links
    }

    if(flowchartDTO === null) {
        return mapFlowChartFromDTO(defaultFlowChart as FlowChartDTO);
    }

    return {
        name: flowchartDTO.name,
        nodes: getNodesFromDTO(flowchartDTO.nodes),
        links: getLinksFromDTO(flowchartDTO.nodes),
        offset: {x: 0, y: 0},
        selected: {},
        hovered: {},
    };
};

export const mapFlowChartToDTO = (flowchartState: FlowChartState) => {

    const mapPortsToDTO = (ports: {[port: string]: FlowChartPort}) => {
        return Object.keys(ports).map(key => {
            return ports[key]
        })
    };

    const getNodeString = (
            node: FlowChartNodeState, 
            links: {[link: string]: FlowChartLink}, 
            keyword: string) => {

        let result = null;

        Object.keys(links).forEach(key => {
            const link = links[key]
            const port = node.ports[link.from.portId]
            if(link.from.nodeId === node.id 
                    && port.type === 'output'
                    && port.properties 
                    && port.properties.result === keyword) {
                result = linkToString(link)
            }
        })
        
        return result
    }

    const mapNodes = (
            nodes: {[node: string]: FlowChartNodeState}, 
            links: {[link: string]: FlowChartLink}) => {
        return Object.keys(nodes).map(key => {
            const currentNode: FlowChartNodeState = nodes[key]
            return {
                id: currentNode.id,
                type: currentNode.type,
                department: currentNode.department,
                message: currentNode.message,
                position: {
                    x: currentNode.position.x,
                    y: currentNode.position.y
                },
                size: {
                    width: currentNode.size.width,
                    height: currentNode.size.height
                },
                ports: mapPortsToDTO(currentNode.ports),
                nextCorrect: getNodeString(currentNode, links, 'correct'),
                nextIncorrect: getNodeString(currentNode, links, 'incorrect')
            }
        })
    }

    return {
        name: flowchartState.name,
        nodes: mapNodes(flowchartState.nodes, flowchartState.links)
    }
}

