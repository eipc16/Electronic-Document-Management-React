import {Store} from "redux";
import {request, RequestType} from "../utils/APIUtils";
import {AlertTypes, NotificationBuilder} from "../notifications/Notification";
import {fetchWizardAction, hideForm, sendFormAction, setCurrentForm, showForm} from "../redux/actions/Form";
import {FormProps, InputField} from "../modules/wizards/WizardInterfaces";
import {
    fetchSearchBoxOptions,
    registerInputField,
    removeFormFields,
    setFieldValue,
    updateFormFieldsAction
} from "../redux/actions/InputField";

import {FieldType, InputFieldState} from "../redux/types/InputField";
import {FormState, InputFieldsState} from '../redux/types'
import {switchBlockWall} from "../redux/actions/BlockWall";
import {SearchOption} from "../modules/wizards/inputs/FieldInterfaces";
import {refStore} from "../configurations/referenceStoreConfiguration";
import {getCorrectInputComponent} from "../modules/wizards/WizardUtils";

const WizardService = (store: Store) => {

    const fetchWizardFromServer = (url: string,
                                   onSubmit: (response: any) => void,
                                   onUpdate: (response: any) => void) => {
        store.dispatch(fetchWizardAction(url, onSubmit, onUpdate));
    };

    const closeForm = (formUuid: string) => {
        store.dispatch(hideForm());
        store.dispatch(removeFormFields(formUuid));
        store.dispatch(switchBlockWall(false))
    };

    const updateFieldValue = (fieldUuid: string, value: FieldType, formUuid?: string) => {
        store.dispatch(setFieldValue(fieldUuid, value));
        if(formUuid) {
            const { inputFields, form } = store.getState();
            store.dispatch(updateFormFieldsAction(fieldUuid, formUuid, inputFields, form));
        }
    };

    const showWizard = (uuid: string) => {
        return store.dispatch(showForm());
    };

    const registerWizard = (form: FormProps, onSubmit: (response: any) => any, onUpdate: (response: any) => any) => {
        store.dispatch(setCurrentForm({
            uuid: form.uuid,
            title: form.title,
            visible: false,
            endpoint: form.endpoint,
            fields: transformFieldsToNames(form.fields)
        }, onSubmit, onUpdate));
        return form;
    };

    const transformFieldsToNames = (fields: InputField[]) => {
        return fields.map(field => field.uuid)
    };

    const registerFields = (form: FormProps) => {
        const status = form.fields
                .map(field => registerField(field))
                .reduce((a, b) => a && b);
        return {
            registrationComplete: status,
            form: form
        }
    };

    const registerField = (field: InputField) => {
        store.dispatch(registerInputField({
            ...field,
            value: field.defaultValue,
            errors: [],
            isValid: true
        }));
        return true;
    };

    const submitForm = async (formUuid: string) => {
        store.dispatch(sendFormAction(formUuid));
        store.dispatch(hideForm());
        store.dispatch(removeFormFields(formUuid));
        store.dispatch(switchBlockWall(false))
    };

    const prepareWizardPayload = (formUuid: string, inputFields: InputFieldsState) => {
        return Object.values(inputFields)
            .filter(field => field.formUuid === formUuid)
            .map((field: InputFieldState) => {
                let value = field.value;
                if(field.type === 'searchbox' && value != null) {
                    value = (value as SearchOption).value;
                } else if (field.name === 'departmentId' ){
                    value = 0;
                }

                return {
                    name: field.name,
                    value: value
                }
            })
            .reduce((object, field) => {
                return {
                    ...object,
                    [field.name]: field.value
                }
            }, {})
    };

    const sendForm = async (state: FormState, formUuid: string, inputFields: InputFieldsState) => {
        const payload = prepareWizardPayload(formUuid, inputFields);
        const targetUrl = `http://localhost:8080${state.endpoint}`;
        request({
            url: targetUrl,
            method: RequestType.POST,
            body: payload
        }).then((response: any) => {
            if(refStore.onWizardSubmit) {
                refStore.onWizardSubmit(response);
            }
        }).catch(error => {
            console.error(error);
            new NotificationBuilder()
                .setType(AlertTypes.ERROR)
                .build()
                .show(error.message);
        });

        return {
            ...state,
            visible: false
        }
    };

    const prepareWizardControllerPayload = (state: InputFieldsState, field: InputFieldState, formState: FormState) => {
        let value = field.value;

        if(field.type === 'searchbox' && value != null) {
            value = (value as SearchOption).value;
        } else if (field.name === 'departmentId' ){
            value = 0;
        }

        return {
            fieldName: field.name,
            form: {
                ...formState,
                fields: formState.fields
                    .filter(fieldUuid => Object.keys(state).includes(fieldUuid))
                    .map(fieldUuid => {
                        const currentField = state[fieldUuid];
                        const value = currentField.value;
                        return {
                            ...currentField,
                            value: value
                        }
                    })
            }
        }
    };

    const updateForm = async (state: InputFieldsState, formUuid: string, fieldUuid: string, formState: FormState) => {
        const constLastUpdatedField = state[fieldUuid];
        if(constLastUpdatedField && constLastUpdatedField.controllerUrl !== null) {
            const payload = prepareWizardControllerPayload(state, constLastUpdatedField, formState);
            const targetUrl = `http://localhost:8080${constLastUpdatedField.controllerUrl}`;
            const response = await request({
                url: targetUrl,
                method: RequestType.POST,
                body: payload
            }).then((response: any) => {
                return response;
            }).catch(error => {
                console.error(error);
                new NotificationBuilder()
                    .setType(AlertTypes.ERROR)
                    .build()
                    .show(error.message);
            });

            state = response.fields
                .reduce((object: InputFieldsState, field: InputFieldState) => {
                    return {
                        ...object,
                        [field.uuid]: field
                    }
                }, {})
        }

        if(refStore.onWizardUpdate) {
            refStore.onWizardUpdate(state);
        }

        return state;
    };

    const updateSearchBox = (fieldUuid: string, optionsUrl: string, searchText: string) => {
        store.dispatch(fetchSearchBoxOptions(fieldUuid, optionsUrl, searchText));
    };

    const fetchSearchBoxOptionsStateless = (optionsUrl: string, searchText: string) => {
        const targetUrl = `http://localhost:8080${optionsUrl}?searchText=${searchText}`;
        return request({url: targetUrl, method: RequestType.GET})
            .then((response) => { return response;})
            .catch(error => {
                console.error(error);
                new NotificationBuilder().setType(AlertTypes.ERROR).build().show(error.message);
            });
    };

    const getInputComponent = (data: InputField, onUpdate?: (data: FieldType) => void) => {
        if(registerField(data)) {
            return getCorrectInputComponent(data, onUpdate);
        }
    };

    return Object.freeze({
        fetchWizardFromServer, updateFieldValue, closeForm, sendForm, updateForm, submitForm, updateSearchBox,
        registerWizard, registerFields, registerField, showWizard, transformFieldsToNames, fetchSearchBoxOptionsStateless,
        getInputComponent
    })
};

export default WizardService;