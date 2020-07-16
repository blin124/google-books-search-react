import React from "react";
import { useHistory } from "react-router-dom";


function Nav() {

  const history = useHistory()
  

  function handleClick(url){
    history.push(url);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">
        Google Books
      </a>
      <div>
        <p onClick={(e) => handleClick('/')} className="navbar-brand" href="">
          Search
        </p>
        <p onClick={(e) => handleClick('/saved')} className="navbar-brand" href="">
          Saved
        </p>
      
        {/* <a className="navbar-brand" href="/saved">
          Saved
        </a> */}
      </div>
    </nav>
  );
}

export default Nav;
