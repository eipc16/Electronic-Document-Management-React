import React from 'react';

import {Button} from 'react-native-paper';

import './Wizards.scss'
import {FormProps, FormType} from "./WizardInterfaces";
import {services} from "../../context";
import {ReduxStore} from "../../utils/ReduxUtils";
import {connect} from "react-redux";
import {FetchState} from "../../redux/types/Form";
import LoadingIndicator from "../common/LoadingIndicator";
import {ErrorPage} from "../common/ErrorPage";


const FormComponent: React.FC<FormProps & any> = (props: FormProps & any) => {
    const {title, formType, children, uuid} = props;

    const handleSubmit = () => {
        services.wizardService.submitForm(uuid);
    };

    const handleDecline = () => {
        services.wizardService.closeForm(uuid);
    };

    const type = formType ? formType.valueOf() : FormType.NORMAL;

    return (
        <form className={`form-container ${type}`}>
            <p className='form-title'>{title}</p>
            <div className={'form-body'}>
                { props.fetchState && FetchState.COMPLETED === props.fetchState && children }
                { (!props.fetchState || FetchState.ONGOING === props.fetchState) && <LoadingIndicator /> }
                { props.fetchState && FetchState.ERROR === props.fetchState && <ErrorPage />}
            </div>
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
                    onPress={() => handleSubmit()}>
                    {'SUBMIT'}
                </Button>
                </div>
            </div>
        </form>
    )
};

export const mapStateToProps = (store: ReduxStore, ownProps: any) => {
    return {
        fetchState: store.form.fetchStatus,
        ...ownProps
    }
};

export default connect(mapStateToProps, null)(FormComponent);