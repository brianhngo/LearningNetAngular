import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact.model';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private http = inject(HttpClient);
  contacts$: Observable<Contact[]> = this.getContacts();

  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(''),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false),
  });

  public SubmitFormHandler() {
    console.log('hi');
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite,
    };
    const data = this.http
      .post<Contact>('http://localhost:5141/api/Contacts', addContactRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        },
      });
  }

  private getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:5141/api/Contacts');
  }
}
