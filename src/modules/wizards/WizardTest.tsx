import React from 'react';
import {getForm} from './Wizard'
import {FormType} from "./WizardInterfaces";

import { form_2} from '../../static/forms'

export const WizardTest: React.FC = (props: any) => {
    const form = form_2;

    const completeForm = getForm(form.title, form.uuid, form.fields, form.endpoint, FormType.POPUP);

    return (
        <div className='wizard-test'>
            {completeForm}
        </div>
    )
};