import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    HttpStatus,
    Request,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.schema';
import { Public } from './constants';
import { IsMineGuard } from './jwt-auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly usersService: AuthService) {}

    @Public()
    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
      return this.usersService.registerUser(createUserDto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginUser(@Body() loginDto: LoginDto):  Promise<{ access_token: string }> {
      return this.usersService.loginUser(loginDto);
    }

    @Patch(':id')
    @UseGuards(IsMineGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateUserDto,
  ): Promise<User> {
    const task = this.usersService.updateUser(id, updateTaskDto);
    return task;
  }
  
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    return this.usersService.getUser(req.user.sub);
  }
  
  @Delete(':id')
  @UseGuards(IsMineGuard)
  async delete(@Param('id') id: string, @Request() req): Promise<any> {
    this.usersService.deleteUser(id);
    req.user = null;
    return "Profile Deleted Succesfully";
  }
}