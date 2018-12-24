import React from 'react'
import Moment from 'react-moment'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import './styles/chat.css'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

function Message(props) {

  const { classes } = props

  return (
    <Grid container className="chatbox-entry-container">
      <Grid item xs={2}>
        <Grid container justify="center">
          <Avatar alt={ props.user } src="/images/avatar.png" className={classes.avatar} />
        </Grid>
      </Grid>
      <Grid item xs={9} className="bubble-left">
        <Grid container>
          <Typography variant="subtitle2">You</Typography>
          &nbsp;
          <Typography variant="body1"><Moment date={props.date} format="DD MMM YYYY HH:mm"/></Typography>
        </Grid>
        <Grid container>
          { props.message.text }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Message)