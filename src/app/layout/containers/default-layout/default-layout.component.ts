import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContentComponent, HeaderComponent } from '../../components';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ContentComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {}
