import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer'
import Navigation from "./components/Navigation";
import Landing from './pages/Landing';
import Bill from './pages/Bill';
import Chore from './pages/Chore';
import Contact from './pages/Contact';
import Message from './pages/Message';


import './App.css'


const client = new ApolloClient({
    uri: '/graphql',
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
            {/* <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profiles/:userId">
              <Profile />
            </Route> */}
            <Route exact path="/contact">
              <Contact />
            </Route>
          </main>
          <Footer />
        </div>
      </Router>
     </ApolloProvider> 
  );
}

export default App;
