import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-collecte-liste',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar
  ],
  templateUrl: './collecte-liste.component.html',
  styleUrl: './collecte-liste.component.css'
})
export class CollecteListeComponent {

}
