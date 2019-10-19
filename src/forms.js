export const form_1 = {
    uuid: 'form-1',
    title: 'Title nr 1',
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
            uuid: 'form-1-input-text-2',
            formUuid: 'form-1',
            type: 'TEXT',
            defaultValue: '',
            isRequired: true,
            label: 'Input Text 1 TEXT Form 1',
            name: 'form-1-input-text-1-name',
            placeholder: '',
            validators: ['noUpperCase']
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
            type: 'DATE',
            defaultValue: '',
            isRequired: true,
            label: 'Input Text 2 TEXT Form 1',
            name: 'form-1-input-text-1-name',
            placeholder: '',
            validators: ['dateIsAfterToday']
        },
        {
            uuid: 'form-1-selector-1',
            formUuid: 'form-1',
            type: 'selector',
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
    uuid: 'form-2',
    title: 'Title nr 2',
    fields: [

    ]
}