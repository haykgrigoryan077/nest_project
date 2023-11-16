import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity/car.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car | undefined> {
    return this.carsService.findOne(+id);
  }

  @Post()
  async create(@Body() carData: Partial<Car>): Promise<Car> {
    return this.carsService.create(carData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() carData: Partial<Car>,
  ): Promise<Car | undefined> {
    return this.carsService.update(+id, carData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}
