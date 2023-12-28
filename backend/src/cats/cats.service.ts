import {
  ServiceUnavailableException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  private async validateBreed(breed: string) {
    const foundBreed = await this.breedRepository.findOne({
      where: { name: breed },
    });
    if(!foundBreed) throw new NotFoundException('Breed not found');
    return foundBreed;
  }

  async create(cat: CreateCatDto) {
    const breed: Breed = await this.validateBreed(cat.breed);
    const newCat: Cat = this.catRepository.create({
      ...cat,
      breed: breed,
    });
    return this.catRepository.save(newCat);
  }

  async findAll() {
    try {
      return await this.catRepository.find({ relations: ['breed'] });
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException(
        'Error trying to connect with database',
      );
    }
  }

  async findOne(id: number) {
    const foundCat = await this.catRepository.findOne({
      where: { id },
      relations: ['breed'],
    });
    if (!foundCat) throw new NotFoundException('Cat not found');
    return foundCat;
  }

  async update(id: number, updateCat: UpdateCatDto) {
    const breed: Breed = await this.validateBreed(updateCat.breed);
    const foundCat = await this.findOne(id);

    if (!foundCat) throw new NotFoundException('Cat not found');
    return await this.catRepository.update(
      { id },
      {
        ...updateCat,
        breed: updateCat.breed ? breed : foundCat.breed,
      },
    );
  }

  async remove(id: number) {
    const deleteCat = await this.findOne(id);
    if (!deleteCat) throw new NotFoundException('Cat not found');
    return await this.catRepository.delete(deleteCat);
  }
}
