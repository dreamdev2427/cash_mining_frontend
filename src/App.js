import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import "./index.css"
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Box>
          <Home />
        </Box>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
