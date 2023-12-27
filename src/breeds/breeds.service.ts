import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(breed: CreateBreedDto) {
    try {
      const newBreed: Breed = this.breedRepository.create(breed);
      return this.breedRepository.save(newBreed);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return this.breedRepository.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    const foundBreed = await this.breedRepository.findOneBy({ id });
    if (!foundBreed) {
      throw new NotFoundException('Breed not found');
    }
    return foundBreed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    const foundBreed = await this.breedRepository.findOneBy({ id });
    if (!foundBreed) throw new NotFoundException('Breed not found');

    return this.breedRepository.update(id, updateBreedDto);
  }

  async remove(id: number) {
    const foundBreed = await this.findOne(id);
    if (!foundBreed) throw new NotFoundException('Breed not found');
    return this.breedRepository.delete(foundBreed);
  }
}
