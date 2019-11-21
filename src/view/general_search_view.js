import React, { useState } from 'react';
import SongList from '../components/song_list'
import BookList from '../components/book_list'

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
} 
  
export function GeneralSearchView(){  
    const [name, setName] = useState();
    const [called, setCalled] = useState(false);


    // Handle Form Submit
    let handleSubmit = function(e){
        e.preventDefault();
        setCalled(true)
    }
    
    // Handle the input change
    let handleInputChange = function(e){
        switch(e.target.name){
            case "name":
                setName(e.target.value);
                break;
            default:
                break;
        }
    }
    if (!called) {
        return(
            <div style={pageSection}>
                <h1>Search</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Please input name of object" onChange={function(e){handleInputChange(e)}}/>
                    </div>
                    <div className="field"> 
                        <button className= 'ui button green' type="submit">Search</button>
                    </div>
                </form>
            </div>
        )
    }

      
    return (
        <div style={pageSection}>
            <h1>Search Results</h1>
            
            <div className="ui grid"> 

                {/* Book View */}
                <div className="eight wide column">
                    <BookList book_name={name}/>
                </div>    
                
                {/* Song List */}
                <div className="eight wide column"> 
                    <SongList song_name={name}/>
                </div>
 
            </div>
        </div>
    );  
}

export default GeneralSearchView