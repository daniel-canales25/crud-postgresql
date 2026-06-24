import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly nombre!: string;

  @IsString()
  @MaxLength(100)
  readonly descripcion!: string;

  @IsNumber()
  readonly precio_compra!: number;

  @IsNumber()
  readonly precio_venta!: number;

  @IsNumber()
  readonly stock_actual!: number;
}
