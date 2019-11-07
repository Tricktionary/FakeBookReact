import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export function EditBookModal(props){
  
  return(
    <Modal trigger={<Button color='green' >Edit</Button>}>
      <Modal.Header>Edit Book: {props.book_title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <form className="ui form" >
            <div className="field">
                <label>Book Name</label>
                <input type="text" name="name" placeholder="Song Name"/>
            </div>
          </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button red">Delete Book</button>
        <button className="ui button green">Save</button> 
      </Modal.Actions>
    </Modal>
  )
}

export default EditBookModal
