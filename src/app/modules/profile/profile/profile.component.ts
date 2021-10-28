import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeChangerService } from 'src/app/core/theme-changer/theme-changer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public themeChanger: ThemeChangerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
}
