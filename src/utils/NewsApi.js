const currentDate = new Date()
const pastDate = new Date()
pastDate.setDate(pastDate.getDate() - 7)

export default function getSearchedArticles(string) {
  return fetch(`https://nomoreparties.co/news/v2/everything?q=${string}
      &from=${pastDate.getFullYear()}-${pastDate.getMonth() + 1}-${pastDate.getDate()}
      &to=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}
      &sortBy=publishedAt
      &pageSize=100
      &apiKey=62b709e416f041d0ad9491827ef376ed`).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res)
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  );
}
