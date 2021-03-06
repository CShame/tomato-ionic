import {
  Component,
  OnInit,
  ViewChild,
  QueryList,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from '@angular/common/http';

import { IonicPage, Scroll, NavController } from 'ionic-angular';
import { PinyinService } from '@providers/utils/pinyin.service';
import { Friendinfo } from './providers/contact-friendinfo.model';
import { GlobalService } from '@providers/global.service';
import { CacheService } from '@providers/cache.service';
import { ChatIOService } from '@providers/utils/socket.io.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'cmp-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: Scroll;
  private navChars: QueryList<HTMLLinkElement>;
  userid;
  friendlist = [];
  newFriendList = [];
  friendOnlineState = {};

  stickerChar = '';

  constructor(
    private pinyinUtil: PinyinService,
    private http: HttpClient,
    public navCtrl: NavController,
    private el: ElementRef,
    public globalService: GlobalService,
    public cache: CacheService,
    public chatIO: ChatIOService
  ) {}

  ngOnInit() {
    this.getAgreedUserFriend();

    const event$ = fromEvent(
      this.myScrollContainer._scrollContent.nativeElement,
      'scroll'
    ).pipe(
      debounceTime(100),
      distinctUntilChanged()
    );

    event$.subscribe(event => {
      if (this.navChars) {
        const ctSrollTop = this.myScrollContainer._scrollContent.nativeElement
          .scrollTop;
        let target = this.navChars[0];
        this.navChars.forEach(element => {
          if (element.offsetTop - ctSrollTop <= 0) {
            target = element;
          }
          this.stickerChar = target.textContent;
          console.log(element.textContent, element.offsetTop);
        });
      }
    });
  }

  /**
   * 获取好友列表
   */
  getAgreedUserFriend() {
    this.cache.getFriendList().subscribe(data => {
      this.friendlist = data;
      this.getSortedFriendlist();
      this.loadOnlineFriendList();
    });
  }

  OnNavcScroll(evt) {
    const element = <HTMLElement>(
      this.myScrollContainer._scrollContent.nativeElement
    );
    element.scrollTop = evt;
  }

  /**
   * 加载在线好友列表
   */
  loadOnlineFriendList() {
    const userid = this.globalService.userinfo._id;
    this.chatIO.load_online_friend_list(userid);

    this.chatIO.load_online_friend_list_succeed().subscribe(data => {
      let fid = '';
      const friendlist = data.friendlist;
      for (const end of friendlist) {
        if (end.length > 10) {
          fid = end;
        }
        // 好友在线
        if (end === '1') {
          this.friendOnlineState[fid] = true;
        }
      }
      console.log('load_online_friend_list_succeed', friendlist);
    });

    this.chatIO.fail().subscribe(err => {
      console.error(err);
    });
  }

  /**
   * 导航至好友详情页
   * @param userid 好友编号
   * @param friendname 好友名称
   */
  toFriendInfo(userid, friendname) {
    this.navCtrl.push('FriendInfoPage', {
      userid: userid,
      friendname: friendname,
    });
  }

  mock() {
    this.getFriendlist()
      .then(res => {
        this.friendlist = res;
        this.getSortedFriendlist();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFriendlist(): Promise<Friendinfo[]> {
    const msgListUrl = './assets/mock/contacts.json';

    return this.http
      .get(msgListUrl)
      .toPromise()
      .then(response => {
        const res: any = response;
        return res.data as Friendinfo[];
      })
      .catch(err => Promise.reject(err || 'err'));
  }

  getSortedFriendlist() {
    if (this.friendlist instanceof Array && this.friendlist.length > 0) {
      this.newFriendList = this.pinyinUtil.sortByFirstCode(
        this.friendlist,
        'name'
      );

      setTimeout(() => {
        this.navChars = this.el.nativeElement.querySelectorAll(
          'a.contact-nav-char'
        );
        if (this.navChars.length > 0) {
          this.stickerChar = this.navChars[0].textContent;
        }
      });
    }
  }
}
