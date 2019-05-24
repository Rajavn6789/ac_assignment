import React from "react";
import Autocomplete from "containers/Autocomplete";
import 'assets/globalStyle.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>AC</h1>
        <Autocomplete />
      </div>
    );
  }
}

export default App;
