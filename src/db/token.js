const TOKEN = 'token';

// localStorage에 token 저장하는 것은 보안에 좋지 않음, 공부 후 개선하자
export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}
