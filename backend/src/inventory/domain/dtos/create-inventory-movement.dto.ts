import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateInventoryMovementDto {
  @IsString()
  @IsNotEmpty()
  tipo: 'entrada' | 'salida';

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
