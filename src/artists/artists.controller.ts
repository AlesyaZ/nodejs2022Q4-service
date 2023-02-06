import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getArtists(): Promise<Artist[]> {
    return await this.artistsService.getArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistsService.getArtist(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    await this.artistsService.removeArtists(id);
  }
}
