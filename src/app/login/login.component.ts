import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user={username:'' ,password:'' ,remember:false};
  constructor( public dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log('User:',this.user);
    this.dialogRef.close();
  }

}
