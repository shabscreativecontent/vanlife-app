import avatarIcon from "../assets/images/avatar-Icon.png"
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header(){
    function fakeLogOut() {
        localStorage.removeItem("loggedIn")
    }

    return(
        <>
           <header>
               <NavLink className="site-logo" to="/">#VanLife</NavLink>
               <nav>
                 <NavLink 
                    to="host"
                    className={({isActive}) => isActive ? 'my-link' : null}
                    >Host
                </NavLink>
                 <NavLink 
                    to="about"
                    className={({isActive}) => isActive ? 'my-link' : null}
                    >About
                </NavLink>
                <NavLink 
                    to="vans"
                    className={({isActive}) => isActive ? 'my-link' : null}
                >Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={avatarIcon} 
                        alt=""
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
               </nav>
           </header> 
        </>
    )
}