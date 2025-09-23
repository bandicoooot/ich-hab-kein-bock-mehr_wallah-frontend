import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Vehicle } from '../models/vehicle.model';
import { PurchaseContract } from '../models/purchase-contract.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // تنظیم پایهٔ URL بک‌اند: اگر backend با HTTPS روی 5001 اجراست از https، در غیر اینصورت http و پورت مناسب
  private baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {}

  // --- Customers ---
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`);
  }
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`);
  }
  createCustomer(c: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, c);
  }
  updateCustomer(id: number, c: Customer): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/${id}`, c);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customers/${id}`);
  }

  // --- Vehicles ---
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/vehicles`);
  }
  getVehicle(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/vehicles/${id}`);
  }
  createVehicle(v: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicles`, v);
  }
  updateVehicle(id: number, v: Vehicle): Observable<any> {
    return this.http.put(`${this.baseUrl}/vehicles/${id}`, v);
  }
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vehicles/${id}`);
  }

  // --- Contracts ---
  getContractsForCustomer(customerId: number): Observable<PurchaseContract[]> {
    return this.http.get<PurchaseContract[]>(`${this.baseUrl}/customers/${customerId}/contracts`);
  }

  // --- Exports (Backend endpoints expected) ---
  exportCustomersCsv(filter?: string): Observable<Blob> {
    const q = filter ? `?q=${encodeURIComponent(filter)}` : '';
    return this.http.get(`${this.baseUrl}/customers/export/csv${q}`, { responseType: 'blob' });
  }

  exportVehicles(format: 'csv'|'json'|'xml' = 'csv'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/vehicles/export?format=${format}`, { responseType: 'blob' });
  }
}
