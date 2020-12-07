import './App.css';
import "./Components/LandingPage/LandingPage";
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EnterExistingRoom from "./Components/EnterExistingRoom/EnterExistingRoom";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import RegisterEmp from "./Components/RegisterEmp/RegisterEmp";
import HostLandingPage from "./Components/LandingPage/HostLandingPage";
import ParticipantLandingPage from './Components/LandingPage/ParticipantLandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/PokerPlanning" component={LandingPage} />
          <Route path="/join-existing-room" component={EnterExistingRoom} />
          <Route path="/create-room" component={CreateRoom} />
          <Route path="/register-yourself" component={RegisterEmp} />
          <Route path="/poker-room" component={HostLandingPage} />
          <Route path="/participant-poker-room/" component={ParticipantLandingPage} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
