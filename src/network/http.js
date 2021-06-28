export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    let data;
    // body가 없는 경우 json 호출시 에러 발생 가능하므로 try...catch
    try {
      data = await res.json();
    } catch (error) {
      // 단 이 경우 body가 없는 것 뿐이지 진짜 에러가 아니므로 출력만 하고 넘어가기
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong';
      const error = new Error(message);
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
