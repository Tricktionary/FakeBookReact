import React, { useState }  from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const SUBMIT_FORM = gql`
    mutation createSong($name: String!, $pageRangeStart: Int!, $pageRangeEnd:Int!,$pageCount:Int! ){
        createSong(name:$name, pageRangeStart: $pageRangeStart ,pageRangeEnd: $pageRangeEnd,pageCount:$pageCount){
            song{
                name
            }
        }
    }
`;

export function UploadForm(){
    const [name, setName] = useState();
    const [pageRangeStart, setPageRangeStart] = useState();
    const [pageRangeEnd, setPageRangeEnd] = useState();
    const [pageCount, setPageCount] = useState();

    const [uploadMutation] = useMutation(SUBMIT_FORM);


    let handleSubmit = function(e){
        e.preventDefault();
 
        uploadMutation({ 
            variables: {
                name: name, 
                pageRangeStart: parseInt(pageRangeStart),
                pageRangeEnd: parseInt(pageRangeEnd),
                pageCount: parseInt(pageCount)
            } 
        });
        
    }
    return (
        <div style={pageSection}>
            <h1>Song Upload Form</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Song Name</label>
                    <input type="text" placeholder="Song Name" onChange={function(event){
                        setName(event.target.value);
                    }}/>
                </div>

                <div className="field"> 
                    <label>Page Range Start</label>                    
                    <input type="number" placeholder="0" onChange={function(event){
                        setPageRangeStart(event.target.value);
                    }}/>
                </div>
                
                <div className="field"> 
                    <label>Page Range End</label>
                    <input type="number" placeholder="0" onChange={function(event){
                        setPageRangeEnd(event.target.value);
                    }}/>
                </div>

                <div className="field"> 
                    <label>Total Range Count</label>
                    <input type="number" placeholder="0" onChange={function(event){
                        setPageCount(event.target.value);
                    }}/>
                </div>
                
                <div className="field"> 
                    <button className="ui button green" type="submit">Add Todo</button>
                </div>

            </form>
        </div>
      );
    
}

export default UploadForm