import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity/car.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<Car | undefined> {
    return this.carsService.findOne(+id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() carData: Partial<Car>): Promise<Car> {
    return this.carsService.create(carData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() carData: Partial<Car>,
  ): Promise<Car | undefined> {
    return this.carsService.update(+id, carData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}
