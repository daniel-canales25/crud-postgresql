# Implementar endpoint CREATE de Product (sin BD)

## Objetivo
Hacer que `POST /products` funcione guardando productos en memoria (array), usando UUID como ID.

---

## Paso 1 — Corregir `entities/product.entity.ts`

Agrega `descripcion` que falta y cambia `id` a `string`.

```ts
export class Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  precio_venta: number;
  stock_actual: number;
  create_at: string;
  update_at: string;
}
```

---

## Paso 2 — Corregir `dto/create-product.dto.ts`

**Quitar** los campos que no debe enviar el cliente:
- `id` → lo genera el servicio con UUID
- `create_at` y `update_at` → los asigna el servicio

Debe quedar solo con: `nombre`, `descripcion`, `precio_compra`, `precio_venta`, `stock_actual`

---

## Paso 3 — Implementar `products.service.ts`

### 3a. Agregar imports y estado interno

```ts
import { v4 as uuidv4 } from 'uuid';
import { Product } from './entities/product.entity';

private products: Product[] = [];
```

### 3b. Implementar `create()`

```ts
create(createProductDto: CreateProductDto) {
  const newProduct: Product = {
    id: uuidv4(),
    ...createProductDto,
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  };
  this.products.push(newProduct);
  return newProduct;
}
```

---

## Paso 4 — Ajustar `products.controller.ts`

El `id` ahora es string, no number. Cambiar los `+id` por solo `id`:

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.productsService.findOne(id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  return this.productsService.update(id, updateProductDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.productsService.remove(id);
}
```

---

## Paso 5 — Probar

```bash
# Desde backend/
npm run start:dev
```

En otra terminal:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop",
    "descripcion": "Laptop gaming",
    "precio_compra": 800,
    "precio_venta": 1200,
    "stock_actual": 10
  }'
```

Debería responder con el producto creado incluyendo `id` (UUID), `create_at` y `update_at`.

---

## Resumen de cambios por archivo

| Archivo | Cambio |
|---|---|
| `entities/product.entity.ts` | `id` → `string`, agregar `descripcion` |
| `dto/create-product.dto.ts` | Quitar `id`, `create_at`, `update_at` |
| `products.service.ts` | Agregar import `uuid`, array, lógica en `create()` |
| `products.controller.ts` | `+id` → `id` en todos los métodos |
