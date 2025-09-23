export interface Customer {
  customerId?: number;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  newsletterSubscribed?: boolean;
}
