import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "../view/home"
import UploadForm from "../view/upload_form"
import ExchangeRate from "../view/exchange_rate"


export function NavBar(){
    return(
        <div> 
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/upload_form">Upload Book</Link>
                        </li>
                    </ul>
                    <Route path="/" exact component={ExchangeRate} />
                    <hr/>
                </div>
            </Router>
        </div>
    )
}

export default NavBar