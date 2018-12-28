import React, {Component} from 'react'
import Button from '@material-ui/core/Button'

class Template extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>TicTacTuring</h1>
          <Button onClick={()=>{console.log("111")}}>
            Click me
          </Button>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Template
