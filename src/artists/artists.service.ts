import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
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

  removeArtists(id: number) {
    return `This action removes a #${id} artist`;
  }
}
