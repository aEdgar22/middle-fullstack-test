import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  cantidadRestante: number;

  

  @IsDate()
  fechaRegistro: Date;
}
