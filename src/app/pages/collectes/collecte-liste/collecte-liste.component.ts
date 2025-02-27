import {Component, inject, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {CollecteAddComponent} from "../collecte-add/collecte-add.component";
import {CollecteService} from "../../../core/services/collecte.service";
import {RouterLink} from "@angular/router";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatSort} from "@angular/material/sort";
import {MatIcon} from "@angular/material/icon";
import {CollecteDetailComponent} from "../collecte-detail/collecte-detail.component";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-collecte-liste',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar,
    RouterLink,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatButton,
    MatSort,
    MatIcon,
    MatCard,
  ],
  templateUrl: './collecte-liste.component.html',
  styleUrl: './collecte-liste.component.css'
})
export class CollecteListeComponent implements OnInit{
  collectes: any[] = [];
  displayedColumns: string[] = [
    "nomCompletMedecinReferent",
    'nomCompletPatient',
    'numeroDossier',
    'nomCompletRegistraire',
    'dateOuvertureDossier',
    'action'
  ];

  constructor(private dialog: MatDialog) {}
  _collecteService = inject(CollecteService)

  ngOnInit(): void {
    this.getCollectes()
  }

  getCollectes(){
    this._collecteService.getCollectes().subscribe(data => {
      this.collectes = data;
    });
  }
  add(){
    const dialogRef = this.dialog.open(CollecteAddComponent, {
      width: '1050px',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe({
      next: value => {
        this.getCollectes()
      }
    })
  }

  details(collecte: any){
    const dialogRef = this.dialog.open(CollecteDetailComponent, {
      width: '1050px',
      maxWidth: '95vw',
    });
  }
}
