import React, { Component } from "react";
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Review from './Review'
import MenuBar from './MenuBar'
import { getListOfRestaurants } from '../../store/modules/restaurants'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex:  this.props.listOfRestaurants && this.props.listOfRestaurants.data && this.props.listOfRestaurants.data[0] && this.props.listOfRestaurants.data[0]._id
    }
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.listOfRestaurants, '======listOfRestaurants======')
  // }

  render() {
    const { classes, listOfRestaurants } = this.props
    const { selectedIndex } = this.state
    console.log(listOfRestaurants)
    return (
      <div>
        <div style={{ padding: '20px 307px 20px 307px' }}> <MenuBar /></div>
        <div style={{
          padding: '20px 307px 20px 307px',
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr',
          gap: '20px'
        }}>

          <div className={classes.root}>
            {listOfRestaurants.data && listOfRestaurants.data.map(item => (
              <List component="nav" aria-label="main mailbox folders">
              <ListItem
                button
                selected={selectedIndex === item._id}
                onClick={(event) => this.handleListItemClick(event, item._id)}
              >
                <ListItemIcon>
                  <RestaurantMenu />
                </ListItemIcon>
                <ListItemText primary={item.restaruntName}/>
                <ListItemIcon>
                  <Tooltip title="Edit" aria-label="Edit"><EditIcon onClick={(e) => alert('cickedEdit')}/></Tooltip>
                  <Tooltip title="Delete" aria-label="Delete"><DeleteIcon onClick={(e) => alert('cickedDelete')}/></Tooltip>
                </ListItemIcon>
              </ListItem>
              </List>
            ))}
            <Divider />
          </div>
          <div><Review reviewsList={listOfRestaurants}/></div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const listOfRestaurants = state.restaurants && state.restaurants.restaurantsList
  console.log(listOfRestaurants)
  return {
    listOfRestaurants
  }
}

export default withStyles(styles)(connect(mapStateToProps, { getListOfRestaurants })(Restaurant));
