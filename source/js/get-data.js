import { showAlert } from './util.js'

function getData() {

  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {

      if (response.ok) {

        return response.json();
      }

      throw new Error(`Ошибка загрузки данных! \n Статус: ${response.status} \n Описание: ${response.statusText} \n Тип: ${response.type}`);
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      showAlert(`${err}`);
      return false;
    });
}

export { getData };

