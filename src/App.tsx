import React from 'react';
import './App.scss';

import { Route } from 'react-router-dom';

import CustomSidebar from './sidebar/Sidebar';
import { ActionBlocker } from './actionblocker/ActionBlocker'
import { sidebarElements } from './static/sidebar';
import DocumentsListPage from './documents/DocumentsListPage';
import { FlowChartPage } from './flowcharts/FlowChartsPage';

const App: React.FC = (props: any) => {

  console.log(props)

  return (
    <div className="App">
      <ActionBlocker />
      <CustomSidebar className="side-bar" elements={sidebarElements} {...props} />
      <div className="main-container">
        <Route exact path="/" component={DocumentsListPage} />
        <Route path="/flowcharts/:flowchartId?" component={FlowChartPage} />
      </div>
    </div>
  );
};

export default App;
