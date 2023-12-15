import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { ForYou } from './foryou/foryou.jsx';
import { History } from './history/history.jsx';
import { Search } from './search/search.jsx';
import { SearchResult } from './searchResult/searchResult.jsx';



export default function App() {
  return (
    <BrowserRouter>
        <div className='body'>
            <header>
            <h1 id="site-header">PoetryMate<sup> :)</sup></h1>
            <nav>
                <NavLink to="foryou">For You</NavLink>
                <NavLink to="search">Search</NavLink>
                <NavLink to="history">History</NavLink>
                <NavLink to="">Logout</NavLink>
            </nav>
            </header>
            <hr />

            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='foryou' element={<ForYou />} />
                <Route path='/history' element={<History />} />
                <Route path='/search' element={<Search />} />
                <Route path='/searchresult' element={<SearchResult />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
            <span id="text-reset">Author: Brandon Torruella</span>
            <br />
            <a id="author-link" href="https://github.com/bcxtorruella/startup/"><b>GitHub</b></a> for this project
            </footer>
        </div>
    </BrowserRouter>

  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }