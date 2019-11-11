export const form_1 = {
    uuid: 'form-1',
    title: 'Title nr 1',
    endpoint: '/api/form_1',
    fields: [{
            uuid: 'form-1-input-text-1',
            formUuid: 'form-1',
            type: 'NUMBER',
            defaultValue: 5,
            isRequired: true,
            label: 'Input Text 1 Number Form 1',
            name: 'form-1-input-text-1-name',
            placeholder: '53235',
            validators: ['hasLengthGreaterThan10']
        },
        {
            uuid: 'form-1-input-password-1',
            formUuid: 'form-1',
            type: 'PASSWORD',
            defaultValue: '',
            isRequired: true,
            label: 'Input Text 1 Password Form 1',
            name: 'form-1-input-password-1-name',
            placeholder: 'Password',
            validators: ['noUpperCase']
        },
        {
            uuid: 'form-1-input-selector-2',
            formUuid: 'form-1',
            type: 'SWITCH',
            defaultValue: false,
            isRequired: true,
            label: 'Is this the best form u ever seen?',
            name: 'form-1-input-selector-1-name',
            placeholder: '',
            validators: []
        },
        {
            uuid: 'form-1-input-text-3',
            formUuid: 'form-1',
            type: 'TEXT',
            defaultValue: '',
            isRequired: true,
            label: 'Input Text 2 TEXT Form 1',
            name: 'form-1-input-text-1-name',
            placeholder: '',
            validators: ['noUpperCase']
        },
        {
            uuid: 'form-1-input-text-4',
            formUuid: 'form-1',
            type: 'date',
            defaultValue: '12-31-2017',
            isRequired: true,
            label: 'Input Text 2 TEXT Form 1',
            name: 'form-1-input-text-1-name',
            placeholder: '',
            validators: ['dateIsAfterToday']
        },
        {
            uuid: 'form-1-selector-1',
            formUuid: 'form-1',
            type: 'searchbox',
            defaultValue: '',
            isRequired: true,
            label: 'Input Text 1 Selector Form 1',
            name: 'form-1-input-selector-1-name',
            placeholder: 'Selector',
            validators: ['noUpperCase'],
            options: [{
                    label: 'Flavours',
                    options: [
                        { value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' },
                    ],
                },
                {
                    label: 'Sizes',
                    options: [
                        { value: 'large', label: 'Large' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'Small', label: 'Small' },
                    ],
                },
            ]
        }
    ]
}

export const form_2 = {
    "uuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
    "title": "Add new node",
    "endpoint": "/flowcharts/node",
    "fields": [
        {
            "uuid": "bd07dabe/4cb4/4a77/9f5c/161a50ad2572",
            "formUuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
            "type": "searchbox",
            "defaultValue": "Department node",
            "isRequired": true,
            "label": "Node type",
            "name": "nodeType",
            "controllerUrl": null,
            "placeholder": "Choose type of the new node",
            "validators": [],
            "value": null,
            "isVisible": true,
            "options": [
                {
                    "label": "Start node",
                    "value": "start-node"
                },
                {
                    "label": "Department node",
                    "value": "input-output"
                },
                {
                    "label": "End node",
                    "value": "end-node"
                }
            ]
        },
        {
            "uuid": "cc5cd94d/addd/499e/ad60/1c32434e6b97",
            "formUuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
            "type": "default",
            "defaultValue": "",
            "isRequired": true,
            "label": "Description",
            "name": "message",
            "controllerUrl": null,
            "placeholder": "Write description of the task",
            "validators": [],
            "value": null,
            "isVisible": true
        },
        {
            "uuid": "dc6778c7/1e0f/470c/8c1e/2ca6f397fff9",
            "formUuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
            "type": "searchbox",
            "defaultValue": "",
            "isRequired": false,
            "label": "Department",
            "name": "departmentId",
            "controllerUrl": null,
            "placeholder": null,
            "validators": [],
            "value": null,
            "isVisible": true,
            "options": []
        },
        {
            "uuid": "93f5cdc3/9064/471d/9c1c/651b36773de8",
            "formUuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
            "type": "switch",
            "defaultValue": false,
            "isRequired": true,
            "label": "Should node have alternative flow?",
            "name": "alternativeRoute",
            "controllerUrl": null,
            "placeholder": null,
            "validators": [],
            "value": null,
            "isVisible": true
        },
        {
            "uuid": "2c15b80a/33ab/4e43/8f74/6d5e30585bf3",
            "formUuid": "e14998e5/29cd/47f3/9cc2/6237ed6d403e",
            "type": "numeric",
            "defaultValue": 2,
            "isRequired": true,
            "label": "Number of inputs",
            "name": "numberOfInputPorts",
            "controllerUrl": null,
            "placeholder": null,
            "validators": [],
            "value": null,
            "isVisible": true
        }
    ]
}