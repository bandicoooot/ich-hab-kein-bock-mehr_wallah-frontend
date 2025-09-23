export type VehicleStatus = 'Available' | 'Reserved' | 'Sold';

export interface Vehicle {
  vehicleId?: number;
  brand: string;
  type: string;
  firstRegistration?: string; // ISO date string
  color?: string;
  features?: string[]; // e.g. ['Towbar','PanoramicRoof']
  status: VehicleStatus;
}
