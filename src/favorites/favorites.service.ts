import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from 'src/core/models/album.model';
import { Artist } from 'src/core/models/artist.model';
import { Track } from 'src/core/models/track.model';
import { StoreService } from 'src/store/store.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  async getAll(): Promise<Favorite> {
    const albumsFavs = StoreService.favorites.albums;
    const artistsFavs = StoreService.favorites.artists;
    const tracksFavs = StoreService.favorites.tracks;

    const favorites = new Favorite();
    StoreService.favorites.albums = [];
    StoreService.favorites.artists = [];
    StoreService.favorites.tracks = [];

    artistsFavs.forEach((id) => {
      const artist = StoreService.artists.find((artist) => artist === id);
      favorites.artists.push(artist);
    });
    albumsFavs.forEach((id) => {
      const album = StoreService.albums.find((album) => album === id);
      favorites.albums.push(album);
    });
    tracksFavs.forEach((id) => {
      const track = StoreService.tracks.find((track) => track === id);
      favorites.tracks.push(track);
    });

    return favorites;
  }

  async addTrack(id: string): Promise<Track> {
    const track = StoreService.tracks.find((track) => track.id == id);

    if (!track) {
      throw new HttpException(
        'Not found track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    StoreService.favorites.tracks.push(track);

    return track;
  }

  async deleteTrack(id: string) {
    const trackIndex = StoreService.favorites.tracks.findIndex(
      (track) => track.id == id,
    );

    if (trackIndex === -1) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    StoreService.favorites.tracks.splice(trackIndex, 1);
  }

  async addAlbum(id: string): Promise<Album> {
    const albom = StoreService.albums.find((album) => album.id == id);

    if (!albom) {
      throw new HttpException(
        'Not found album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    StoreService.favorites.albums.push(albom);

    return albom;
  }

  async dleteAlbum(id: string) {
    const albomIndex = StoreService.favorites.albums.findIndex(
      (album) => album.id == id,
    );

    if (albomIndex === -1) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    StoreService.favorites.albums.splice(albomIndex, 1);
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = StoreService.artists.find((artist) => artist.id == id);

    if (!artist) {
      throw new HttpException(
        'Not found artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    StoreService.favorites.artists.push(artist);

    return artist;
  }

  async deleteArtist(id: string) {
    const artistIndex = StoreService.favorites.artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex === -1) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    StoreService.favorites.artists.splice(artistIndex, 1);
  }
}
