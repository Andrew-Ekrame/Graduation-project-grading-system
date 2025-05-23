import { Component, output, signal } from '@angular/core';
import { GroupChatComponent } from './group-chat/group-chat.component';

@Component({
  selector: 'app-chat',
  imports: [GroupChatComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  closeChat = output();
  selectGroupChat = signal<number>(0);
  openedChat = signal<boolean>(false);
  closeChatWindow() {
    this.closeChat.emit();
  }
  openGroupChat(groupId: number) {
    this.selectGroupChat.update((value) => groupId);
    this.openedChat.update((value) => true);
  }
  closeGroupChat() {
    this.openedChat.update((value) => false);
  }
}
