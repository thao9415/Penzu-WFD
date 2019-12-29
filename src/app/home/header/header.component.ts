import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {Tag} from "../../model/tag";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  returnUrl: string;
  tagList: Tag[];
  info: { name: string; userId: string; authorities: string[]; token: string; username: string };

  constructor(private authService: AuthService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.info = {
      name: this.token.getName(),
      token: this.token.getToken(),
      authorities: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      username: this.token.getUsername()
    };
    console.log(this.info);
    if (this.info.userId) {
      this.getUserByUserId();
    }
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
  }

  logout() {
    this.token.signOut();
    this.router.navigateByUrl(this.returnUrl);
  }

  getUserByUserId() {
    this.userService.getUserById(this.info.userId).subscribe(result => {
      this.user = result;
    }, error => {
      console.log(error);
    });
  }

  reloadPage() {
    window.location.reload();
  }


}
