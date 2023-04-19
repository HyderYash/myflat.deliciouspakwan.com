import "./App.css";
import Homepage from "./pages/Homepage";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import Utilities from "./pages/Utilities";
import Profile from "./pages/Profile";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/reports" component={Reports} />
      <Route path="/categories" component={Categories} />
      <Route path="/utilities" component={Utilities} />
      <Route path="/profile" component={Profile} />
    </div>
  );
}

export default App;
