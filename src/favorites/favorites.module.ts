import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TracksModule, AlbumsModule, ArtistsModule],
})
export class FavoritesModule {}
