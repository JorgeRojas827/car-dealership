import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsUUID()
  id: string;
  @IsString()
  @IsOptional()
  brand: string;
  @IsString()
  @IsOptional()
  model: string;
}
