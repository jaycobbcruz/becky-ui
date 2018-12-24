import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const containerStyle = {
  backgroundColor: '#f5f5f5',
  borderTop: '1px solid #ddd',
  height: '72px',
  padding: '10px 20px 10px 20px'
}

const chatBoxStyle = {
  width: '80%'
}

class TextboxGrid extends React.Component {

  render () {
    return (
      <Grid item xs={12} style={containerStyle}>
        <TextField variant="filled" placeholder="Type you message here..." style={chatBoxStyle} onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            this.props.onMessageEnter(ev.target.value)
            ev.target.value = ''
            ev.preventDefault()
          }
        }} />
      </Grid>
    )
  }
}

export default TextboxGrid