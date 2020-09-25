import { Component, OnInit, COMPILER_OPTIONS, ViewChild,Input,Inject } from '@angular/core';
import{ Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService }from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {commentform}  from '../shared/commentform';
import { Comment } from '../shared/comment';
import { visibility,flyInOut,expand  } from '../animations/app.animation'
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [visibility(),flyInOut(),expand()]
})
export class DishdetailComponent implements OnInit {
    comForm:FormGroup;
    comment:Comment
    dish:Dish;
    visibility='shown';
    
    errMess:string;

    @ViewChild('cform') feedbackFormDirective;
    dishIds:string[];
    prev:string;
    next:string;
    dishcopy:Dish;
    formErrors={
      'author':'',
      'comment':''
    };
    validationMessages={
      'author': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'author cannot be more than 25 characters long.'
      },
      'comment':{
        'required':      'First Name is required.'
      }
    }
    constructor(private dishService :DishService,
      private location:Location,
      private route:ActivatedRoute,
      private fb:FormBuilder,
      @Inject('BaseURL')public BaseURL){
      this.createForm();
    }
  
    ngOnInit(){
     this.dishService.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
      this.route.params.pipe(switchMap((params:Params)=>{ this.visibility='hidden';return this.dishService.getDish(params['id']); } ))
    .subscribe(dish=> {this.dish=dish;this.dishcopy=dish; this.setPrevNext(dish.id);this.visibility='shown';},
    errmess=>this.errMess=<any>errmess);
      
  }
  createForm(){
    this.comForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      rating:'',
      comment:['',[Validators.required]]
    });
    this.comForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    
  }

  onValueChanged(data?:any){
    if(!this.comForm){
      return;
    }
    const form=this.comForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  setPrevNext(dishId:string){
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length];


  }
  goBack():void{
    this.location.back();
  }
  onSubmit(){
    this.comment=this.comForm.value;
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(dish=>{
      this.dish=dish;
      this.dishcopy=dish;
    },errmess=>{this.dish=null;this.dishcopy=null;this.errMess=<any>errmess;})
    console.log(this.comment);
    this.comForm.reset({
      author:'',
      rating:'',
      comment:''
    });
    this.feedbackFormDirective.resetForm();
  }

}