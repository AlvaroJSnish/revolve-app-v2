import { useRouteMatch } from "react-router-dom";

import { Home } from "../Home";
import { Account } from "../Account";
import { Projects } from "../Projects";

import { PrivateRoute } from "../../navigator";
import { AppContainer } from "../../components";

export function Dashboard() {
  const { path } = useRouteMatch();

  return (
    <AppContainer>
      <PrivateRoute exact path={path} component={Home} />
      <PrivateRoute exact path={`${path}/dashboard`} component={Home} />
      <PrivateRoute exact path={`${path}/projects`} component={Projects} />
      <PrivateRoute exact path={`${path}/account`} component={Account} />
    </AppContainer>
  );
}
