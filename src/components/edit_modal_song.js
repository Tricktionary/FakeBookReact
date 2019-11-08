import React, { useState }  from 'react'
import { Button, Modal } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


const UPDATE_SONG = gql`
  mutation updateSong($id:Int!,$name:String!){
    updateSong(id:$id,name:$name){
        song{
          id
          name	
        }
    }
  }
`

export function EditSongModal(props){
  const [id,setID] = useState(props.song_id);
  const [name, setName ] = useState(props.song_name);
  const [updateMutation] = useMutation(UPDATE_SONG);

  let handleInputChange = function(e){
      switch(e.target.name){
        case "name":
          setName(e.target.value);
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
          name: name
      } 
    });
  } 

  return(
    <Modal trigger={<Button color='green' >Edit</Button>}>
      <Modal.Header>Edit Song: {name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <form className="ui form" >
            <div className="field">
                <label>Song Name</label>
                <input type="text" name="name" placeholder="Song Name" value={name} onChange={function(e){handleInputChange(e)}}/>
            </div>
          </form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions> 
        <button className="ui button green" onClick={handleSubmit}>Save</button> 
      </Modal.Actions>
    </Modal>
  )

}

export default EditSongModal