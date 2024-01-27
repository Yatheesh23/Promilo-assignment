import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() searchInputValue = new EventEmitter<string>();

  constructor(private router: Router) { }
  getInput(e: any) {
    if (e.key === 'Enter') {
      const inputValue = e.target.value;
      console.log("eee", inputValue);
      this.searchInputValue.emit(inputValue);
    }
  }
  signout() {
    this.router.navigate(['/']);
    localStorage.clear()

  }

}
