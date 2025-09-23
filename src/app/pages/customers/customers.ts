import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],   // 👈 اینو اضافه کن

  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent {
  customers = [
    { id: 1, firstName: 'Ali', lastName: 'Rezayi', email: 'ali@test.com', phone: '09120000001', subscribed: true },
    { id: 2, firstName: 'Sara', lastName: 'Ahmadi', email: 'sara@test.com', phone: '09120000002', subscribed: false },
    { id: 3, firstName: 'Mehdi', lastName: 'Lashgari', email: 'mehdi@test.com', phone: '09120000003', subscribed: true }
  ];
}
