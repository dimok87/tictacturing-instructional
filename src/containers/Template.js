import React, {Component} from 'react'
import NavDrawer from '../components/NavDrawer'
import { Header, Main } from '../styled/Template'
import Relay from 'react-relay/classic'

class Template extends Component {
  render() {
    return (
      <div>
        <NavDrawer />
        <Header>
          TicTacTuring
        </Header>
        <Main>
          {this.props.children}
        </Main>
      </div>
    )
  }
}

export default Relay.createContainer(
  Template, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `,
    }
  }
)
