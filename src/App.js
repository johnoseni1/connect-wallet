import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Shimi from "./autoclaim";

function App() {
  return (
    <Router>
          <div className="app">
              <Switch>
                <Route path="/" exact component={Shimi} />
               
              </Switch>
          </div>
    </Router>
  );
}

export default App;
