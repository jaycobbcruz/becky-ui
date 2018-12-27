import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextboxGrid from './TextboxGrid'
import Message from './Message'
import $ from 'jquery'
import './styles/chat.css'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '20px'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '95%',
    minHeight: '95vh'
  },
  header: {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #ddd',
    height: '80px',
    paddingTop: '20px'
  },
  messageContainer: {
    height: $(document).height() - 200,
    padding: '10px 20px 10px 10px',
    overflow: 'scroll',
    display: 'block'
  }
});

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    this.messagesEnd = null
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:8080/ws')
    this.connection.onmessage = evt => {
      this.addMessage('Becky', evt.data)
    }
  }

  handleMessageEnter(text) {
    if (text) {
      this.appendUserMessage(text)
    }
  }

  appendUserMessage(text) {
    this.addMessage('You', text)
    this.connection.send(text)
  }

  addMessage(user, text) {
    const message = {
      user: user,
      text: text,
      time: new Date()
    }
    this.setState({
      messages: this.state.messages.concat(message)
    })
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className={classes.paper}>
                <Grid container>
                <Grid item xs={12} className={classes.header}>
                  <Typography variant="h4">Becky!</Typography>
                </Grid>
                <Grid item xs={12} id="messageContainer" className={classes.messageContainer}>
                  {
                    this.state.messages.map((message, i) => (
                      <Message key={i} message={message} />
                    ))
                  }
                  <div ref={(el) => { this.messagesEnd = el; }} style={{height: '10px'}} />
                </Grid>
                <Grid item xs={12}>
                  <TextboxGrid onMessageEnter={(message) => this.handleMessageEnter(message)} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Main)