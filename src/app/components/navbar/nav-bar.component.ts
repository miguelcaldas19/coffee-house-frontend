import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit() { }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
