import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/track.dto';
import { StatusCodes } from 'http-status-codes';
import { Track } from 'src/core/models/track.model';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTracks(): Promise<Track[]> {
    return await this.tracksService.getTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return this.tracksService.getTrack(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.tracksService.removeTrack(id);
  }
}
