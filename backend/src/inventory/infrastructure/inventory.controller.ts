import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from '../application/inventory.service';
import { InventoryMovement } from '../domain/entities/inventory-movement.entity';
import { CreateInventoryMovementDto } from '../domain/dtos/create-inventory-movement.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('movements')
  registerMovement(@Body() CreateInventoryMovementDto: CreateInventoryMovementDto): Promise<InventoryMovement> {
    return this.inventoryService.registerMovement(CreateInventoryMovementDto);
  }

  @Get('movements')
  findAll(): Promise<InventoryMovement[]> {
    return this.inventoryService.findAll();
  }
}