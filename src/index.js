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
import UploadBook from "./view/upload_book"
import BookView from "./view/book_view"
import SongView from './view/song_view';
import SearchView from './view/search_view'

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
                <Route path="/upload_form" component={UploadBook} />
                <Route path="/book/:id" component={BookView} />
                <Route path="/song/:id" component={SongView} />
                <Route path="/search" component={SearchView} />
            </Switch>
        </Router>
   </ApolloProvider>
);

render(<App/>, document.getElementById('root'));