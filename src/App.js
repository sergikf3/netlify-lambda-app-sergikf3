import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const qHello = client.query({
  query: gql`
    {
          hello
    }
  `
})
// Replace the previous LambdaDemo with the code below:
/*
const LambdaDemo1 = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          hello
        }
      `}
    >
      {({ data }) =>
        <div>A greeting from the server: {data.hello}</div>}
    </Query>
  </ApolloProvider>
);
*/

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch('/.netlify/functions/' + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  handleClickGraphql = () => e => {
    e.preventDefault();
    this.setState({ loading: true });
    qHello.then(({data}) => this.setState({ loading: false, msg: data.hello}));
  };


  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick('hello')}>
          {loading ? 'Loading...' : 'Call Lambda'}
        </button>
        <button onClick={this.handleClick('async-chuck-norris')}>
          {loading ? 'Loading...' : 'Call Async Lambda'}
        </button>
        <button onClick={this.handleClickGraphql()}>
          {loading ? 'Loading...' : 'Call Graphql Lambda'}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    );
  }
}

export default App;
