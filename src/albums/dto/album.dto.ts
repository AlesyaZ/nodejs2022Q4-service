import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  year: number;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
