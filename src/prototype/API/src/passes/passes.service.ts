import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Pass} from "./passes.model";
import {CreatePassDto} from "./dto/create-pass.dto";
import {UpdatePassDto} from "./dto/update-pass.dto";

@Injectable()
export class PassesService {
  constructor(@InjectModel(Pass) private passRepository: typeof Pass) {}

  public async createPass(dto: CreatePassDto) {
    return await this.passRepository.create(dto)
  }

  public async findAll() {
    return await this.passRepository.findAll()
  }

  public async getById(id: number) {
    return await this.passRepository.findOne({where: {id: id}})
  }

  public async getOneByCity(city: string) {
    return await this.passRepository.findOne({where: {city: city, status: 0}})
  }

  public async findAllByUserId(id: number) {
    return await this.passRepository.findAll({where: {userId: id}})
  }

  public async update(id: number, dto: UpdatePassDto) {
    const pass = await this.passRepository.findOne({where: {id}})

    const date = new Date(pass.date);

    dto.term = new Date(Date.parse(date.toISOString()) + 86400 * 1000);

    Object.assign(pass, dto)

    return await pass.save()
  }

  public async delete(id: number) {
    return await this.passRepository.destroy({where: {id}})
  }
}