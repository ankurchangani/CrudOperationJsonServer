import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import FormWithValidation from "./Components/Form/Form";
import ViewData from "./Components/ViewData/ViewData";
import Home from "./Components/Home/Home";
import EditData from "./Components/EditData/EditData";
import RecycleBin from "./Components/RestoreData/RestoreData";
import { CrudProvider } from "./Services/context/crudContext";


function App() {
  return (
    <CrudProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormWithValidation />} />
        <Route path="/view" element={<ViewData />} />
        <Route path="/edit/:id" element={<EditData />} />
        <Route path="/recycle-bin" element={<RecycleBin />} />
      </Routes>
    </CrudProvider>
  );
}

export default App;
