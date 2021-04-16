import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})

export class AccountSettingsComponent implements OnInit {

  constructor(private SettingsService: SettingsService) { }

  ngOnInit(): void {
    this.SettingsService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.SettingsService.changeTheme(theme);
  }


}
