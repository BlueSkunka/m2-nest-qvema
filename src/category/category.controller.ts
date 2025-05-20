import { Controller, Get, Param } from '@nestjs/common';
import { CategoryEnum } from 'src/enums/category.enum';

@Controller('interests')
export class CategoryController {
  @Get('')
  async listCategories(): Promise<string[]> {
    return Object.values(CategoryEnum);
  }
}
