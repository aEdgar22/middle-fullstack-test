import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '../domain/entities/product.entity';
import { createProductDto } from '../domain/dtos/create-product.dto';
import { updateProductDto } from '../domain/dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: createProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      // Código de error de Prisma para "unique constraint failed"
      if (error.code === 'P2002') {
        throw new ConflictException('Product with this SKU already exists');
      }
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: updateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Deja que el 404 se propague sin convertirlo en 500
      }

      console.error('Error updating product:', error);
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const product = await this.findOne(id);

      await this.prisma.product.delete({ where: { id: product.id } });
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting product');
    }
  }
}
