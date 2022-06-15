import { CookiesProvider } from "react-cookie";
import "./App.css";
import { Navigation } from "./routes/Navigation";

function App() {
  return (
    <CookiesProvider>
      <Navigation />
    </CookiesProvider>
  );
}

export default App;
