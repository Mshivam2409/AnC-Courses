import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "services/auth";
import "./App.css";

const App = () => {
  useState(()=>{
    isAuthenticated() && 
  }) 
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "/courses" : ""}
    >
      <Switch></Switch>
    </BrowserRouter>
  );
};

export default App;
