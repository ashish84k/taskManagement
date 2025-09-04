import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./app/routes/Routes";
import './app/css/AlertBox.css'
import './app/css/auth.css'
import { store } from "./app/state_management/store";
import {Provider} from 'react-redux'

function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </>
  );
}


export default App;
