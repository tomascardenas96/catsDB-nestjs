import { Injectable } from '@nestjs/common';
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
    // @InjectRepository(Breed) private readonly breedRepository: Repository<Breed>
  ) {}

  // private validateBreed(breed: string) {
  //   const foundBreed = this.breedRepository.findOne({where: {}})
  // }

  async create(cat: CreateCatDto) {
    // const newCat = this.catRepository.create(cat)
    return;
  }

  async findAll() {
    return this.catRepository.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
