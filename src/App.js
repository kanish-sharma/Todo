import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login.jsx";
import Employees from "./components/AddTodo/AddTodo.jsx";
import PageNotFound from "./components/PageNotFound";
const Search = lazy(() => import("./components/SearchTodo/Search.jsx"));
const Chart = lazy(() => import("./components/Chart/Chart.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Search />}></Route>
          </Route>
          <Route exact path="/add" element={<ProtectedRoute />}>
            <Route exact path="/add" element={<Employees />}></Route>
          </Route>
          <Route exact path="/chart" element={<ProtectedRoute />}>
            <Route exact path="/chart" element={<Chart />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
