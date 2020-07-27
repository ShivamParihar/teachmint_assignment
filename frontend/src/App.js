import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Home from "./containers/Home/Home";
import ClassroomOverview from "./containers/ClassroomOverview/ClassroomOverview";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        {localStorage.getItem("token") ? (
          <>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/classroom-details/:id"
              component={ClassroomOverview}
            />
          </>
        ) : (
          <></>
        )}
      </Switch>
    </Router>
  );
}

export default App;
