import { Album } from 'src/core/models/album.model';
import { Artist } from 'src/core/models/artist.model';
import { Track } from 'src/core/models/track.model';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor() {
    this.tracks = [];
    this.artists = [];
    this.albums = [];
  }
}
