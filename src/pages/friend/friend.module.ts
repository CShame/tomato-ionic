/**
 * Created by hsuanlee on 2017/4/4.
 */
import { NgModule} from '@angular/core';
import { FriendPage} from './friend';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [FriendPage],
    imports: [
        IonicPageModule.forChild(FriendPage),

    ],
})
export class FriendPageModule { }