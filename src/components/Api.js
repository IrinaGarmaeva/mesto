export class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
  }

// 1 Загрузка информации о пользователе с сервера
  async getUserData() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
});
    return this._checkResponse(response);
}

  // 2 Загрузка карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
      return this._checkResponse(response);
  };

  // 3. Редактирование профиля
  async editUserData({newName, newAbout}) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    return this._checkResponse(response);
  }

  // 4. Добавление новой карточки
  async addNewCard({newName, newLink}) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": newName,
        "link": newLink
      }),
    })

    return this._checkResponse(response);
  }

  // 5.Отображение количества лайков карточки

  // 6.Попап удаления карточки

  // 7. Удаление карточки

  // 8. Постановка и снятие лайка
  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cardId/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({

      })

    })
    return this._checkResponse(response);
  }

  async deleteLike(cardId){
    const response = await fetch(`${this._baseUrl}/cardId/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({

      })

    })
    return this._checkResponse(response);
  }

  // 9. Обновление аватара пользователя
  async setUserAvatar({link}) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      }),
    })
    return this._checkResponse(response);
  }


}
