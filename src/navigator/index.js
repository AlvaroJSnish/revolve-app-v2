import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { SignIn } from "../containers/Auth";
import { Dashboard } from "../containers/Dashboard";

export function Navigator() {
  // const [token, setToken] = useState(null);
  //
  // useEffect(() => {
  //   const _t = localStorage.getItem("access_token");
  //   setToken(_t);
  //
  //   console.log({ _t });
  //
  //   if (!_t && window.location.host !== "localhost:3000") {
  //     window.location.href = "http://localhost:3000";
  //   }
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component = null, ...rest }) {
  return (
    <Route
      {...rest}
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
