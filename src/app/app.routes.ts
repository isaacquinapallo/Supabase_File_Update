import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'file-uploader',  // ruta para cargar archivos
    loadComponent: () => import('./file-uploader/file-uploader.page').then(m => m.FileUploaderPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
