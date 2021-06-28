import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      // token을 query를 통해 전달하면 브라우저상에서 token이 보이고, log에도 남아서 보안 상 위험
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
    return () => this.io.off(event); // 끄고 싶을 때 사용
  }
}
