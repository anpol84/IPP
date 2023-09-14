import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactcrud',
  templateUrl: './contactcrud.component.html',
  styleUrls: ['./contactcrud.component.scss']
})
export class ContactcrudComponent {
    ContactArray: any[] = [];
    username: string="";
    currentId = "";
    email:string="";
    telephone: { mobile: string, home: string } = { mobile: "", home: "" };

    constructor(private http: HttpClient){
        this.getAllContacts();
    }

    setDelete(data: any){
      this.http.delete("http://localhost:8080/contacts/" + data._id).subscribe((resultData: any) =>{
        alert("Contact deleted Succesfully");
        this.getAllContacts();
      });
      
    }

    setUpdate(data: any){
      this.username = data.username;
      this.email = data.email;
      this.telephone.mobile = data.telephone.mobile;
      this.telephone.home = data.telephone.home;
      
      this.currentId = data._id;
      

    }

    UpdateRecords(){
      let bodyData = {
        "username": this.username,
        "email": this.email,
        "telephone": this.telephone
      };

      this.http.put("http://localhost:8080/contacts/" + this.currentId, bodyData).subscribe((resultData: any) =>{
        alert("Contact updated Succesfully");
        this.getAllContacts();
      });
      
    }


    getAllContacts() {
      this.http.get("http://localhost:8080/contacts")
      .subscribe((resultData: any) => {
        this.ContactArray = resultData.data;
      });
    }

    save(){
      if (this.currentId == ''){
        this.register();
      }else{
        this.UpdateRecords();
      }
      
    }

    register(){
      let bodyData = {
        "username": this.username,
        "email": this.email,
        "telephone": this.telephone
      };
      this.http.post("http://localhost:8080/contacts/new", bodyData).subscribe((resultData: any) =>{
        alert("Contact added Succesfully");
        this.username="";
        this.email = "";
        this.telephone ={mobile: "", home: ""};
        this.getAllContacts();
      });
      
    }
}

