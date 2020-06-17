import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import Index from './pages/index';
import Article from './pages/article';
import BookList from './pages/booklist';
import LineBlog from './pages/lineblog';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function router() {
  return (
    <Router>
      <Route exact path="/" render={
        () => (
          <Redirect to="/home" />
        )}>
      </Route>
      <Route path="/" render={
        () => (
          <Index>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/booklist" component={BookList} />
            <Route path="/lineblog" component={LineBlog} />
            <Route path="/article/:articleId" component={Article} />
          </Index>
        )}>
      </Route>
    </Router>);
}

export default (router);
