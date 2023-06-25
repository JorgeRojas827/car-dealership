import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private _brands: Brand[] = [
    {
      id: uuid(),
      name: '',
      createdAt: Date.now(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: Date.now(),
    };
    this._brands.push(brand);
    return brand;
  }

  findAll() {
    return this._brands;
  }

  findOne(id: string) {
    const brand = this._brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Could not find item with id ${id}`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this._brands = this._brands.map((brand) => {
      if (brand.id === id) {
        brandDB.updateAt = Date.now();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }
      return brand;
    });
  }

  remove(id: string) {
    this._brands = this._brands.filter((brand) => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Array<Brand>) {
    this._brands = brands;
  }
}
