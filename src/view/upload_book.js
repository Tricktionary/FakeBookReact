import React, { useState }  from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const UPLOAD_FORM = gql`
    mutation uploadBook($bookTitle: String!, $fakebookPDF: File!, $fakebookCsv: File! ){
        uploadBook(bookTitle:$bookTitle, fakebookPdf: $fakebookPDF ,fakebookCsv: $fakebookCsv ){
            book{
                id
            }
        }
    }
`;
 
export function UploadForm(){
 
    const [fakebookCSV, setFakebookCSV] = useState();
    const [fakebookPDF, setFakebookPDF] = useState();
    const [bookTitle, setBookTitle] = useState("");

    const [uploadMutation] = useMutation(UPLOAD_FORM);

    let handleSubmit = function(e){
        e.preventDefault();
        console.log("Submit book form")

        uploadMutation({ 
            variables: {
                bookTitle: bookTitle, 
                fakebookPDF: fakebookPDF,
                fakebookCsv: fakebookCSV,
            } 
        });
    }

    let handleInputChange = function(e){
        switch(e.target.name){
            case "bookTitle":
                setBookTitle(e.target.value);
                 break;
            case "fakebookPDF":
                setFakebookPDF(e.target.files[0]);
                break;
            case "fakebookCSV":
                setFakebookCSV(e.target.files[0]);
                break;
            default:
                break;
        }
    }

    return (
        <div style={pageSection}>
            <h1>Upload Book</h1>
            
            <form className="ui form" onSubmit={handleSubmit}>
                
                <div className="field">
                    <label>Book Title</label>
                    <input type="text" name="bookTitle" placeholder="Book Title" onChange={function(e){handleInputChange(e)}}/>
                </div>
                <div className="field">
                    <label>FakeBook PDF</label>
                    <input type="file" name="fakebookPDF" onChange={function(e){handleInputChange(e)}} />
                </div>
                <div className="field">
                <label>FakeBook CSV</label>
                    <input type="file" name="fakebookCSV" onChange={function(e){handleInputChange(e)}} />
                </div>

                <div className="field"> 
                    <button className="ui button green" type="submit">Upload Book</button>
                </div>

            </form>
        </div>
      );
    
}

export default UploadForm