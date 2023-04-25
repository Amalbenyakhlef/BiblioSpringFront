import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DevoirService } from 'src/app/services/devoir.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { DevoirComponent } from '../dialog/devoir/devoir.component';
import { LivreService } from 'src/app/services/livre.service';
import { ConfirmationComponent } from '../dialog/view-bill-products/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-devoir',
  templateUrl: './manage-devoir.component.html',
  styleUrls: ['./manage-devoir.component.scss'],
})
export class ManageDevoirComponent implements OnInit {
  displayedColumns: string[] = [
    'date_dev',
    'dispo_correc',
    'matiere',
    'type',
    'session',
    'specialite',
    'edit',
  ];
  dataSource: any;
  responseMessage: any;
  constructor(
    private devoirService: DevoirService,
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
    /*this.devoirService.getAllDevoir().subscribe((data) => {
      console.log(data);})*/
    /* this.dataSource=this.devoirService.data$;
      this.ngxService.stop(); */

    this.devoirService.getAllDevoir().subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        //this.dataSource=response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log('test 1');
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
    const dialogRef = this.dialog.open(DevoirComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddDevoir.subscribe(
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
    const dialogRef = this.dialog.open(DevoirComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditDevoir.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEmpruntAction(values: any) {}

  
  handleDeleteAction(values:any){
    const dialogConfig =new MatDialogConfig();
    dialogConfig.data={
      message:'delete '+values.matiere+ ' Devoir',
      confirmation: true 
    }

    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub= dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
    
  }
  deleteProduct(id: any) {
    this.devoirService.deleteDevoir(id).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage= response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"success");
        //this.dataSource=response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
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
}
