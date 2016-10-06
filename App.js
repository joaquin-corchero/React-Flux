import React from 'react';

class App extends React.Component{
  render(){
    return (
      <div>
        <h1>Class component has state</h1>
      </div>
    )
  }
};

export default App

const AppLambda = () => <h1>Stateless function component, does not have state</h1>
