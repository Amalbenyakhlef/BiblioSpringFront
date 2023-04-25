import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
}

const MENUITEMS =[
    {state:'dashboard', name:'Dashboard',type:'link',icon:'dashboard' ,role:''},
    {state:'devoir', name:'Manage Devoirs',type:'link',icon:'category' ,role:'Admin'},
    {state:'livre', name:'Manage Livres',type:'link',icon:'books' ,role:'Admin'},
    {state:'user', name:'Manage Users',type:'link',icon:'people' ,role:'Admin'},
    {state:'livre', name:'Biblio Livre',type:'link',icon:'books' ,role:'User'},
    {state:'devoir', name:'Biblio devoir',type:'link',icon:'category' ,role:'User'},


]

@Injectable()
export class MenuItems{
    getMenuitem():Menu[]{
        return MENUITEMS;
    }
}