import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => { 
    this.setState({ activeItem: name }) 
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='home'
          href="/"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='uploadForm'
          href="/upload_form"
          active={activeItem === 'uploadForm'}
          onClick={this.handleItemClick}
        >
          Upload Book
        </Menu.Item>

        <Menu.Item
          name='createSong'
          href="/create_song"
          active={activeItem === 'createSong'}
          onClick={this.handleItemClick}
        >
          Create Song Form
        </Menu.Item>
      </Menu>
    )
  }
}