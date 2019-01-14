import React from 'react'
import styled from 'styled-components'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'

const StayVisible = styled.div`
  position: absolute;
  margin-left: ${(props) => (props.open ? `${props.width}px` : 0)};
  transition: margin .2s;
`

export const NavToggleButton = (props) => {
  return (
    <StayVisible {...props}>
      <Fab
        color="primary"
        onClick={props.toggle}>
        <MenuIcon />
      </Fab>
    </StayVisible>
  )
}
