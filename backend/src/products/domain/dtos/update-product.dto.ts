import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class updateProductDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  sku: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  precio: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock: number;
}
