import React from 'react';
import { form_1 } from '../static/forms';
import { getForm, FormType } from '../wizards/Wizard';

export const DocumentsListPage: React.FC = (props: any) => {

    const form = form_1

    return getForm(form.title, form.uuid, form.fields, form.endpoint, FormType.POPUP)
}

/*

  const builder = new NotificationBuilder();

  const notification = builder
    .allowHTML(true)
    .setEffect(AlertEffects.SLIDE)
    .setPosition(AlertPositions.TOP)
    .setType(AlertTypes.WARNING)
    .setTimeout(10000)
    .build();

*/