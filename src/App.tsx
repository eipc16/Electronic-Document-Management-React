import React from 'react';
import logo from './logo.svg';
import './App.css';

import Sidebar, { SidebarVisibility } from './sidebar/Sidebar';

import { mdiAccessPoint, mdiAccount } from '@mdi/js';

import Alert from 'react-s-alert';

import { Notification, NotificationBuilder, AlertEffects, AlertPositions, AlertTypes } from './notifications/Notification'


const App: React.FC = () => {

  const elementsList = [
  {
    title: "Long title 1",
    icon: mdiAccessPoint,
    description: "1",
    onclick: () => Alert.error('Co tam słychać o jak fajnie tutaj se testujemy alerty co dzialaja tak fajnie')
  },
  {
    title: "Another long title",
    icon: mdiAccount,
    description: "3",
    onclick: () => Alert.info('2'),
    noHighlight: true
  },  {
    title: "Long title 3",
    icon: mdiAccessPoint,
    description: "4",
    onclick: () => Alert.warning('1'),
    noHighlight: false
  },  {
    title: "Long title 4",
    icon: mdiAccessPoint,
    description: "5",
    onclick: () => Alert.success('1')
  },  {
    title: "Long title 5",
    icon: mdiAccessPoint,
    description: "6",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 6",
    icon: mdiAccessPoint,
    description: "7",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 7",
    icon: mdiAccessPoint,
    description: "8",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 8",
    icon: mdiAccessPoint,
    description: "9",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 9",
    icon: mdiAccessPoint,
    description: "11",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 10",
    icon: mdiAccessPoint,
    description: "12",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 11",
    icon: mdiAccessPoint,
    description: "13",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 12",
    icon: mdiAccessPoint,
    description: "14",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 13",
    icon: mdiAccessPoint,
    description: "15",
    onclick: () => Alert.info('14')
  },
  ]

  const builder = new NotificationBuilder()

  const notification = builder.allowHTML(true)
                              .setEffect(AlertEffects.SLIDE)
                              .setPosition(AlertPositions.TOP)
                              .setType(AlertTypes.WARNING)
                              .setTimeout(10000)
                              .build()

  return (
    <div className="App">
      <Sidebar elements={elementsList}/>

      <button onClick={ () => notification.show('test')} >Show alert</button>
    </div>
  );
}

export default App;
