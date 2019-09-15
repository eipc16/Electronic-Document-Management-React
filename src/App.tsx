import React from 'react';
import logo from './logo.svg';
import './App.css';

import Sidebar, { SidebarVisibility } from './sidebar/Sidebar';

import { mdiAccessPoint, mdiAccount } from '@mdi/js';

const App: React.FC = () => {

  const elementsList = [
  {
    title: "Long title 1",
    icon: mdiAccessPoint,
    description: "1",
    onclick: () => alert('1')
  },
  {
    title: "Another long title",
    icon: mdiAccount,
    description: "3",
    onclick: () => alert('2')
  },  {
    title: "Long title 3",
    icon: mdiAccessPoint,
    description: "4",
    onclick: () => alert('1')
  },  {
    title: "Long title 4",
    icon: mdiAccessPoint,
    description: "5",
    onclick: () => alert('1')
  },  {
    title: "Long title 5",
    icon: mdiAccessPoint,
    description: "6",
    onclick: () => alert('1')
  },  {
    title: "Long title 6",
    icon: mdiAccessPoint,
    description: "7",
    onclick: () => alert('1')
  },  {
    title: "Long title 7",
    icon: mdiAccessPoint,
    description: "8",
    onclick: () => alert('1')
  },  {
    title: "Long title 8",
    icon: mdiAccessPoint,
    description: "9",
    onclick: () => alert('1')
  },  {
    title: "Long title 9",
    icon: mdiAccessPoint,
    description: "11",
    onclick: () => alert('1')
  },  {
    title: "Long title 10",
    icon: mdiAccessPoint,
    description: "12",
    onclick: () => alert('1')
  },  {
    title: "Long title 11",
    icon: mdiAccessPoint,
    description: "13",
    onclick: () => alert('1')
  },  {
    title: "Long title 12",
    icon: mdiAccessPoint,
    description: "14",
    onclick: () => alert('1')
  },  {
    title: "Long title 13",
    icon: mdiAccessPoint,
    description: "15",
    onclick: () => alert('14')
  },
  ]


  return (
    <div className="App">
      <Sidebar elements={elementsList}/>
    </div>
  );
}

export default App;
