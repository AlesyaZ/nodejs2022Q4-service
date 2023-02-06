import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAlbums(): Promise<Album[]> {
    return await this.albumsService.getAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumsService.getAlbum(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbums(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumsService.removeAlbums(id);
  }
}
