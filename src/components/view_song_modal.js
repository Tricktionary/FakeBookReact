import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

export function ViewSongModal(props){
  
  return(
    <Modal trigger={<Button >View Songs</Button>}>
      <Modal.Header>Songs From: {props.book_title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
            {props.songs.map( ({ id, name }) => (
                <div key={id}>
                    <a href={"/song/"+id}> Song :{name} </a>
                </div>
            ))}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ViewSongModal
