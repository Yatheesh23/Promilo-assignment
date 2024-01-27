import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  name = 'rashmi';
  arr = [{ id: 1, book: "aa", author: 'sdsd' }, { id: 2, book: "aa", author: 'sdsd' }]

}
