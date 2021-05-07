import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { Home } from "../Home";
import { Account } from "../Account";
import { Projects } from "../Projects";

import { PrivateRoute } from "../../navigator";
import { AppContainer } from "../../components";
import { Settings } from "../Settings";
import { Project } from "../Projects/Project";
import { onConnectWebsocket } from "../../helpers/websocket";

export function Dashboard() {
  const { path } = useRouteMatch();

  useEffect(() => {
    onConnectWebsocket();
  }, []);

  return (
    <AppContainer>
      <PrivateRoute exact path={path} component={Home} />
      <PrivateRoute exact path={`${path}/dashboard`} component={Home} />
      <PrivateRoute exact path={`${path}/projects`} component={Projects} />
      <PrivateRoute exact path={`${path}/projects/:id`} component={Project} />
      <PrivateRoute exact path={`${path}/account`} component={Account} />
      <PrivateRoute exact path={`${path}/settings`} component={Settings} />
    </AppContainer>
  );
}
