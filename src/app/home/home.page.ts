import { Component, OnInit } from '@angular/core';
import { supabase } from '../../supabaseClient';
import { Router } from '@angular/router'; // Importa Router para navegación

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToggle,
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonToggle,
  ],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';
  isLogin: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  async submitForm(event: Event) {
    event.preventDefault();
    if (this.isLogin) {
      await this.login();
    } else {
      await this.signup();
    }
  }

  async signup() {
    const { error } = await supabase.auth.signUp({
      email: this.email,
      password: this.password,
    });

    if (error) {
      alert('Error al registrarse: ' + error.message);
    } else {
      alert('Registro exitoso. Revisa tu correo.');
    }
  }

  async login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      alert('Inicio de sesión fallido: ' + error.message);
    } else {
      alert('Inicio de sesión exitoso.');
      // Redirige a la página de carga de archivos
      this.router.navigate(['/file-uploader']);
    }
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert('Sesión cerrada.');
    }
  }
}
