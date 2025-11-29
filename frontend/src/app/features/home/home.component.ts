import { Component, OnInit } from '@angular/core'; 
import { ApiService } from '../../core/services/api.service'; 


export class HomeComponent implements OnInit {
  title = '';
  content = '';
  loading = true;
  
  constructor(private api: ApiService) {}
  
  ngOnInit() {
    this.api.getHome().subscribe((data: any) => {
      this.title = data.Title;
      this.content = data.Content; // HTML из Go
      this.loading = false;
    });
  }
}
