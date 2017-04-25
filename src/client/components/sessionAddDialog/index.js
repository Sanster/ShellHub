import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import './style.less'

class SessionAddForm extends Component {
  constructor(props) {
    super(props)

    this.onOk = this.onOk.bind(this)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleHostIPInput = this.handleHostIPInput.bind(this)
    this.handleHostUserInput = this.handleHostUserInput.bind(this)

    this.sessionData = {
      sessionGroupId: this.props.sessionGroupId
    }
  }

  handleNameInput(e) {
    this.sessionData.name = e.target.value
  }

  handleHostIPInput(e) {
    this.sessionData.hostIP = e.target.value
  }

  handleHostUserInput(e) {
    this.sessionData.hostUser = e.target.value
  }

  onOk() {
    this.props.onOk(this.sessionData)
    console.log(this.sessionData)
  }

  render() {
    const { open, onCancel } = this.props

    return (
      <Modal
        open={open}
        className="session-add-dialog"
        size='small'>
        <Modal.Header>Add a session</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' onChange={this.handleNameInput}/>
              </Form.Field>
              <Form.Field>
                <label>Host IP</label>
                <input placeholder='Host IP' onChange={this.handleHostIPInput}/>
              </Form.Field>
              <Form.Field>
                <label>Login user</label>
                <input placeholder='Login user' onChange={this.handleHostUserInput}/>
              </Form.Field>
              <Form.Field>
                <label>SSH Port</label>
                <input placeholder='SSH Port' />
              </Form.Field>
              <Form.Field>
                <label>Authorized keys</label>
                <input placeholder='Authorized keys' />
              </Form.Field>
              <Button onClick={this.onOk}>Add</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default SessionAddForm
