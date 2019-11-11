import React from 'react';
import {ReduxFormComponent} from "./Wizard";
import {FormType} from "./WizardInterfaces";
import {connect} from "react-redux";
import {ReduxStore} from "../../utils/ReduxUtils";

const WizardProvider = (props: any) => {

    const { inputFields, form } = props;

    return <div className='wizard-provider'>
        {props.children}
        { form.visible ? (
            <ReduxFormComponent
                uuid={form.uuid}
                title={form.title}
                endpoint={form.endpoint}
                formType={FormType.POPUP}
                fields={form.fields}
            />
        ) : null}
    </div>
};

const mapStateToProps = (store: ReduxStore, ownProps: any) => {
    return {
        form: store.form,
        inputFields: store.inputFields,
        ...ownProps
    }
}

export default connect(mapStateToProps, null)(WizardProvider);