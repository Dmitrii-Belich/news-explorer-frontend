const currentDate = new Date()
const pastDate = new Date()
pastDate.setDate(pastDate.getDate() - 7)
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

  getSearchedArticles(string) {
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${string}
      &from=${pastDate.getFullYear()}-${pastDate.getMonth() + 1}-${pastDate.getDate()}
      &to=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}
      &sortBy=publishedAt
      &pageSize=100
      &apiKey=62b709e416f041d0ad9491827ef376ed`).then(
      this._defaultCheck
    );
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
