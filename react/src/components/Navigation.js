import React from 'react';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav className="App-nav">
            <button id="home-button">
                <Link to="/">Home</Link>
            </button>
            <button id="create-button">
                <Link to="/create">Create</Link>
            </button>
        </nav>
    );
}

export default Navigation;