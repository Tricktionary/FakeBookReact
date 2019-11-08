import React, { useState }  from 'react'
import { Button, Modal } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_BOOK = gql`
  mutation updateBook($id:Int!, $title: String!){
    updateBook(id:$id,title:$title){
        book{
            id
            title
            pdfUrl
        }
    }
  }
`
const DELETE_BOOK = gql`
  mutation deleteBook($id:Int!){
    deleteBook(id:$id){
        book{
            id
            title
            pdfUrl
        }
    }
  }
`

export function EditBookModal(props){
  const [title, setTitle ] = useState(props.book_title);
  const [id,setID] = useState(props.book_id);
  const [deleteMutation] = useMutation(DELETE_BOOK);
  const [updateMutation] = useMutation(UPDATE_BOOK);

  
  let handleInputChange = function(e){
      switch(e.target.name){
        case "title":
          setTitle(e.target.value);
          break;
        default:
          break;
    }
  }

  let handleSubmit = function(e){
    e.preventDefault();
    updateMutation({ 
      variables: {
          id: parseInt(id), 
          title: title
      } 
    });
  }

  let handleDelete = function(e){
    e.preventDefault();
    deleteMutation({ 
      variables: {
          id: parseInt(id), 
      } 
    });
  }

  return(
    <Modal trigger={<Button color='green' >Edit</Button>}>
      <Modal.Header>Edit Book: {title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <form className="ui form" >
            <div className="field">
                <label>Book Title</label>
                <input type="text" name="title" placeholder="Book Title" value={title} onChange={function(e){handleInputChange(e)}}/>
            </div>
          </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions> 
        <button className="ui button red" onClick={handleDelete}>Delete Book</button>
        <button className="ui button green" onClick={handleSubmit}>Save</button> 
      </Modal.Actions>
    </Modal>
  )
}

export default EditBookModal
