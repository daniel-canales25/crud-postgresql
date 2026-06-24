import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as UUID } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const newProduct: Product = {
      id: UUID(),
      nombre: createProductDto.nombre,
      descripcion: createProductDto.descripcion,
      precio_compra: createProductDto.precio_compra,
      precio_venta: createProductDto.precio_venta,
      stock_actual: createProductDto.stock_actual,
      create_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
