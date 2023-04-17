class UserInfo {
  constructor({userNameSelector, userOccupationSelector}) {

    this._userName = document.querySelector(userNameSelector); //.profile__name
    this._userOccupation = document.querySelector(userOccupationSelector);//.profile__about
  }

  getUserInfo() {

    let data = new Object();
    data = {
    name: this._userName.textContent,
    occupation: this._userOccupation.textContent,
  }
    return data;
  }

    setUserInfo({newUserName, newUserOccupation}) {
    this._userName.textContent = newUserName;
    this._userOccupation.textContent = newUserOccupation;
    console.log(newUserName);
  }
}

export { UserInfo };
