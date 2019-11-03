export const defaultFlowChart = {
    name: 'flow-1',
    nodes: [
        {
            id: 'node1',
            type: 'start-node',
            department: 'elo',
            message: 'HELO',
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 250,
                height: 80,
            },
            ports: [
                {
                    id: 'port1',
                    type: 'output',
                    properties: {
                        result: 'correct'
                    },
                    position: {
                        x: 105.5,
                        y: 160
                    }
                },
                {
                    id: 'port2',
                    type: 'output',
                    properties: {
                        result: 'incorrect'
                    },
                    position: {
                        x: 135.5,
                        y: 160
                    }
                }
            ],
            nextCorrect: 'link1_node1_port1_node2_port1_correct',
            nextIncorrect: null
        },
        {
            id: 'node2',
            type: 'end-node',
            department: 'elo2',
            message: 'HELLO_2',
            position: {
                x: 179,
                y: 347
            },
            size: {
              width: 250,
              height: 80,
            },
            ports: [
                {
                    id: 'port1',
                    type: 'input',
                    position: {
                        x: 104.5,
                        y: 0
                    },
                    properties: {
                        result: 'default'
                    }
                },
                {
                    id: 'port2',
                    type: 'input',
                    position: {
                        x: 104.5,
                        y: 0
                    },
                    properties: {
                        result: 'default'
                    }
                },
                {
                    id: 'port3',
                    type: 'input',
                    position: {
                        x: 104.5,
                        y: 0
                    },
                    properties: {
                        result: 'default'
                    }
                }
            ],
            nextCorrect: null,
            nextIncorrect: null
        }
    ]
}