import React, {Component} from 'react'
import {Link} from 'react-router'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles';
import {NavToggleButton} from '../styled/NavDrawer'

const drawerWidth = 250;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
})

class NavDrawer extends Component {
  state = {
    open: true
  }

  toggle = () => {
    this.setState((prevState, props) => {
      return {
        open: !prevState.open
      }
    })
  }

  render() {
    return (
      <div>
        <NavToggleButton
          toggle={this.toggle}
          width={drawerWidth}
          open={this.state.open}
        />
        <Drawer
          variant={'persistent'}
          open={this.state.open}
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
        >
          <div style={{
            height: '200px',
            width: '100%',
            backgroundColor: 'salmon'
          }}>
            LoginContainer
          </div>
          <Divider />
          <Link
            to={'/'}
          >
            <MenuItem onClick={this.toggle}>Play</MenuItem>
          </Link>
          <Link
            to={'/profile'}
          >
            <MenuItem onClick={this.toggle}>Profile</MenuItem>
          </Link>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(NavDrawer);
