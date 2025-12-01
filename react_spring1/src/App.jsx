import { BrowserRouter } from "react-router-dom";
import "./App.css";
import App2 from "./componenets/App2";

function App() {
  return (
    <>
      <BrowserRouter>
        <App2 />
      </BrowserRouter>
    </>
  );
}

export default App;
