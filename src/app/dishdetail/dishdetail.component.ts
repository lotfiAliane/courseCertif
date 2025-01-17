import { Component, OnInit, Input,Inject } from '@angular/core';
import { Dish } from '../shared/dish.model';
import { Params, ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment.model';
import { visibility,expand,flyInOut } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    expand(),
    visibility(),
    flyInOut(),
    
  ]
})
export class DishdetailComponent implements OnInit {
 
    dishIds:string[];
    dish: Dish;
    prev: string;
    next: string;
    commentForm: FormGroup;
    comment:Comment;
    dishErrMess:string; 
    dishCopy:Dish;
    visibility = 'shown';
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': ' Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
    
  };
    constructor(@Inject('BaseURL') public BaseURL, private fb: FormBuilder,private dishservice: DishService, private route: ActivatedRoute,private location: Location) {

      this.createForm();
     }

  ngOnInit(): void {

    this.dishservice.getDishIds().subscribe(
      dishes => this.dishIds= dishes
      );
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(
      dish => { this.dish = dish; this.dishCopy=dish; this.setPrevNext(dish.id); },
      errmess => this.dishErrMess = <any>errmess);
    //this.dishservice.getDish(id).subscribe(dish => this.dish=dish);
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }



  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: ['5', Validators.required],
      comment: ['', Validators.required],
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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


  onSubmit()
  {
    if (!this.commentForm) { return; }
    const start = new Date();
    
    this.comment=this.commentForm.value;
   
    this.comment.date=start.toISOString();
    //this.dish.comments.push(this.comment);
    this.dishCopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy).subscribe(
      dish=> {this.dishCopy=dish; this.dish=dish;},
      errMsg=> this.dishErrMess=errMsg
    );
    this.commentForm.reset({rating:5});
  }
}
