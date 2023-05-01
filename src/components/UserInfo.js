class UserInfo {
  constructor({userNameSelector, userOccupationSelector, avatarSelector}) {

    this._userName = document.querySelector(userNameSelector); //.profile__name
    this._userOccupation = document.querySelector(userOccupationSelector);//.profile__about
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
    name: this._userName.textContent,
    occupation: this._userOccupation.textContent,
    avatar: this._avatar.src,
  }
  }

  setUserInfo({newUserName, newUserOccupation}) {
    this._userName.textContent = newUserName;
    this._userOccupation.textContent = newUserOccupation;
  }

  setUserAvatar(result) {
    this._avatar.src = result;
  }
}

export { UserInfo };
