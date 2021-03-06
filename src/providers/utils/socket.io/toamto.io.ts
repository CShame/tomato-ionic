import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalService } from '@providers/global.service';
import { tomatoSocketUrl } from '../../../config';
import { Tomato } from '../../data/tomato';
import { Socket } from 'ng-socket-io';

@Injectable()
export class TomatoIOService {
  socket: Socket;
  hasConnected = false;
  userid;
  constructor(public g: GlobalService) {}

  /**
   * 断线重连
   */
  reconnect() {
    this.reconnect();
    setTimeout(() => {
      if (!this.hasConnected) {
        this.socket.connect();
      }
    }, 5000);
  }

  /**
   * 第一次，用于加载当前tomato
   */
  load_tomato(userid: string) {
    this.userid = userid;
    if (!this.socket) {
      this.socket = new Socket({
        url: tomatoSocketUrl,
        options: {
          query: 'token=' + this.g.token,
        },
      });
      this.socket.on('connect', () => {
        this.hasConnected = true;
        if (this.userid) {
          this.load_tomato(this.userid);
        }
      });

      this.socket.on('disconnect', () => {
        this.hasConnected = false;
        this.reconnect();
      });
      this.socket.on('verify_failed', () => {
      });
    }
    this.socket.emit('load_tomato', { userid, endname: 'ionic' });
  }

  /**
   * 登出
   */
  logout(userid: string) {
    this.socket.emit('logout', { userid, endname: 'ionic' });
  }

  load_tomato_succeed() {
    return this.socket.fromEvent<any>('load_tomato_succeed').map(data => data);
  }

  /**
   * 其它终端中断番茄钟
   */
  other_end_break_tomato() {
    return this.socket
      .fromEvent<any>('other_end_break_tomato')
      .map(data => data);
  }
  /**
   * 中断番茄钟
   */
  break_tomato(userid: string, tomato: Tomato) {
    this.socket.emit('break_tomato', {
      userid,
      endname: 'ionic',
      tomato,
    });
  }

  /**
   * 中断番茄钟
   */
  break_tomato_succeed() {
    this.socket.fromEvent<any>('break_tomato_succeed').map(data => data);
  }

  /**
   * 其它终端开启番茄钟
   */
  other_end_start_tomato() {
    return this.socket
      .fromEvent<any>('other_end_start_tomato')
      .map(data => data);
  }

  /**
   * 开启番茄钟
   */
  start_tomato(userid: string, tomato: Tomato, countdown: Number) {
    this.socket.emit('start_tomato', {
      userid,
      endname: 'ionic',
      tomato,
      countdown,
    });
  }

  /**
   * 开启番茄钟成功
   */
  start_tomato_succeed(tomato: Tomato) {
    this.socket.emit('start_tomato_succeed', tomato);
  }

  /**
   *
   */
  new_tomate_added() {
    return this.socket.fromEvent<any>('new_tomate_added').map(data => data);
  }
}
