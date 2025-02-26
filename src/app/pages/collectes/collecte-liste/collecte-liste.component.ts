import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CollecteAddComponent} from "../collecte-add/collecte-add.component";

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

  constructor(
    private dialog: MatDialog
  ) {
  }

  add(){
    const dialogRef = this.dialog.open(CollecteAddComponent, {
      width: '850px',
      maxWidth: '95vw',
    });
  }
}
