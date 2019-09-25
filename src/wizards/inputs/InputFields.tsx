import React, { useState } from 'react'
import { Validator, ValidatorError } from '../validators/Validator'

import "./InputFields.scss"
import { noUpperCase } from '../validators/ValidatorRules';

interface TextFieldProps {
    placeholder?: string,
    defaultText?: string,
    validator: Validator
}

const defaultTextFieldProps: TextFieldProps = {
    placeholder: "gg",
    defaultText: "ff",
    validator: new Validator([])
}

const TextField: React.FC<TextFieldProps> = (passedProps) => {

    const props: TextFieldProps = {
        ...defaultTextFieldProps,
        ...passedProps
    }

    const [content, setContent] = useState<string>(props.defaultText ? props.defaultText : "");
    const [errors, setErrors] = useState<ValidatorError[]>([]);

    let errorMessages;

    if(props.validator) {
        errorMessages = errors.map((error, index) => {
            return (
                <div key={index}>{error.message}</div>
            )
        })
    }

    return (
        <div className='input-container'>
            <input 
                className="input-field text" 
                type="text"
                value={content}
                placeholder={props.placeholder}
                onChange={(e) => { setContent(e.target.value); setErrors(props.validator.test(e.target.value))}}
            />
            {errorMessages}
        </div>
    )
}

TextField.defaultProps = defaultTextFieldProps;

const NumberField: React.FC = () => {
    return (
        <div className='input-container'>
            <input className="input-field number" type="number" />
        </div>
    )
}

export {
    TextField,
    NumberField
}