import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(search?: string) {
    if (!search) {
      return this.products;
    }
    const lower = search.toLocaleLowerCase();
    return this.products.filter(
      (p) =>
        p.nombre.toLowerCase().includes(lower) ||
        p.descripcion.toLowerCase().includes(lower),
    );
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    const updateProduct = {
      ...product,
      ...updateProductDto,
      update_at: new Date().toISOString(),
      id: id,
    };
    this.products = this.products.map((p) => (p.id === id ? updateProduct : p));
    return updateProduct;
  }

  remove(id: string) {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== product.id);
    return `El producto con id ${id} ha sido borrado con exito`;
  }
}
