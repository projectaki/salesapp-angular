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
  colorGroup: FormGroup;
  constructor(
    public auth: AuthService,
    public themeChanger: ThemeChangerService,
    private fb: FormBuilder
  ) {
    this.colorGroup = this.fb.group({
      primaryColor: ['#c2185c'],
      accentColor: ['#505050'],
    });
  }

  ngOnInit(): void {
    this.setTheme();
  }

  setTheme() {
    this.themeChanger.saveAccentColor(
      this.colorGroup.get('primaryColor')?.value
    );
    this.themeChanger.savePrimaryColor(
      this.colorGroup.get('accentColor')?.value
    );
  }
}
