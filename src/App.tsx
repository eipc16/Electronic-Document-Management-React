import React from 'react';
import './App.scss';
import Alert from 'react-s-alert';
import CustomSidebar from './sidebar/Sidebar';

import {
  mdiLoading
} from '@mdi/js';

import { ActionBlocker } from './actionblocker/ActionBlocker'

import { FormComponent, FormProps, FormType } from './wizards/Wizard'
import { form_1, form_2 } from './forms'

const App: React.FC = () => {
  const elementsList = [
    {
      title: 'Long title 1',
      icon: mdiLoading,
      description: '1',
      onClick: () =>
        Alert.error(
          'Co tam słychać o jak fajnie tutaj se testujemy alerty co dzialaja tak fajnie'
        )
    }
  ];

  // const builder = new NotificationBuilder();

  // const notification = builder
  //   .allowHTML(true)
  //   .setEffect(AlertEffects.SLIDE)
  //   .setPosition(AlertPositions.TOP)
  //   .setType(AlertTypes.WARNING)
  //   .setTimeout(10000)
  //   .build();

  const form = form_1

  return (
    <div className="App">
      <ActionBlocker />
      <CustomSidebar className="side-bar" elements={elementsList} />
      <div className="main-container">
        <FormComponent 
          title={form.title}
          uuid={form.uuid}
          fields={form.fields}
          formType={FormType.POPUP}
        />
      </div>
    </div>
  );
};

export default App;
