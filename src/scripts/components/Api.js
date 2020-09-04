/**
 * @module Api
 * @description  Класс Api<br>
 * Отвечает за отправку запросов на сервер и проверку полученных ответов
 * @param {Object} Object - принимает в конструктор объект { URLs, headers, token } 
 * @param {Object} Object.URLs  - объект, содержащий адреса для отправки запросов
 * @param {String} Object.URLs.baseURL - базовый URL сервера
 * @param {String} Object.URLs.cardsURL - URL для получения/добавления карточек
 * @param {String} Object.URLs.userURL - URLдля получения/добавления данных пользователя
 * @param {String} Object.URLs.likesURL - URL для получения/добавления информации о "лайках"
 * @param {String} Object.URLs.avatarURL - URL для получения/добавления ссылки на аватар
 * @param {Object} Object.headers - объект, содержащий заголовки запросов
 * @param {String} Object.headers.authorization - код авторизации (токен)
 * @param {String} Object.token  - токен для доступа на сервер
 * @example
 * const api = new Api({
 * URLs: {
 *   baseURL: 'https://mesto...',
 *   cardsURL: 'https://mesto.../cards/',
 *   userURL: 'https://mesto.../users/me',
 *   likesURL: 'https://mesto.../cards/likes/',
 *   avatarURL: 'https://mesto.../users/me/avatar'
 * },
 * headers: {
 *   "authorization": '<Ваш код авторизации>'
 * },
 * token: '<Ваш токен>'
 * });
 */
export default class Api {
  constructor({ URLs, headers, token }) {
    this._baseURL = URLs.baseURL;
    this._cardsURL = URLs.cardsURL;
    this._userURL = URLs.userURL;
    this._likesURL = URLs.likesURL;
    this._avatarURL = URLs.avatarURL;
    this._headers = headers;
    this._token = token;
  }

