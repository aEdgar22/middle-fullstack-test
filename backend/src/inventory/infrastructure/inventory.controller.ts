import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from '../application/inventory.service';
import { InventoryMovement } from '../domain/entities/inventory-movement.entity';
import { CreateInventoryMovementDto } from '../domain/dtos/create-inventory-movement.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('movements')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registerMovement(
    @Body() createInventoryMovementDto: CreateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    return this.inventoryService.registerMovement(createInventoryMovementDto);
  }

  @Get('movements')
  async findAll(): Promise<InventoryMovement[]> {
    return this.inventoryService.findAll();
  }
}
