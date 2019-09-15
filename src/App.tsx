import React from 'react';
import logo from './logo.svg';
import './App.css';

import Sidebar, { SidebarVisibility } from './sidebar/Sidebar';

import { mdiLoading, mdiLogin, mdiLogout, mdiFileDocument, mdiAccount, mdiFacebook, mdiFace, mdiGoogle, mdiApple, mdiSmoking, mdiSend, mdiWarehouse, mdiWalk, mdiForum } from '@mdi/js';

import Alert from 'react-s-alert';

import { Notification, NotificationBuilder, AlertEffects, AlertPositions, AlertTypes } from './notifications/Notification'


const App: React.FC = () => {

  const elementsList = [
  {
    title: "Long title 1",
    icon: mdiLoading,
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
    icon: mdiLogin,
    description: "4",
    onclick: () => Alert.warning('1'),
    noHighlight: false
  },  {
    title: "Long title 4",
    icon: mdiLogout,
    description: "5",
    onclick: () => Alert.success('1')
  },  {
    title: "Long title 5",
    icon: mdiFace,
    description: "6",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 6",
    icon: mdiFacebook,
    description: "7",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 7",
    icon: mdiGoogle,
    description: "8",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 8",
    icon: mdiApple,
    description: "9",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 9",
    icon: mdiSmoking,
    description: "11",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 10",
    icon: mdiSend,
    description: "12",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 11",
    icon: mdiWarehouse,
    description: "13",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 12",
    icon: mdiWalk,
    description: "14",
    onclick: () => Alert.info('1')
  },  {
    title: "Long title 13",
    icon: mdiForum,
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
