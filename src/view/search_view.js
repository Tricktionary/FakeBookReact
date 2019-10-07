import React, { useState }  from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
 
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

 
  
export function SearchView(props){  
    
    const [bookName, setBookName] = useState();
    const [songName, setSongName] = useState();
    const [pageNumber, setPageNumber] = useState();
    
    let hangeInputChange = function(e){
        switch(e.target.name){
            case "bookName":
                setBookName(e.target.value);
                break;
            case "songName":
                setSongName(e.target.value);
                break;
            case "pageNumber":
                setPageNumber(e.target.value);
                break;
            default:
                break;
        }
    }

    let handleSubmit = function(e){
        e.preventDefault();       
    }

    return (
        <div style={pageSection}>
            <h2>Search</h2>
            <form className="ui form"  onSubmit={handleSubmit}>
                <div className="field">
                    <label>Book Name</label>
                    <input type="text" name="bookName" placeholder="Song Name" onChange={function(e){hangeInputChange(e)}}/>
                </div>
                <div className="field"> 
                    <label>Song Name</label>                    
                    <input type="text" name="songName" placeholder="0" onChange={function(e){hangeInputChange(e)}}/>
                </div>
                <div className="field"> 
                    <label>Page Number</label>
                    <input type="number" name="pageNumber" placeholder="0" onChange={function(e){hangeInputChange(e)}}/>
                </div>
                <div className="field"> 
                    <button className="ui button green" type="submit">Search</button>
                </div>
            </form>
        </div>
    );  
}

export default SearchView