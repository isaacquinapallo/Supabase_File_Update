import { Component, OnInit } from '@angular/core';
import { supabase } from '../../supabaseClient';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-file-uploader-page',
  templateUrl: './file-uploader.page.html',
  styleUrls: ['./file-uploader.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class FileUploaderPage implements OnInit {
  publicUrls: string[] = [];

  constructor() {}

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('Debe iniciar sesión para cargar archivos.');
      return;
    }

    // Listar archivos en la carpeta del usuario (ruta = uid/)
    const { data, error } = await supabase.storage.from('archivos').list(user.id);

    if (error) {
      alert('Error al cargar archivos: ' + error.message);
      return;
    }

    if (data) {
      this.publicUrls = data
        .filter((item) => !!item.name)
        .map((item) =>
          supabase.storage.from('archivos').getPublicUrl(`${user.id}/${item.name}`).data.publicUrl
        );
    }
  }

  async uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      alert('No se seleccionó ningún archivo.');
      return;
    }

    const file = input.files[0];

    // Obtener el usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('Debe iniciar sesión para subir archivos.');
      return;
    }

    // Subir archivo en carpeta del usuario (ruta = uid/)
    const filePath = `${user.id}/${file.name}`;

    const { data, error } = await supabase.storage
      .from('archivos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      alert('Error al subir archivo: ' + error.message);
    } else {
      alert('Archivo subido exitosamente');
      this.loadFiles();
    }
  }
}
