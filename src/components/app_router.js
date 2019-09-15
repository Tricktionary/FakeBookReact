import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadForm from "../view/upload_form"
import ExchangeRate from "../view/exchange_rate"


export function NavBar(){
    return(
        <div> 
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/test">Test</Link>
                        </li>
                        <li>
                            <Link to="/upload_form">Upload Book</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Route path="/test" component={ExchangeRate} />
                    <Route path="/upload_form" component={UploadForm} />
                 </div>
            </Router>
        </div>
    )
}

export default NavBar