import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { Album } from 'src/core/models/album.model';
import { Track } from 'src/core/models/track.model';
import { Artist } from 'src/core/models/artist.model';

@Injectable()
export class ArtistsService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    StoreService.artists.push(artist);

    return artist;
  }

  async getArtists(): Promise<Artist[]> {
    return await StoreService.artists;
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = StoreService.artists.find(
      (artist: Artist) => artist.id === id,
    );

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    return await artist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.getArtist(id);

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;

    return await artist;
  }

  async removeArtist(id: string) {
    const artist = await this.getArtist(id);

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    const tracks = await this.tracksService.getTracks();
    const albums = await this.albumsService.getAlbums();

    albums.forEach((album: Album) => {
      if (album.artistId === artist.id) {
        album.artistId = null;
      }
    });

    tracks.forEach((track: Track) => {
      if (track.artistId === artist.id) {
        track.artistId = null;
      }
    });

    StoreService.artists = StoreService.artists.filter(
      (artist: Artist) => artist.id !== id,
    );
  }
}
