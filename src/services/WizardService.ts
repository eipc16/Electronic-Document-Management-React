import {Store} from "redux";
import {request} from "../utils/APIUtils";
import {AlertTypes, NotificationBuilder} from "../notifications/Notification";
import {setCurrentForm, showForm} from "../redux/actions/Form";
import {FormProps, InputField} from "../modules/wizards/WizardInterfaces";
import {registerInputField} from "../redux/actions/InputField";

const WizardService = (store: Store) => {

    const fetchWizardFromServer = (url: string) => {
        request({
            url: url,
            method: 'GET'
        }).then((form: FormProps) => {
            return registerWizard(form)
        }).then((form: FormProps) => {
            return registerFields(form)
        }).then(({ registrationComplete, form }) => {
            if(registrationComplete) {
                showWizard(form.uuid)
            }
        }).catch(error => {
            new NotificationBuilder()
                .setType(AlertTypes.ERROR)
                .build()
                .show(error.message);
        })
    };

    const closeCurrentForm = () => {
    }

    const showWizard = (uuid: string) => {
        return store.dispatch(showForm(uuid));
    };

    const registerWizard = async (form: FormProps) => {
        store.dispatch(setCurrentForm({
            uuid: form.uuid,
            title: form.title,
            visible: false,
            endpoint: form.endpoint,
            fields: transformFieldsToNames(form.fields)
        }));
        return form;
    };

    const transformFieldsToNames = (fields: InputField[]) => {
        return fields.map(field => field.name)
    };

    const registerFields = async (form: FormProps) => {
        const status = await form.fields
                .map(field => registerField(field))
                .reduce((a, b) => a && b);
        return {
            registrationComplete: status,
            form: form
        }
    };

    const registerField = async (field: InputField) => {
        await store.dispatch(registerInputField({
            errors: [],
            formUuid: field.formUuid,
            isValid: true,
            label: field.label,
            name: field.name,
            type: field.type,
            uuid: field.uuid,
            value: field.defaultValue,
            options: field.options
        }));
        return true;
    };

    return Object.freeze({
        fetchWizardFromServer
    })
};

export default WizardService;