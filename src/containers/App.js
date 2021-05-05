import { Provider } from "react-redux";

import { Navigator } from "../navigator";
import { useStore } from "../redux/store";

function App() {
  const store = useStore();

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
