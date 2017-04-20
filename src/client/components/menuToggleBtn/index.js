import React from 'react'
import { Button } from 'semantic-ui-react'
import './style.less'

const MenuToggleBtn = (props) => (
  <Button
    circular
    icon='settings'
    onClick={props.onClick}
    id='menu-toggle-btn'
  />
)

export default MenuToggleBtn
