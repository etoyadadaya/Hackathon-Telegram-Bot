import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Pass} from "../passes/passes.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  public async findAll() {
    return await this.userRepository.findAll();
  }

  public async findByUid(id: number) {
    return await this.userRepository.findOne({where: {uid: id}, include: [Pass]});
  }

  public async getAllByCity(city: string) {
    return await this.userRepository.findAll({where: {city: city}})
  }

  public async findById(id: number) {
    return await this.userRepository.findOne({where: {id: id}, include: [Pass]});
  }

  public async update(uid: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where: {uid: uid}});

    Object.assign(user, dto);

    return await user.save();
  }

  public async delete(id: number) {
    return await this.userRepository.destroy({where: {uid: id}});
  }
}