import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SignIn } from "../containers/Auth";

export function Navigator() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
  );
}
