import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import AppRouter from "./components/app_router"
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
  });

  const App = () => (
  <ApolloProvider client={client}>
    <div>
        <AppRouter/>
    </div>
  </ApolloProvider>
);

render(<App/>, document.getElementById('root'));