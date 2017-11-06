/**
 * TODO
 * 1. 微信
 * 3. 手机号
 */

import { Component } from "@angular/core";
import { NavController, IonicPage, ToastController, NavParams } from 'ionic-angular';
import { OnlineUserService, User } from "../../providers/data.service";
import { GlobalService } from "../../providers/global.service";
import { RebirthHttpProvider } from "rebirth-http";
import { JPushService } from '../../_util/jpush.service';


@IonicPage()
@Component({
	selector: "login",
	providers: [OnlineUserService, GlobalService, JPushService],
	templateUrl: "login.html"
})

export class LoginPage {
	user = new User();
	error = "";
	remeberMe = {
		selected: false
	};

	constructor(
		public service: OnlineUserService,
		public globalservice: GlobalService,
		public rebirthProvider: RebirthHttpProvider,
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		public jPushService: JPushService,
		public navParams: NavParams
	) {
		this.user.username = navParams.get("username");
		this.user.password = navParams.get("password");
	}

	ngOnInit() {
		console.log("hello `login` component");
		if (this.globalservice.userinfo) {
			this.user.username = this.globalservice.userinfo.username;
			this.user.password = this.globalservice.userinfo.password;
		}
	}

	public doLogin(): void {
		console.log("doLogin", this.user);

		this.service.login(this.user).subscribe(data => {
			let retOBJ = JSON.parse(data._body);
			let status = retOBJ.status;
			let token = "";
			let userinfo = this.user;
			if (status == "success") {
				token = retOBJ.token;
				userinfo = retOBJ.userinfo;
			} else {
				this.error = "登陆出错！";
				return;
			}
			console.log(data);
			// 这里需要保存 token
			this.globalservice.token = token;
			this.globalservice.userinfo = JSON.stringify(userinfo);
			this.rebirthProvider.headers({ Authorization: token });
			this.jPushService.init(this.user.username);
			this.navCtrl.setRoot("TabsPage",{
				animate:true
			});
			// this.navCtrl.push("TabsPage",{},()=>{
			// });
		});
	}

	public doLogout(): void {
		this.globalservice.token = "";
	}

	public navToRegister(): void {
		// 注册
		this.navCtrl.push("RegisterPage");
	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'top'
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}
}
