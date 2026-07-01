# Implementar endpoint UPDATE de Product

## Objetivo
- `PATCH /products/:id` → actualizar parcial o totalmente un producto

---

## Entendiendo `UpdateProductDto`

```ts
export class UpdateProductDto extends PartialType(CreateProductDto) {}
```

`PartialType` toma el `CreateProductDto` y convierte **todos sus campos en opcionales** (`?`). Esto permite enviar solo los campos que se quieren actualizar:

```json
// Actualizar solo el precio
{ "precio_venta": 1500 }

// Actualizar todo
{ "nombre": "...", "descripcion": "...", "precio_compra": 800, "precio_venta": 1200, "stock_actual": 5 }
```

---

## Paso 1 — Implementar `update()` en `products.service.ts`

```ts
update(id: string, updateProductDto: UpdateProductDto) {
  const product = this.findOne(id);
  // Si no existe, findOne ya lanza 404 (DRY)

  const updatedProduct = {
    ...product,
    ...updateProductDto,
    update_at: new Date().toISOString(),
  };

  this.products = this.products.map((p) =>
    p.id === id ? updatedProduct : p,
  );

  return updatedProduct;
}
```

### Explicación del código:

1. **Buscar** el producto usando `this.findOne(id)` — reutiliza la lógica de búsqueda y el 404 de `findOne` (principio DRY)
2. **Mergear** el producto existente con los datos nuevos (`...product, ...updateProductDto`)
3. **Actualizar** `update_at` con la fecha actual
4. **Reemplazar** el producto en el array por el actualizado
5. **Retornar** el producto actualizado

---

## Paso 2 — Verificar `products.controller.ts`

Del plan anterior ya debería estar correcto:

```ts
@Patch(':id')
update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  return this.productsService.update(id, updateProductDto);
}
```

Si todavía tiene `+id`, cámbialo a solo `id`.

---

## Paso 3 — `update-product.dto.ts`

No requiere cambios. `PartialType(CreateProductDto)` ya hace todo el trabajo.

---

## Paso 4 — Probar

```bash
# Actualizar parcialmente (solo precio)
curl -X PATCH http://localhost:3000/products/<uuid> \
  -H "Content-Type: application/json" \
  -d '{ "precio_venta": 1500 }'

# Actualizar completamente
curl -X PATCH http://localhost:3000/products/<uuid> \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop Gamer",
    "descripcion": "RTX 4070",
    "precio_compra": 1000,
    "precio_venta": 1500,
    "stock_actual": 8
  }'

# Probar 404 con UUID inexistente
curl -X PATCH http://localhost:3000/products/abc-123 \
  -H "Content-Type: application/json" \
  -d '{ "nombre": "test" }'
```

---

## Resumen de cambios

| Archivo | Cambio |
|---|---|
| `products.service.ts` | Implementar `update()` con merge y 404 |
| `products.controller.ts` | Verificar que `id` sea string (sin `+`) |
| `update-product.dto.ts` | Sin cambios |
