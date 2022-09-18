import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters} from "@nestjs/common";
import {PassesService} from "./passes.service";
import {CreatePassDto} from "./dto/create-pass.dto";
import {Validation} from "../filters/validation";
import {UpdatePassDto} from "./dto/update-pass.dto";
import {UsersService} from "../users/users.service";

@Controller("passes")
export class PassesController {
  constructor(private passesService: PassesService, private usersService: UsersService) {}

  @Post()
  @UseFilters(new Validation())
  public async create(@Res() res, @Body() passesDto: CreatePassDto) {
    const user = await this.usersService.findByUid(passesDto.userId);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: "404"
      })
    }

    const pass = await this.passesService.createPass({userId: user.id, city: passesDto.city, date: passesDto.date})

    return res.status(HttpStatus.CREATED).json(pass)
  }

  @Get()
  public async index() {
      return this.passesService.findAll()
  }

  @Get(":id")
  public async get(@Res() res, @Param("id") id: number) {
    const pass = await this.passesService.getById(id);
    if (!pass) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: "404"
      })
    }

    return res.status(HttpStatus.OK).json(pass)
  }

  @Get("city/:id")
  public async getByCity(@Res() res, @Param("id") id: number) {
    let city: string;

    if (id == 0) {
      city = "Москва";
    } else if (id == 1) {
      city = "Казань";
    } else if (id == 2) {
      city = "Новосибирск";
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errors: {
          cityId: "Не валидный город"
        },
        code: "400"
      })
    }

    const pass = await this.passesService.getOneByCity(city);
    if (!pass) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: "404"
      })
    }

    return res.status(HttpStatus.OK).json(pass)
  }

  @Put(":id")
  public async update(@Res() res, @Body() passesDto: UpdatePassDto, @Param("id") id: number) {
    const pass = await this.passesService.update(id, passesDto)

    return res.status(HttpStatus.OK).json(pass)
  }

  @Delete(":id")
  public async delete(@Res() res, @Param("id") id: number) {
    await this.passesService.delete((id))
    return res.status(HttpStatus.OK).send()
  }
}