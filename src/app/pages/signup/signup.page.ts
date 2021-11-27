import { Component, OnInit } from '@angular/core';

// firebase
import { getDatabase, ref, child, get, set } from "firebase/database";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  constructor(public formBuilder: FormBuilder,
    private modalCtrl: ModalController) {

  }
  ngOnInit() {
    console.log('[ngOnInit]');

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // dob: [this.defaultDate],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
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

      createUserWithEmailAndPassword(this.auth,this.signUpForm.value.email, this.signUpForm.value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('user', user);

        set(ref(this.db, `users/${user.uid}`), {
          name: this.signUpForm.value.name,
          email: this.signUpForm.value.email,
          mobile: this.signUpForm.value.mobile,
        })
          .then(() => {
            // Data saved successfully!
            console.log('Data saved successfully!');
            this.modalCtrl.dismiss();
    
          })
          .catch((error) => {
            // The write failed...
            console.log('error', error);
          });
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      
    }
  }

}