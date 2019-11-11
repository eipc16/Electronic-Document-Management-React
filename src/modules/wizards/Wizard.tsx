import React from 'react';

import { Button } from 'react-native-paper';

import './Wizards.scss'
import {FormProps, FormType, InputField} from "./WizardInterfaces";
import {getCorrectInputComponent} from "./WizardUtils";


const FormComponent: React.FC<FormProps> = (form: FormProps) => {

    const handleSubmitF = () => {
    };

    const handleDecline = () => {

    };

    const inputList = form.fields.map((field: InputField) => {
        return getCorrectInputComponent(field);
    });

    const formType = form.formType ? form.formType.valueOf() : FormType.NORMAL;
    
    return (
        <form className={`form-container ${formType}`}>
            <p className='form-title'>{form.title}</p>
            <form className={'form-body'}>
                {inputList}
            </form>
            <div className='form-btn-container'>
                <div className='btn cancel'>
                    <Button
                        mode="outlined"
                        color='red'
                        onPress={() => handleDecline()}>
                        {'CANCEL'}
                    </Button>
                </div>
                <div className='btn cancel'>
                <Button
                    mode="outlined" 
                    onPress={() => handleSubmitF()}>
                    {'SUBMIT'}
                </Button>
                </div>
            </div>
        </form>
    )
};

export const getForm = (title: string, uuid: string, fields: InputField[], endpoint: string, formType?: FormType) => {
    return (
        <FormComponent
            title={title}
            uuid={uuid}
            fields={fields}
            formType={formType}
            endpoint={endpoint}
        />
    )
};