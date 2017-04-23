import React, { Component } from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import './style.less'

class SessionAddForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal
        trigger={<Button>Show Modal</Button>}
        className="session-add-dialog"
        size='small'>
        <Modal.Header>Add a session</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' />
              </Form.Field>
              <Form.Field>
                <label>Host IP</label>
                <input placeholder='Host IP' />
              </Form.Field>
              <Form.Field>
                <label>Login user</label>
                <input placeholder='Login user' />
              </Form.Field>
              <Form.Field>
                <label>SSH Port</label>
                <input placeholder='SSH Port' />
              </Form.Field>
              <Form.Field>
                <label>Authorized keys</label>
                <input placeholder='Authorized keys' />
              </Form.Field>
              <Button type='submit'>Add</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default SessionAddForm
