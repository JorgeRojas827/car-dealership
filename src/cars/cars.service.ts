import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private _cars: Array<Car> = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
  ];

  findAll() {
    return this._cars;
  }

  create(createCarDto: CreateCarDto) {
    const car = { id: uuid(), ...createCarDto };
    this._cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new BadRequestException(`Car ${id} is not a valid value`);
    }

    this._cars = this._cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        };
        return carDb;
      }
      return car;
    });
  }

  delete(id: string) {
    const carDb = this.findOneById(id);

    this._cars = this._cars.filter((car) => car.id !== carDb.id);
  }

  findOneById(id: string) {
    const car = this._cars.find((e) => e.id === id);
    if (!car) {
      throw new NotFoundException(`Cannot find ${id} in ${this._cars}`);
    }
    return car;
  }

  fillCarsWithSeedData(cars: Array<Car>) {
    this._cars = cars;
  }
}
