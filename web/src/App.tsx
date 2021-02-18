import "App.css";

import { rules } from "auth/abac";
import React from "react";
import { AbacProvider } from "react-abac";
import { useRecoilValue } from "recoil";
import Router from "router";
import { SESSION_STATE } from "store";

const App = () => {
  const { role } = useRecoilValue(SESSION_STATE);
  return (
    <AbacProvider rules={rules} roles={[role]}>
      <Router />
    </AbacProvider>
  );
};

export default App;
