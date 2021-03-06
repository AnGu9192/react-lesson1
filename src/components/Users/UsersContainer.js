import React from 'react'
import * as axios from 'axios'
import { connect } from 'react-redux'
import { followAC, setUsersAC, unfollowAC, setCurrentPageAC, setlUsersTotaCountAC  } from '../../redux/users-reducer'
import Users from './Users'
 
class UsersContainer extends React.Component {
    state = {
      users: []
    } 
   
    componentDidMount() {
      
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(res => {
        /*   const users = res.data;
          this.setState({ users }) */
          this.props.setUsers(res.data.items)
          this.props.setTotalUsersCount(res.data.totalCount)
        }) 
           }
           onPageChanged = (pageNumber) => {
            this.props.setCurrentPage(pageNumber);
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(res => {
              this.props.setUsers(res.data.items)
            }) 
          } 
      render(){
     
      return <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    /> 
  
  }
  
      }
let mapStateToProps =(state) =>{
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage

    }
}

let mapDispatchToProps =(dispatch) =>{
    return{
        follow: (userId) =>{
            dispatch(followAC(userId));
        },
        unfollow: (userId) =>{
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) =>{
            dispatch(setUsersAC(users));
        },
        setCurrentPage:(pageNumber) =>{
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount:(totalCount) =>{
            dispatch(setlUsersTotaCountAC(totalCount))
        } 
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UsersContainer)