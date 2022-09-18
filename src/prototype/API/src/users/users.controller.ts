import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Validation} from "../filters/validation";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PassesService} from "../passes/passes.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService, private passesService: PassesService) {}

  @Post()
  @UseFilters(new Validation())
  public async create(@Res() res, @Body() userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto);

    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get("/pass/:id")
  public async getPasses(@Res() res, @Param("id") id: number) {
    const user = await this.usersService.findByUid(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: "404"
      })
    }

    const passes = await this.passesService.findAllByUserId(user.id);
    if (!passes) {
      res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: "404"
      })
    }

    return res.status(HttpStatus.OK).json(passes)
  }

  @Get()
  public async index(@Res() res) {
    const users = await this.usersService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get(":id")
  public async get(@Res() res, @Param("id") id: number) {
    const user = await this.usersService.findByUid(id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: 404
      });
    }

    return res.status(HttpStatus.OK).json(user);
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

    const user = await this.usersService.getAllByCity(city);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: 404
      });
    }

    return res.status(HttpStatus.OK).json(user);
  }

  @Get("id/:id")
  public async getByID(@Res() res, @Param("id") id: number) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Не найдено",
        code: 404
      });
    }

    return res.status(HttpStatus.OK).json(user);
  }

  @Put(":id")
  public async update(@Body() userDto: UpdateUserDto, @Param("id") id: number, @Res() res) {
    const user = await this.usersService.update(id, userDto);
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(":id")
  public async delete(@Param("id") id: number, @Res() res) {
    await this.usersService.delete(id);
    return res.status(HttpStatus.OK).send();
  }
}