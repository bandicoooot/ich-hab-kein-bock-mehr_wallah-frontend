import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent {
  allVehicles: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  filterBrand = '';
  filterStatus = '';
  search = '';

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.api.getVehicles().subscribe(list => {
      this.allVehicles = list;
      this.applyFilters();
    }, (err: any)  => {
      console.error('Could not load vehicles from API, fallback to mock data.', err);
      // fallback mock (optional)
      this.allVehicles = [
        { vehicleId: 1, brand: 'BMW', type: 'X5', color: 'Black', features: ['Towbar'], status: 'Available' },
        { vehicleId: 2, brand: 'Audi', type: 'A4', color: 'White', features: ['PanoramicRoof'], status: 'Reserved' },
      ];
      this.applyFilters();
    });
  }

  applyFilters() {
    this.vehicles = this.allVehicles.filter(v => {
      if (this.filterBrand && !v.brand.toLowerCase().includes(this.filterBrand.toLowerCase())) return false;
      if (this.filterStatus && v.status !== this.filterStatus) return false;
      if (this.search) {
        const s = this.search.toLowerCase();
        if (!([v.brand, v.type, v.color].some(x => (x || '').toLowerCase().includes(s)))) return false;
      }
      return true;
    });
  }

  clearFilters() {
    this.filterBrand = '';
    this.filterStatus = '';
    this.search = '';
    this.applyFilters();
  }

  exportCsv() {
    const rows = [
      ['VehicleId','Brand','Type','FirstRegistration','Color','Features','Status'],
      ...this.vehicles.map(v => [
        v.vehicleId ?? '',
        v.brand ?? '',
        v.type ?? '',
        v.firstRegistration ?? '',
        v.color ?? '',
        (v.features || []).join(';'),
        v.status ?? ''
      ])
    ];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vehicles.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
