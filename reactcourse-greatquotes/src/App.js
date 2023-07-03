import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/quotes" />
          </Route>
          <Route exact path="/quotes">
            <AllQuotes />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="/quotes/:id">
            <QuoteDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

/*
I have tried to use this patch for creating a new quote: /quotes/new
I was able to solve the first issue of the "new" word being treated as an ID in /quotes/:id and
then the component rendered is the wrong one
I used Switch, exact and sort to solve that
But there was another issue, when I tried to use activeClassName on NavLink component.
The active class didn't get out, so I had to change the path to /new-quote
I asked a question in the course lecture and I am still waiting for the answer.

On Route we can use variables /:something/
So there will be a match for any value passed as a parameter

DEPLOYING THE APP

Lazy Loading - Load code only when it's needed
When we open a site, we don't need to have the whole content loaded in our machine right away. 
That's not the best user experience, because the loading page delay will be longer.
So the Lazy Loading helps us to solve that issue. First of all, the code for displaying the AllQuotes page will be
downloaded, and if the user accesses another page, that page's content will be downloaded.

*/
