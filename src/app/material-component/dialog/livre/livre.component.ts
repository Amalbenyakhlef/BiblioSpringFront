import { Component, EventEmitter, OnInit, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LivreService } from 'src/app/services/livre.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent implements OnInit {

  onAddLivre=new EventEmitter();
  onEditLivre=new EventEmitter();
  livreForm:any=FormGroup;
  
  dialogAction:any="Add";
  action:any="Add";
  reponseMessage:any;
  categorys:any=["aventure" , "philosophique" , "romantique" , "horreur", "historique" , "policier" ,"scienceFiction"];


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private livreService:LivreService,
  public dialogRef:MatDialogRef<LivreComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.livreForm=this.formBuilder.group({
      auteur: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categorie: [null, [Validators.required]],
      disponnible: [null, [Validators.required]],
      nb_exemplaire: [null, [Validators.required]],
      titre: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      nb_emprunts: [null, [Validators.required]],
    });

    if(this.dialogData.action === "Edit"){
      this.dialogAction= "Edit";
      this.action="Update";
      this.livreForm.patchValue(this.dialogData.data);
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
    var formData =this.livreForm.value;
    var data={
      
      auteur: formData.auteur,
      categorie: formData.categorie,
      disponnible: formData.disponnible,
      nb_exemplaire: formData.nb_exemplaire,
      titre: formData.titre,
      nb_emprunts: formData.nb_emprunts

    }
    this.livreService.add(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddLivre.emit();
      this.reponseMessage=response.message;
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
    var formData =this.livreForm.value;
    var data={
      id_livre:this.dialogData.data.id_livre,
      auteur: formData.auteur,
      categorie: formData.categorie,
      disponnible: formData.disponnible,
      nb_exemplaire: formData.nb_exemplaire,
      titre: formData.titre,
      nb_emprunts: formData.nb_emprunts

    }
    /*
    this.livreService..subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditLivre.emit();
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
    });*/
  }

}
