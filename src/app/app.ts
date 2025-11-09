import { Component, OnInit, signal } from '@angular/core';
import { TabsComponent } from './ui/tabs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [TabsComponent] 
})
export class App implements OnInit {
  protected readonly title = signal('water-filter');
  
  ngOnInit(): void { 
  }

}