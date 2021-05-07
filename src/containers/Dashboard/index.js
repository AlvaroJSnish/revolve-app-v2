import { useEffect } from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import { Home } from "../Home";
import { Account } from "../Account";
import { Projects } from "../Projects";

import { PrivateRoute } from "../../navigator";
import { AppContainer } from "../../components";
import { Settings } from "../Settings";
import { Project } from "../Projects/Project";
import { onConnectWebsocket } from "../../helpers/websocket";
import { NewProject } from "../Projects/NewProject";

export function Dashboard() {
  const { path } = useRouteMatch();

  useEffect(() => {
    onConnectWebsocket();
  }, []);

  return (
    <AppContainer>
      <Switch>
        <PrivateRoute exact path={path} component={Home} />
        <PrivateRoute exact path={`${path}/dashboard`} component={Home} />
        <PrivateRoute exact path={`${path}/projects`} component={Projects} />
        <PrivateRoute
          exact
          path={`${path}/projects/new-project`}
          component={NewProject}
        />
        <PrivateRoute exact path={`${path}/projects/:id`} component={Project} />
        <PrivateRoute exact path={`${path}/account`} component={Account} />
        <PrivateRoute exact path={`${path}/settings`} component={Settings} />
      </Switch>
    </AppContainer>
  );
}
