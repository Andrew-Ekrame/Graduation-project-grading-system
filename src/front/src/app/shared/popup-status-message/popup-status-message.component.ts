import { NgClass } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-popup-status-message',
  imports: [NgClass],
  templateUrl: './popup-status-message.component.html',
  styleUrl: './popup-status-message.component.css',
})
export class PopupStatusMessageComponent implements OnInit {
  message = input.required<string>();
  status = input.required<boolean>();
  popup = output<boolean>();
  hideMessage() {
    this.popup.emit(false);
  }
  ngOnInit() {
    setTimeout(() => {
      this.hideMessage();
    }, 5000);
  }
}
