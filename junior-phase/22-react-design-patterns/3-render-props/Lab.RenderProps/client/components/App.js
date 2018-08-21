import React, { Component } from "react";
import MouseTracker from "./MouseTracker";

class App extends Component {
  render() {
    return (
      <MouseTracker render={({x, y}) => <img 
          src="http://pngimg.com/uploads/cat/cat_PNG132.png"
          width="100"
          style={{position: "absolute", top: y-22, left:x-10}}
        />}
      />
    )
  }
}

export default App;