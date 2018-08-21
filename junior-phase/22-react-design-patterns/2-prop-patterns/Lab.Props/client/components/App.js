import React, { Component } from "react";
import Galery from "./Galery";

class App extends Component {
  render() {
    return (
      <div>
        <Galery title="Lakes" description="Check out this awesome lake pics">
          <img src="/images/canoeing.jpg" alt="Canoeing lake" />
          <img src="/images/montains.jpg" alt="Between Montains" />
          <img src="/images/frozen.jpg" alt="Frozen lake" />
        </Galery>
      </div>
    )
  }
}

export default App;