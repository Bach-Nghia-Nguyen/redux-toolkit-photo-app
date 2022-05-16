import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NotFound from "components/NotFound";
import AddEditPage from "./pages/AddEdit";
import MainPage from "./pages/Main";

function Photo(props) {
  const { path } = useRouteMatch();

  // console.log("match", { match });

  return (
    <Switch>
      <Route exact path={path} component={MainPage} />
      <Route exact path={`${path}/add`} component={AddEditPage} />
      <Route exact path={`${path}/:photoId`} component={AddEditPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

Photo.propTypes = {};

export default Photo;
