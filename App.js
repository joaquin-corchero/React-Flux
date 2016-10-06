import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){
    let variableValue = this.props.txt + " the extra";
    let cat = this.props.cat;
    return (
      <div>
        <h1>Class component has state</h1>
        <p>Removed imports and render from main.js</p>
        <p>{this.props.txt}</p>
        <p>{variableValue}</p>
        <p>{cat}</p>
        <p>{this.props.txtDefault}</p>
      </div>
    )
  }
};

//const AppLambda = () => <h1>Stateless function component, does not have state</h1>

//export default App

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
  txtDefault: 'this is the default txt'
}

ReactDOM.render(
  <App cat={100} txt="this is the property text"/>,
  document.getElementById('app')
);
