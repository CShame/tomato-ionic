import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { QRScannerComponent } from '@components/qr-scanner/qr-scanner';
import { ChatIOService } from '@providers/utils/socket.io.service';
import { GlobalService } from '@providers/global.service';

@IonicPage()
@Component({
  selector: 'cmp-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {
  pullingIcon = false;
  isShowMenuCard = false;
  public rankList: {
    title: string;
    image: string;
    tomatoNum: Number;
    minute: Number;
    rankText: string;
    class: string;
  }[] = [
    {
      title: '加油就有收获！',
      tomatoNum: 11,
      minute: 223,
      image: 'assets/imgs/logo.png',
      rankText: '1st',
      class: 'rank1',
    },
    {
      title: '努力就能成功！',
      tomatoNum: 8,
      minute: 193,
      image: 'assets/tomato-active.png',
      rankText: '2nd',
      class: 'rank2',
    },
    {
      title: '天道酬勤，人道酬信！',
      tomatoNum: 5,
      minute: 123,
      image: 'assets/tomato-active.png',
      rankText: '3rd',
      class: 'rank3',
    },
    {
      title: '抓效率！',
      image: 'assets/tomato-grey.png',
      tomatoNum: 1,
      minute: 23,
      rankText: '',
      class: '',
    },
    {
      title: '我爱番茄帮！',
      image: 'assets/tomato-grey.png',
      tomatoNum: 1,
      minute: 21,
      rankText: '',
      class: '',
    },
  ];

  showType = 'hot';
  isPullToShow = false;
  ionApp: HTMLElement;
  @ViewChild('qrScanner') qrScanner: QRScannerComponent;

  constructor(
    public navCtrl: NavController,
    public chatIO: ChatIOService,
    public globalservice: GlobalService
  ) {}

  /**
   * 跳转至消息页
   */
  toMessagePage() {
    this.navCtrl.push('MessagePage', {}, {}, () => {});
  }

  /**
   * 跳转至搜索页
   */
  ToSearchPage() {
    this.navCtrl.push('SearchPage', {}, {}, () => {});
  }

  /**
   * 扫码加友
   */
  scanToAddFriend() {
    this.qrScanner.open();
  }

  /**
   * 跳转至通讯录
   */
  ToContactsPage() {
    this.navCtrl.push('ContactsPage', {}, {}, () => {});
  }

  /**
   * 扫码回调
   * @param qrCode 二维码内容
   */
  onScanQRCode(qrCode: object) {
    alert('成功扫描到:' + JSON.stringify(qrCode));
    this.navCtrl.push('FriendInfoPage', {
      userid: JSON.stringify(qrCode),
    });
  }

  /**
   * 扫码错误回调
   * @param evt evt info
   */
  onScanQRCodeERR(evt) {
    console.log('扫码错误', evt);
  }

  showRefresher() {
    this.pullingIcon = true;
  }

  showMenuCard() {
    this.isShowMenuCard = true;
    this.pullingIcon = false;
  }

  hideMenuCard() {
    this.isShowMenuCard = false;
    this.pullingIcon = false;
  }
}
