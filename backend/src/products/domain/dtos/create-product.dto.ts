import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  precio: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  stock: number;
}
