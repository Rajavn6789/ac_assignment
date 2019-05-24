import React from "react";
import RemoveIcon from "assets/icons/RemoveIcon";
import { imgIdToPicMapping } from "utils/image";
import { arrDifference } from "utils/array";


class Autocomplete extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      acSearchTerm: "",
      allUsers: [],
      listUsers: [],
      selectedUsers: [],
      showList: false,
    }
  }

  componentDidMount(){
    const usersArr = [
      { id: "1", name: "Lisa Harris", username: "lisa_harris", email: "l.harris@example.com", img: 5 },
      { id: "2", name: "Dorothy Tobin", username: "dorothy_tobin", email: "d.tobin@example.com", img: 6 },
      { id: "3",name: "John Reynolds", username: "john_reynolds", email: "j.reynolds@example.com", img: 1 },
      { id: "4",name: "Brandon Price", username: "brendon_price", email: "b.price@example.com", img: 2 },
      { id: "5",name: "Sarah Odell", username: "sarah_odell", email: "s.odell@example.com", img: 5 },
      { id: "6",name: "Jerri Ramirez", username: "jerry_ramirez", email: "j.ramirez@example.com", img: 6 },
    ];

    this.setState({
      allUsers: usersArr,
    });
  }

  handleOnFocus = () => {
    const { selectedUsers, allUsers } = this.state;
    const differenceArr = arrDifference(allUsers, selectedUsers);

    this.setState({
      showList: true,
      listUsers: differenceArr,
    });
  }

  handleOnSearch = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    }, () => {
      this.showMatchingUsersList(this.state.acSearchTerm);
    });
  }

  handleonKeyUp = (e) => {
    if(e.key !== "Backspace" || this.state.acSearchTerm.length > 0)
    return;

    const { listUsers, acSearchTerm } = this.state;

    // Check selected already exits
    const selectedUser = listUsers.find((user) => user.selected);

    let newListUsers;
    if(selectedUser) {
      newListUsers = listUsers.slice(1);
    } else {
      newListUsers = listUsers.map((user, index) => (index === 0) ? {...user, selected: true} : user);
    }

    this.setState({
      showList: true,
      listUsers: newListUsers,
    });
  }

  handleOnSelect = (userId) => {
    const tempState = {...this.state};
    const { listUsers } = tempState;
    const selectedUser = listUsers.find((user) => user.id === userId);
    const filteredUsers = listUsers.filter((user) => user.id !== userId);

    tempState.selectedUsers.push(selectedUser);
    tempState.listUsers = filteredUsers;
    tempState.acSearchTerm = "";
    tempState.showList = false;

    this.setState(tempState);
  }

  handleRemoveSelectedUser = (userId) => {
    const tempState = {...this.state};
    const { selectedUsers } = tempState;
    const matchedUser = selectedUsers.find((user) => user.id === userId);
    const filteredUsers = selectedUsers.filter((user) => user.id !== userId);

    tempState.selectedUsers = filteredUsers;
    tempState.listUsers.push(matchedUser);
    tempState.showList = false;

    this.setState(tempState);
  }

  showMatchingUsersList = (acSearchTerm) => {
    const { selectedUsers, allUsers } = this.state;
    const differenceArr = arrDifference(allUsers, selectedUsers);

    let matchingUsersArr;
    if(acSearchTerm.length > 0) {
      matchingUsersArr = differenceArr.filter((user) => {
        const formattedName = user.name.replace(" ", "").trim().toLowerCase();
        const formatSearchTerm = acSearchTerm.trim().toLowerCase();
        return formattedName.indexOf(acSearchTerm) !== -1;
      });
    } else {
      matchingUsersArr = differenceArr;
    }

    this.setState({
      showList: true,
      listUsers: matchingUsersArr,
    });
  }



  renderSelectedUserChips = () => {
    let chips;
    if (this.state.selectedUsers.length > 0) {
      chips = this.state.selectedUsers.map((user) => {
          return(
            <div key={user.id} role="button" className="ac__chip" tabIndex="0">
              <img src={imgIdToPicMapping(user.img)}/>
              <span>{user.name}</span>
              <RemoveIcon className="remove" onClick={() => this.handleRemoveSelectedUser(user.id)}/>
            </div>
          );
      });
    } else {
      chips = null;
    }
    return chips;
  }

  renderSuggestionList = () => {
    let list;
    if (this.state.listUsers.length > 0 && this.state.showList) {
      const usersList = this.state.listUsers.map((user) => {
          return(
            <li onClick={() => this.handleOnSelect(user.id)} key={user.id} className={((user.selected) ? "selected" : "")}>
              <span className="icon">
                <img src={imgIdToPicMapping(user.img)}/>
              </span>
              <span className="name">
                {user.name}
              </span>
              <span className="email">
                {user.email}
              </span>
            </li>
          );
      });
      list = (
        <div className="ac__listcontainer">
          <ul role="listbox">
            {usersList}
          </ul>
        </div>
      )
    } else {
      list = null;
    }

    return list;
  }

  render() {
    return (
      <div id="combobox">
        <div className="ac__container">
          {this.renderSelectedUserChips()}
          <div className="ac__input">
            <input
              name="acSearchTerm"
              onKeyUp={this.handleonKeyUp}
              onFocus={this.handleOnFocus}
              onChange={this.handleOnSearch}
              type="text"
              value={this.state.acSearchTerm}
            />
            {this.renderSuggestionList()}
          </div>
        </div>
      </div>
    );
  }
}

export default Autocomplete;
