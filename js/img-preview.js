const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.avatar-image');


fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();
  // console.log(file);


  const matches = FILE_TYPES.some((string) => {
    return fileName.endsWith(string);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result; //результат чтения (если оно успешно)
    });

    // reader.addEventListener('error', () => {
    //   previewAvatar.src = reader.error; //объект ошибки (при неудаче).
    // });

    reader.readAsDataURL(file); // считать данные как base64-кодированный URL.
  }
});

const fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
const previewHouse = document.querySelector('.ad-form__photo');


fileChooserHouse.addEventListener('change', () => {
  const file = fileChooserHouse.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((string) => {
    return fileName.endsWith(string);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = document.createElement('img');
      previewHouse.appendChild(image);
      image.src = reader.result; //результат чтения (если оно успешно)
    });

    // reader.addEventListener('error', () => {
    //   previewAvatar.src = reader.error; //объект ошибки (при неудаче).
    // });

    reader.readAsDataURL(file); // считать данные как base64-кодированный URL.
  }
});
