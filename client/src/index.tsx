import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ColorProvider from "./providers/ColorProvider";

ReactDOM.render(
  <ColorProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ColorProvider>,
  document.getElementById("root")
);
