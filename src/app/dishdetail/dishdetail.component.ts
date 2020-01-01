import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { Comment  } from '../shared/comments';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {



  formErrors = {
    'author': '',
    'comment': '',
  };


  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'comment is required.'
    }
  };


  commentForm: FormGroup;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  dishCopy: Dish;
  @ViewChild('fform') commentFormDirective;
  constructor(private dishService: DishService,
    private location: Location, private route: ActivatedRoute, 
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {

    this.dishService.getDishId().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); },
    errMess => this.errMess = <any>errMess);
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
    this.commentForm = this.fb.group ({
      rating: 5,
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)] ],

    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data: any): void {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
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
  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy).subscribe(dish => {this.dishCopy = dish;
       this.dish = dish; }, errMess => { this.dish = null, this.dishCopy = null;
        this.errMess = <any>errMess; });
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
    this.commentFormDirective.resetForm();
  }

}
