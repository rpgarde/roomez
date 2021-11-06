import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { BrowserRouter as Router, Route , Redirect} from 'react-router-dom';
import {createUploadLink} from 'apollo-upload-client'
import Footer from './components/Footer'
import Navigation from "./components/Navigation";
import Landing from './pages/Landing';
import Bill from './pages/Bill';
import Chore from './pages/Chore';
import Message from './pages/Message';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import Home from './pages/Home'

import './App.css'
import Auth from './utils/auth'

// Construct our main GraphQL API endpoint
const httpLink = createUploadLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
  
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="d-flex flex-column min-100-vh">
          <Navigation />
          <main>
          <Route exact path="/">
              {Auth.loggedIn()?<Home />:<Redirect to="/welcome"/>}
            </Route>
            <Route exact path="/welcome">
              <Landing />
            </Route>
            <Route exact path="/messages">
              <Message />
            </Route>
            <Route exact path="/bills">
              <Bill />
            </Route>
            <Route exact path="/chores">
              <Chore />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
          </main>
          <Footer />
        </div>
      </Router>
     </ApolloProvider> 
  );
}

export default App;
