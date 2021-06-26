import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      // auth가 아닌 query로 token을 전달하면 기록 남아서 보안에 취약
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect_error', (err) => {
      console.log('socket error', err.message);
    });
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event); // 사용자가 연결 끊고 싶을때 사용할 수 있는 콜백
  }
}
