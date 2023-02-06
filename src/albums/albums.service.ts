import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from 'src/store/store.service';
import { Album } from '../core/models/album.model';
import { TracksService } from 'src/tracks/tracks.service';
import { Track } from 'src/core/models/track.model';

@Injectable()
export class AlbumsService {
  constructor(private trackService: TracksService) {}
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

  async removeAlbums(id: string): Promise<void> {
    const album = await this.getAlbum(id);

    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    const tracks = await this.trackService.getTracks();

    tracks.forEach((track: Track) => {
      if (track.albumId === album.id) {
        track.albumId = null;
      }
    });

    StoreService.albums = StoreService.albums.filter(
      (album) => album.id !== id,
    );
  }
}
