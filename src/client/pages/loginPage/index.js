import React, { Component } from 'react'
import { Segment, Form, Input, Button } from 'semantic-ui-react'
import './login.less'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.doLogin = this.doLogin.bind(this)
  }

  doLogin(e) {
    e.preventDefault()
  }

  render() {

    return(
      <div className="login-container">
        <Segment
          raised
          className="login-dialog"
        >
          <Form className="login-form" >
            <Form.Field>
              <Input placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder='Password'
                type='password' />
            </Form.Field>
            <Button
              color='orange'
              onClick={this.doLogin}
            >
              Login
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}
