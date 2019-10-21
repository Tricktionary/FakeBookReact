import React, { useState }  from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const UPLOAD_FORM = gql`
    mutation uploadBook($title: String!, $fakebookPDF: File!, $fakebookCsv: File! , $pageCount: Int!){
        uploadBook(title:$title, fakebookPdf: $fakebookPDF ,fakebookCsv: $fakebookCsv, pageCount: $pageCount ){
            book{
                id
                pdfUrl
            }
        }
    }
`;
 
export function UploadForm(){
 
    const [fakebookCSV, setFakebookCSV] = useState();
    const [fakebookPDF, setFakebookPDF] = useState();
    const [title, setTitle] = useState("");
    const [pageCount, setPageCount] = useState();
    const [uploadMutation , {loading: mutationLoading}] = useMutation(UPLOAD_FORM);

    let handleSubmit = function(e){
        e.preventDefault();
        console.log("Submit book form")

        uploadMutation({ 
            variables: {
                title: title, 
                fakebookPDF: fakebookPDF,
                fakebookCsv: fakebookCSV,
                pageCount: pageCount
            } 
        });
    }
    console.log(uploadMutation)

    let handleInputChange = function(e){
        switch(e.target.name){
            case "title":
                setTitle(e.target.value);
                break;
            case "fakebookPDF":
                setFakebookPDF(e.target.files[0]);
                break;
            case "fakebookCSV":
                setFakebookCSV(e.target.files[0]);
                break;
            case "pageCount":
                setPageCount(parseInt(e.target.value));
                break;
            default:
                break;
        }
    }

    let buttonText;
    
    if (mutationLoading){
        buttonText =  "Uploading";
    }else{
        buttonText =  "Upload";
    }

    return (
        <div style={pageSection}>
            <h1>Upload Book</h1>
            
            <form className="ui form" onSubmit={handleSubmit}>
                
                <div className="field">
                    <label>Book Title</label>
                    <input type="text" name="title" placeholder="Book Title" onChange={function(e){handleInputChange(e)}}/>
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
                <label>Page Count</label>
                    <input type="number" name="pageCount" onChange={function(e){handleInputChange(e)}} />
                </div>


                <div className="field"> 
                    <button className={ `ui button green ${mutationLoading ? 'loading' : ''}`} type="submit">{buttonText}</button>
                </div>

                 
            </form>
        </div>
      );
    
}

export default UploadForm