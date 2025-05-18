import { Controller, Get } from '@nestjs/common';
import { CategoryEnum } from 'src/enums/category.enum';

@Controller('categories')
export class CategoryController {
  @Get('')
  async listCategories(): Promise<string[]> {
    return Object.values(CategoryEnum);
  }
}
