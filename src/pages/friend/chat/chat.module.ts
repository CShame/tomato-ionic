import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';
import {ChatService} from "./providers/chat-service";
import {RelativeTime} from "../../../pipes/relative-time";
import {EmojiPickerComponentModule} from "../../../components/emoji-picker/emoji-picker.module";


@NgModule({
  declarations: [
    Chat,
    RelativeTime
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(Chat),
  ],
  exports: [
    Chat
  ],
  providers:[
    ChatService
  ]
})
export class ChatModule {}
