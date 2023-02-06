import { Album } from './album.model';
import { Artist } from './artist.model';
import { Favorites } from './favorites.model';
import { Track } from './track.model';
import { User } from './user.model';

export interface Store {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites;
}
