import { showAlert } from './util.js'

function getData() {

  return fetch('https://22.javascript.pages.academy/keksobooking/data1')
    .then((response) => {
      // console.log(response.status);
      // console.log(response);
      if (response.ok) {
        // console.log(`Статус: ${response.status} и ${response.statusText}`);
        return response.json();
      }

      throw new Error(`Ошибка загрузки данных! \n Статус: ${response.status} \n Описание: ${response.statusText} \n Тип: ${response.type}`);
    })
    .then((json) => {
      // console.log('Результат', json);
      return json;
    })
    .catch((err) => {
      showAlert(`${err}`);
      return false;
    });
}

export { getData };

