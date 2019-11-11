import React from 'react';
import './App.scss';

import { Route } from 'react-router-dom';

import CustomSidebar from './modules/sidebar/Sidebar';
import { sidebarElements } from './static/sidebar';
import DocumentsListPage from './modules/documents/DocumentsListPage';
import { FlowChartPage } from './modules/flowcharts/FlowChartsPage';

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <CustomSidebar className="side-bar" elements={sidebarElements} {...props} />
      <div className="main-container">
        <Route exact path="/" component={DocumentsListPage} />
        <Route path="/flowcharts/:flowchartId?" component={FlowChartPage} />
      </div>
    </div>
  );
};

export default App;
