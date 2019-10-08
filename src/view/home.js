import React from 'react';
import SongList from '../components/song_list'
import BookList from '../components/book_list'

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}
 
export function Home(){
   
    return (
        
        <div style={pageSection} >
            <h1>FakeBook</h1>
            <div className="ui grid"> 

                {/* Book View */}
                <div className="eight wide column">
                    <BookList/>
                </div>    
                
                {/* Song List */}
                <div className="eight wide column"> 
                    <SongList/>
                </div>
            </div>

        </div>
    );
    
}

export default Home