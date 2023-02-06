import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Album } from './album.model';
import { Artist } from './artist.model';
import { Track } from './track.model';
import { User } from './user.model';

export interface Store {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorite;
}
