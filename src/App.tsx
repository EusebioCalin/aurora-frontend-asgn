import Home from "./components/Home/Home";
import { TanstackProvider } from "./components/TanstackProvider/TanstackProvider";
import { SnackbarProvider } from "notistack";
import "./App.css";

function App() {
  return (
    <SnackbarProvider>
      <TanstackProvider>
        <Home />
      </TanstackProvider>
    </SnackbarProvider>
  );
}

export default App;
