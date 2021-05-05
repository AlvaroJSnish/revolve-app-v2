import { Provider } from "react-redux";
import { useStore } from "../redux/store";

function App() {
  const store = useStore();

  return (
    <Provider store={store}>
      <div>asd</div>
    </Provider>
  );
}

export default App;
