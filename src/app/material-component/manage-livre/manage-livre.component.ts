import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from 'src/app/services/livre.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { LivreComponent } from '../dialog/livre/livre.component';

@Component({
  selector: 'app-manage-livre',
  templateUrl: './manage-livre.component.html',
  styleUrls: ['./manage-livre.component.scss'],
})
export class ManageLivreComponent implements OnInit {
  displayedColumns: string[] = [
    'categorie',
    'titre',
    'auteur',
    'nb_exemplaire',
    'nb_emprunts',
    'disponnible',
    'edit',
  ];
  //length1:any;
  dataSource: any;
  responseMessage: any;
  constructor(
    private livreService: LivreService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.livreService.get().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
        //this.dataSource=response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(LivreComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddLivre.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(LivreComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    /*
    const sub = dialogRef.componentInstance.onEditDevoir.subscribe(
      (response) => {
        this.tableData();
      }
    );*/
  }

  handleDeleteAction(values:any){

  }

  onChange(disponnible:any,id_livre:any){

  }

  
}
