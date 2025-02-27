import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatSort} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatDialogActions, MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-collecte-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    MatToolbar,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './collecte-detail.component.html',
  styleUrl: './collecte-detail.component.css'
})
export class CollecteDetailComponent {


}
