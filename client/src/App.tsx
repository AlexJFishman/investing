import React from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import BottomViewComponent from "./components/bottom-view/bottom-view";
import TopViewComponent from "./components/top-view/top-view";
const App = () => {
  return (
    <div className="main-container">
      <TopViewComponent></TopViewComponent>
      <BottomViewComponent></BottomViewComponent>
    </div>
  );
};

export default observer(App);
