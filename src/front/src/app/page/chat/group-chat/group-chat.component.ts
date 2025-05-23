import { Component, input } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  imports: [],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.css',
})
export class GroupChatComponent {
  selectedGroupChat = input.required<number>();
}
