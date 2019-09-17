import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import 'semantic-ui-css/semantic.min.css'


import NavBar from "./components/nav_bar"
import Home from "./view/home"
import CreateSongForm from "./view/create_song_form"
import UploadBook from "./view/upload_book"

const link = createUploadLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
        <NavBar/>
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path='/create_song' component={CreateSongForm} />
                <Route path="/upload_form" component={UploadBook} />
            </Switch>
        </Router>
   </ApolloProvider>
);

render(<App/>, document.getElementById('root'));