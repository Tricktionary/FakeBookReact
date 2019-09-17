import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import 'semantic-ui-css/semantic.min.css'

import NavBar from "./components/nav_bar"
import Home from "./view/home"
import UploadForm from "./view/upload_form"

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});


const App = () => (
  <ApolloProvider client={client}>
        <NavBar/>
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path='/upload_form' component={UploadForm} />
            </Switch>
        </Router>
   </ApolloProvider>
);

render(<App/>, document.getElementById('root'));