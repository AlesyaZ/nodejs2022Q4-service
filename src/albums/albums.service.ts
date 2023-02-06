import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from 'src/store/store.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    StoreService.albums.push(album);

    return album;
  }

  async getAlbums(): Promise<Album[]> {
    return await StoreService.albums;
  }

  async getAlbum(id: string): Promise<Album> {
    const album = StoreService.albums.find((album: Album) => album.id === id);

    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    return await album;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.getAlbum(id);

    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    album.artistId = updateAlbumDto.artistId;
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;

    return await album;
  }
  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
