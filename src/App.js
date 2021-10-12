import { useEffect, useState } from "react";
import "./App.css";
import BtnComponent from "./Components/BtnComponent";
import TimeComponent from "./Components/TimeComponent";
import {from} from 'rxjs'
import {filter,map} from 'rxjs/operators'

function App() {
  const [timer, setTimer] = useState({
    elapsed: 0,
    runningSince: 0,
  });

  const onStartHandler = () => {
    setTimer({
      ...timer,
      runningSince: Date.now(),
    });

  };

  const onStopHandler = () => {
    setTimer({
      elapsed: 0,
      runningSince: 0,
    });
  };

  const onWaitHandler = () => {
    const now = Date.now();
    const elapsed = now - timer.runningSince;
    setTimer({
      elapsed: timer.elapsed + elapsed,
      runningSince: 0,
    });
  };

  const onResetHandler = () => {
    const now = Date.now();
    setTimer({
      elapsed:0,
      runningSince: now,
    });
  };

  return (
    <div className="app">
      <div
        className="card"
        style={{
          width: `20rem`,
          textAlign: `center`,
          padding: `1rem 2rem`,
        }}
      >
        <TimeComponent timer={timer} />

        <div className="card-body">
          <BtnComponent
            start={onStartHandler}
            stop={onStopHandler}
            wait={onWaitHandler}
            reset={onResetHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
