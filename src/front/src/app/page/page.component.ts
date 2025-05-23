import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-page',
  imports: [RouterOutlet, NavbarComponent, ChatComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  showChat = signal<boolean>(false);
  toggleChatWindow() {
    this.showChat.update((value) => !value);
  }
}
