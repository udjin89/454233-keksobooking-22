import { showAlert } from './util.js'

function postData(onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/keksobooking1',
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((err) => {
      showAlert(`${err}`);
    });
};


export { postData };
