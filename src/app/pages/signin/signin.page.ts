import { Component, OnInit } from '@angular/core';

// firebase
import { getDatabase, ref, child, get, set } from 'firebase/database';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SignupPage } from '../signup/signup.page';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  isSubmitted = false;

  auth = getAuth();

  db = getDatabase();
  constructor(
    public formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private router: Router,
    public modalCtrl: ModalController
  ) {}
  ngOnInit() {
    console.log('[ngOnInit]');

    this.signinForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl() {
    return this.signinForm.controls;
  }

  async submitsigninForm() {
    this.isSubmitted = true;
    if (!this.signinForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.signinForm.value);
      await this.loaderService.showLoader();
      signInWithEmailAndPassword(
        this.auth,
        this.signinForm?.value?.email,
        this.signinForm?.value?.password
      )
        .then(async (userCredential: any) => {
          // Signed in
          this.loaderService.hideLoader();
          const user = await userCredential.user;
          console.log('user', user);
          this.router.navigateByUrl('home');
          // ...
        })
        .catch(async (error) => {
          this.loaderService.hideLoader();
          const errorCode = await error.code;
          const errorMessage = error.message;
          this.alertService.presentAlert('เกิดข้อผิดพลาด', errorMessage);

          console.log(
            '[catch] signInWithEmailAndPassword',
            'errorCode => ' + errorCode + ' errorMessage => ' + errorMessage
          );
          // ..
        });
    }
  }

  async onSignup() {
    console.log('[onSignup] navigateByUrl to Signup Pages'); 
    const modal = await this.modalCtrl.create({
      component: SignupPage,
      // componentProps: {
      //   score: this.compare_score,
      //   imgface: this.image,
      //   imgid: this.imagecard,
      // },
    });

    // modal.onDidDismiss().then((data) => {
    //   console.log('data modal ==>', data);
    //   if (data.data !== '') {
    //     this.image = '';
    //     this.imagecard = '';
    //     this.presentAlert('อัพโหลดรูปภาพเรียบร้อย', 'Success');
    //   }
    // });

    return await modal.present(); 
  }
}
