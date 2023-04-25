import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DevoirService } from 'src/app/services/devoir.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.scss']
})
export class DevoirComponent implements OnInit {

  onAddDevoir=new EventEmitter();
  onEditDevoir=new EventEmitter();
  devoirForm:any=FormGroup;
  date_dev=true;
  dispo_correc=true;
  matiere=true;
  session=true;
  specialite=true;
  type=true;
  dialogAction:any="Add";
  action:any="Add";
  reponseMessage:any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private devoirService:DevoirService,
  public dialogRef:MatDialogRef<DevoirComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.devoirForm=this.formBuilder.group({
      date_dev: [null, [Validators.required]],
      dispo_correc: [null, [Validators.required]],
      matiere: [null, [Validators.required]],
      session: [null, [Validators.required]],
      specialite: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });

    if(this.dialogData.action === "Edit"){
      this.dialogAction= "Edit";
      this.action="Update";
      this.devoirForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if (this.dialogAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }
  add() {
    var formData =this.devoirForm.value;
    var data={
      date_dev: formData.date_dev,
      dispo_correc: formData.dispo_correc,
      matiere: formData.matiere,
      session: formData.session,
      specialite: formData.specialite,
      type: formData.type

    }
    this.devoirService.addDevoir(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddDevoir.emit();
      this.reponseMessage=response?.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"success");
    },(error)=>{
      this.dialogRef.close();
      console.error(error);
      if(error.error?.message){
        this.reponseMessage=error.error?.message; 
      }else{
        this.reponseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error);
    });



  }
  edit() {
    var formData =this.devoirForm.value;
    var data={
      id_devoir:this.dialogData.data.id_devoir,
      dispo_correc: formData.dispo_correc,
      matiere: formData.dispo_correc,
      session: formData.session,
      specialite: formData.specialite,
      type: formData.type

    }
    this.devoirService.updateDevoir(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditDevoir.emit();
      this.reponseMessage=response.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"success");
    },(error)=>{
      this.dialogRef.close();
      console.log(error);
      if(error.error?.message){
        this.reponseMessage=error.error?.message; 
      }else{
        this.reponseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error);
    });
  }

}
