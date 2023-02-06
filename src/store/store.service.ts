import { Store } from 'src/core/models/store.model';
import { Favorite } from 'src/favorites/entities/favorite.entity';

export const StoreService: Store = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: new Favorite(),
};
