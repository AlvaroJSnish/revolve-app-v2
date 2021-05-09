import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { SignIn } from "../containers/Auth";
import { Dashboard } from "../containers/Dashboard";
import { Signup } from "../containers/Auth/SignUp";

export function Navigator() {
  return (
    <Suspense fallback="loading...">
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/app" component={Dashboard} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export function PrivateRoute({ component: Component = null, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        localStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" state={{ from: props.location }} />
        )
      }
    />
  );
}
