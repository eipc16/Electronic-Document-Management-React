import React from 'react';
import {FormType, InputField} from "./WizardInterfaces";
import {connect} from "react-redux";
import {ReduxStore} from "../../utils/ReduxUtils";
import {InputFieldsState} from "../../redux/types/InputField";
import {FormState} from "react-form";
import {getCorrectInputComponent} from "./WizardUtils";
import FormComponent from './Wizard';

interface StateProps {
    form: FormState;
    inputFields: InputFieldsState;
}

const WizardProvider: React.FC<StateProps & any> = (props: StateProps & any) => {

    const { inputFields, form } = props;
    const inputFieldComponents = Object.keys(inputFields)
        .map(key => inputFields[key])
        .filter(inputField => inputField.formUuid === form.uuid)
        .map((value: InputField) => getCorrectInputComponent(value));

    return <div className='wizard-provider'>
        {props.children}
        { form.visible ? (
            <FormComponent uuid={form.uuid} title={form.title} endpoint={form.endpoint}
                formType={FormType.POPUP} fields={form.fields}>
                {inputFieldComponents}
            </FormComponent>
        ) : null}
    </div>
};

const mapStateToProps = (store: ReduxStore, ownProps: any) => {
    return {
        form: store.form,
        inputFields: store.inputFields,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(WizardProvider);