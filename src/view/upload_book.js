import React from 'react';
 
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}
 
export function UploadForm(){
 
    let handleSubmit = function(e){
        e.preventDefault();
        console.log("Submit song form")
    }

    return (
        <div style={pageSection}>
            <h1>Upload Book</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Book Name</label>
                    <input type="text" name="name" placeholder="Book Name" />
                </div>
                <div className="field">
                    <label>FakeBook PDF</label>
                    <input type="file" name="fakebookPDF" />
                </div>
            </form>
        </div>
      );
    
}

export default UploadForm