  /**
   * @description  Публичный метод<br>
   * Загружает с сервера данные пользователя
   * @public
   * @returns {Promise} - возвращает промис с данными пользователя
   * 
   */
  loadUserData() {
    //Отправляется запрос на получение данных пользователя
    return fetch(this._userURL, {
        headers: {
          authorization: this._token
        },
      })
      //Полученный промис передается в обработчик then, где проверяется статус ответа сервера
      .then(res => {
        //Если ответ положительный (сервер удачно отправил ответ),
        // применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description  Публичный метод<br>
   * Загружает элементы с сервера
   * @public
   * @returns {Promise} - возвращает промис с данными элементов, сохраненных на сервере
   * 
   */
  loadCards() {
    //Отправляется запрос на получение данных имеющихся на сервере элементов
    return fetch(this._cardsURL, {
        headers: {
          authorization: this._token
        }
      })
      //Полученный промис передается в обработчик then, где проверяется статус ответа сервера
      .then(res => {
        //Если ответ положительный (сервер удачно отправил ответ),
        // применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description Публичный метод<br>
   * Сохраняет на сервер элемент, добавленный через Форму добавления нового элемента<br>
   * Принимает аргументом объект item
   * @public
   * @param {Object} item  - объект с параметрами элемента
   * @param {String} item.name - название элемента из инпута Формы добавления нового элемента
   * @param {String} item.link - ссылка на изображение элемента из инпута Формы добавления нового элемента
   * @returns {Promise} - возвращает промис, содержащий данные нового элемента, полученные от сервера
   * @example
   * api.addNewCard({name: <название элемента>, link: <ссылка на изображение элемента>})
   */
  addNewCard(item) {
    //Отправляется запрос на добавление элемента
    return fetch(this._cardsURL, {
        //метод отправки запроса POST
        method: 'POST',
        headers: {
          authorization: this._token,
          //тип контента
          'Content-Type': 'application/json'
        },
        //заголовок body - содержит данные нового элемента, полученные из Формы добавления нового элемента
        //метод JSON.stringify переводит данные в строковый формат для отправки по протоколу HTTP
        body: JSON.stringify({
          name: item.name,
          link: item.link,
        })
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),
        // применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject((`Ошибка: ${res.status}`));
      });
  }

  /**
   * @description Публичный метод<br>
   * Удаляет элемент с сервера<br>
   * Принимает аргументом id удаляемого элемента
   * @public
   * @param {String} cardId  - id удаляемого элемента
   * @returns {Promise} - возвращает промис с сообщением об успешном удалении элемента
   */
  deleteCard(cardId) {
    //Отправляется запрос на удаление элемента
    return fetch(`${this._cardsURL}${cardId}`, {
        //метод отправки запроса DELETE
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),
        // применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description Публичный метод<br>
   * Редактирует данные в профиле пользователя на сервере<br>
   * Принимает арументом объект с новыми данными пользователя, веденными через Форму редактирования профиля
   * @public
   * @param {Object} Object  - { name, job } - объект с новыми данными пользователя
   * @param {String} Object.name - новое имя пользователя, введенное в Форму редактирования профиля
   * @param {String} Object.job - новое описание пользователя, введенное в Форму редактирования профиля
   * @returns {Promise} - возвращает промис, содержащий новые данные пользователя, сохраненные на сервере
   * @example
   * api.editProfile({ 
   *   name: <новое имя пользователя, введенное в инпут Формы редактирования профиля>, 
   *   job: <новое описание пользователя, введенное в инпут Формы редактирования профиля >
   * });
   */
  editProfile({ name, job }) {
    //Отправляется запрос на редактирование данных пользователя
    return fetch(`${this._userURL}`, {
        //метод запроса PATCH
        method: 'PATCH',
        headers: {
          authorization: this._token,
          //тип контента
          'Content-Type': 'application/json'
        },
        //заголовок body - содержит новые данные пользователя, полученные из Формы редактирования профиля
        //метод JSON.stringify переводит данные в строковый формат для отправки по протоколу HTTP
        body: JSON.stringify({
          name: name,
          about: job
        })
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),
        // применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description Публичный метод<br>
   * Загружает на сервер данные о нажатии кнопи "лайк" на элементе<br>
   * Принимает аргументом id элемента, на котором произошло нажатие "лайка" 
   * @public
   * @param {String} id - id элемента, на котором произошло нажатие "лайка"
   * @returns {Promise} - возвращает промис, содержащий новые данные пользователя, сохраненные на сервере
   */
  loadLike(id) {
    //Отправляется запрос на сохранение данных о "лайке"
    return fetch(`${this._likesURL}${id}`, {
        //метод запроса PUT
        method: 'PUT',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),<br>
        //применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description Публичный метод<br>
   * Удаляет с сервера данные о "лайке" на элементе<br>
   * Принимает аргументом id элемента, на котором произошло нажатие "лайка" 
   * @public
   * @param {String} id - id элемента, на котором произошло нажатие "лайка"
   * @returns {Promise} - возвращает промис, содержащий новые данные пользователя, сохраненные на сервере
   */
  deleteLike(id) {
    return fetch(`${this._likesURL}${id}`, {
        //метод запроса DELETE
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),<br>
        //применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  /**
   * @description Публичный метод<br>
   * Сохраняет на сервер новую ссылку на аватар пользователя<br>
   * Принимает аргументом ссылку на новый аватар пользователя, полученную из Формы редактирования аватара
   * @public
   * @param {String} avatar - новая ссылка на аватар пользователя, полученная из Формы редактирования аватара
   * @returns {Promise} - возвращает промис, содержащий новые данные пользователя, сохраненные на сервере
   */
  editAvatar(avatar) {
    return fetch(`${this._avatarURL}`, {
        //метод запроса PATCH
        method: 'PATCH',
        headers: {
          authorization: this._token,
          //тип контента
          'Content-Type': 'application/json'
        },
        //заголовок body - содержит новую ссылку на аватар пользователя, полученную из Формы редактирования аватара
        //метод JSON.stringify переводит данные в строковый формат для отправки по протоколу HTTP
        body: JSON.stringify({
          avatar: avatar,
        })
      })
      .then((res) => {
        //Если ответ положительный (сервер удачно отправил ответ),<br>
        //применяем метод .json(), который вернет новый промис с данными ответа
        if (res.ok) {
          return res.json();
        }
        //Если сервер прислал ошибку - отклоняем промис и передаем ошибку в обработчик
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}