import { Component, OnInit } from '@angular/core';

// firebase
import { getDatabase, ref, child, get, set } from "firebase/database";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;

  auth = getAuth();

  db = getDatabase();
  constructor(public formBuilder: FormBuilder) {

  }
  ngOnInit() {
    console.log('[ngOnInit]');

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })


    set(ref(this.db, 'users/' + "0000"), {
      username: "atiwat",
      email: "ati_wat@hotmail.com",
    })
      .then(() => {
        // Data saved successfully!
        console.log('Data saved successfully!');

      })
      .catch((error) => {
        // The write failed...
        console.log('error', error);
      });
  }

  // getDate(e) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.signUpForm.get('dob').setValue(date, {
  //     onlyself: true
  //   })
  // }

  get errorControl() {
    return this.signUpForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.signUpForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.signUpForm.value)

      createUserWithEmailAndPassword(this.auth,this.signUpForm.value.email, "123456")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('user', user);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      
    }
  }

}