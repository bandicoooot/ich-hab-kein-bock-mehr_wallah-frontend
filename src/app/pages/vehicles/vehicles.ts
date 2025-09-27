import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles.html',
  styleUrls: ['./vehicles.css']
})
export class VehiclesComponent {
  vehicles = [
    { id: 1, brand: 'BMW', type: 'X5', color: 'Black', features: 'Panoramic', status: 'Available' },
    { id: 2, brand: 'Audi', type: 'A6', color: 'White', features: 'Towbar', status: 'Sold' }
  ];
  filteredVehicles = [...this.vehicles];

filterByStatus(event: Event) {
  const status = (event.target as HTMLSelectElement).value;
  this.filteredVehicles = status === 'all'
    ? [...this.vehicles]
    : this.vehicles.filter(v => v.status.toLowerCase() === status.toLowerCase());
}

}
