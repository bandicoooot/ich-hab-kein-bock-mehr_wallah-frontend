export interface PurchaseContract {
  contractId?: number;
  customerId: number;
  vehicleId: number;
  purchaseDate: string; // ISO date
  price: number;
}
