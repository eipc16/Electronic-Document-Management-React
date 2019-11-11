import React from 'react';
import './App.scss';

import { Route } from 'react-router-dom';

import CustomSidebar from './modules/sidebar/Sidebar';
import { ActionBlocker } from './modules/actionblocker/ActionBlocker'
import { sidebarElements } from './static/sidebar';
import DocumentsListPage from './modules/documents/DocumentsListPage';
import { FlowChartPage } from './modules/flowcharts/FlowChartsPage';
import {WizardTest} from "./modules/wizards/WizardTest";

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <ActionBlocker />
      <CustomSidebar className="side-bar" elements={sidebarElements} {...props} />
      <div className="main-container">
        <Route exact path="/" component={DocumentsListPage} />
        <Route path="/flowcharts/:flowchartId?" component={FlowChartPage} />
        <Route path="/form" component={WizardTest} />
      </div>
    </div>
  );
};

export default App;
