import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  HashLocationStrategy,
  Location,
  LocationStrategy,
} from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes),
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
}).catch(err => console.error(err));
