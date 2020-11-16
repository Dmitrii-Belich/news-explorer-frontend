export default class Api {
  constructor({ baseUrl, headers }, token) {
    this._baseUrl = baseUrl;
    this._headers = headers(token);
    this._defaultCheck = (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res)
      return Promise.reject(`Ошибка: ${res.status}`);

    };
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, { headers: this._headers }).then(
      this._defaultCheck
    );
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._defaultCheck
    );
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(article),
    }).then(this._defaultCheck);
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._defaultCheck);
  }
}
