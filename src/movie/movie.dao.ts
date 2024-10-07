import { Injectable } from '@nestjs/common';



@Injectable()
export class MovieDao {
  private cars= [
    { id: '1', name: 'Toyota Corolla', size: 'large', rentalDates: [], pricePerDay: 30 },
    { id: '2', name: 'Honda Civic', size: 'min', rentalDates: [{ pickUpDate: new Date('2024-07-10'), returnDate: new Date('2024-07-15') }], pricePerDay: 40 },
    { id: '3', name: 'Ford Focus', size: 'mid', rentalDates: [], pricePerDay: 50 },
    { id: '4', name: 'Chevrolet Malibu', size: 'min', rentalDates: [], pricePerDay: 35 },
    { id: '5', name: 'Mazda 3', size: 'large', rentalDates: [{ pickUpDate: new Date('2024-07-01'), returnDate: new Date('2024-07-10') }], pricePerDay: 28 },
    { id: '6', name: 'Nissan Altima', size: 'mid', rentalDates: [], pricePerDay: 32 },
    { id: '7', name: 'Hyundai Sonata', size: 'min', rentalDates: [], pricePerDay: 37 },
    { id: '8', name: 'Kia Optima', size: 'mid', rentalDates: [], pricePerDay: 30 },
    { id: '9', name: 'Subaru Impreza', size: 'large', rentalDates: [{ pickUpDate: new Date('2024-07-05'), returnDate: new Date('2024-07-12') }], pricePerDay: 29 },
    { id: '10', name: 'Volkswagen Jetta', size: 'mid', rentalDates: [], pricePerDay: 33 },
  ];
  constructor(
    
  ) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAllMovies() {
    return this.cars;
  }
}
