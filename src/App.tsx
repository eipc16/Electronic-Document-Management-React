import React, { useState } from 'react';
import './App.scss';
import Alert from 'react-s-alert';
import CustomSidebar from './sidebar/Sidebar';

import {
  mdiLoading,
  mdiLogin,
  mdiLogout,
  mdiAccount,
  mdiFacebook,
  mdiFace,
  mdiGoogle,
  mdiApple,
  mdiSmoking,
  mdiSend,
  mdiWarehouse,
  mdiWalk,
  mdiForum
} from '@mdi/js';

import {
  NotificationBuilder,
  AlertEffects,
  AlertPositions,
  AlertTypes
} from './notifications/Notification';

import { Validator } from './wizards/validators/Validator';
import {
  noUpperCase,
  hasLengthGreaterThan6,
  dateIsAfterToday
} from './wizards/validators/ValidatorRules';
import { useDispatch } from 'react-redux';
import { registerInputField, setFieldState } from './redux/actions';
import { ActionBlocker } from './actionblocker/ActionBlocker';
import { getDateTimeComponent, getInputFieldComponent, InputType, InputStyle } from './wizards/inputs';
import { dateAfter } from './utils/Utils';
import SelectorField from './wizards/inputs/SelectorField';

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
    },
    {
      title: 'Another long title',
      icon: mdiAccount,
      description: '3',
      onClick: () => Alert.info('2'),
      noHighlight: true
    },
    {
      title: 'Long title 3',
      icon: mdiLogin,
      description: '4',
      onClick: () => Alert.warning('1'),
      noHighlight: false
    },
    {
      title: 'Long title 4',
      icon: mdiLogout,
      description: '5',
      onClick: () => Alert.success('1')
    },
    {
      title: 'Long title 5',
      icon: mdiFace,
      description: '6',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 6',
      icon: mdiFacebook,
      description: '7',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 7',
      icon: mdiGoogle,
      description: '8',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 8',
      icon: mdiApple,
      description: '9',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 9',
      icon: mdiSmoking,
      description: '11',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 10',
      icon: mdiSend,
      description: '12',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 11',
      icon: mdiWarehouse,
      description: '13',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 12',
      icon: mdiWalk,
      description: '14',
      onClick: () => Alert.info('1')
    },
    {
      title: 'Long title 13',
      icon: mdiForum,
      description: '15',
      onClick: () => Alert.info('14')
    }
  ];

  const builder = new NotificationBuilder();

  const notification = builder
    .allowHTML(true)
    .setEffect(AlertEffects.SLIDE)
    .setPosition(AlertPositions.TOP)
    .setType(AlertTypes.WARNING)
    .setTimeout(10000)
    .build();

  const myValidator: Validator = new Validator([
    noUpperCase,
    hasLengthGreaterThan6
  ]);

  const dateValidator: Validator = new Validator([
    dateIsAfterToday
  ])

  return (
    <div className="App">
      <ActionBlocker />
      <CustomSidebar className="side-bar" elements={elementsList} />
      <div className="main-container">
        {getInputFieldComponent({
          label: "Fabrykowy",
          validator: myValidator,
          uuid: "SIEMA"
        })}

        {getInputFieldComponent({
          label: "Fabrykowy",
          inputType: InputType.NUMBER,
          uuid: "SIEMA2",
          required: true
        })}

        {getInputFieldComponent({
          label: "Fabrykowy",
          inputType: InputType.PASSWORD,
          uuid: "SIEMA32",
          required: true
        })}

        {getDateTimeComponent({
          label: "Date",
          uuid: "DATE_UUID",
          validator: dateValidator,
        })}
        {getDateTimeComponent({
          label: "Date",
          uuid: "DATE_UUID2",
          defaultValue: new Date("2019-01-12"),
          validator: dateValidator
        })}
        <SelectorField />
      </div>
    </div>
  );
};

export default App;
