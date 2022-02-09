import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Car from "./components/Car";
import List from "./components/List";
import UI from "./components/UI";
import Datatable from "./components/table";
import Hook from "./components/Hook";
import Todo from "./components/Todo";
import AddBar from "./components/Addbar";

const Routing = () => {
  return (
    <Router>
      <Link to="/">Home </Link>
      <Link to="/ui">UI </Link>
      <Link to="/list">List </Link>
      <Link to="/hook">Hook </Link>
      <Link to="/car">Car</Link>
      <Link to="/todo">Todo</Link>
      <Routes>
        <Route exact path="/" element={<Datatable />} />
        <Route path="/ui" element={<UI />} />
        <Route path="/list" element={<List />} />
        <Route path="/hook" element={<Hook />} />
        <Route path="/car" age="25" eye="black" element={<Car />} />
        <Route path="/todo" element={<Todo />}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <>
    <Routing />
    <AddBar />
  </>,
  document.getElementById("root")
);
