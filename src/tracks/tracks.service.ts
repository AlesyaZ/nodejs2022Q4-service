import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from 'src/store/store.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    StoreService.tracks.push(track);

    return await track;
  }

  async getTracks(): Promise<Track[]> {
    return StoreService.tracks;
  }

  async getTrack(id: string): Promise<Track> {
    const track = StoreService.tracks.find((track: Track) => track.id === id);

    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = StoreService.tracks.find((track) => track.id == id);

    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    const trackIndex = StoreService.tracks.findIndex((track) => track.id == id);

    StoreService.tracks.splice(trackIndex, 1, track);

    return track;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
