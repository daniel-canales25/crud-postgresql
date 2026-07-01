# Estandarizar respuestas del CRUD

## Objetivo
Envolver las respuestas exitosas en un formato estructurado con `statusCode`, `message` y `data`.

---

## Formato final

**Éxito:**
```json
{
  "statusCode": 200,
  "message": "Producto encontrado",
  "data": { "id": "abc", "nombre": "Laptop", ... }
}
```

**Error (ya lo tienes con `HttpException`):**
```json
{
  "message": "Producto con id x no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## Único archivo a modificar: `products.controller.ts`

Cada método debe envolver la respuesta del service con `statusCode` y `message`.

### create (POST)

```ts
@Post()
create(@Body() createProductDto: CreateProductDto) {
  const data = this.productsService.create(createProductDto);
  return {
    statusCode: 201,
    message: 'Producto creado exitosamente',
    data,
  };
}
```

### findAll (GET /products)

```ts
@Get()
findAll(@Query('search') search?: string) {
  const data = this.productsService.findAll(search);
  return {
    statusCode: 200,
    message: 'Productos encontrados',
    data,
  };
}
```

### findOne (GET /products/:id)

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  const data = this.productsService.findOne(id);
  return {
    statusCode: 200,
    message: 'Producto encontrado',
    data,
  };
}
```

### update (PATCH /products/:id)

```ts
@Patch(':id')
update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  const data = this.productsService.update(id, updateProductDto);
  return {
    statusCode: 200,
    message: 'Producto actualizado exitosamente',
    data,
  };
}
```

### remove (DELETE /products/:id)

```ts
@Delete(':id')
remove(@Param('id') id: string) {
  const data = this.productsService.remove(id);
  return {
    statusCode: 200,
    message: 'Producto eliminado exitosamente',
    data,
  };
}
```

---

## Resumen

| Archivo | Cambio |
|---|---|
| `products.controller.ts` | Envolver cada `return` con `{ statusCode, message, data }` |
| `products.service.ts` | Sin cambios |
