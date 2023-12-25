import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne(id as any);
  }

  async create(carData: Partial<Car>): Promise<Car> {
    const car = this.carRepository.create(carData);
    return await this.carRepository.save(car);
  }

  async update(id: number, carData: Partial<Car>): Promise<Car> {
    await this.carRepository.update(id, carData);
    return this.carRepository.findOne(id as any);
  }

  async remove(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
