# Implementar FIND ALL (con búsqueda) y FIND ONE

## Objetivo
- `GET /products` → lista todos o filtra por `?search=`
- `GET /products/:id` → busca por UUID exacto

---

## Paso 1 — Modificar `products.service.ts`

### 1a. Importar `NotFoundException`

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
```

### 1b. Reemplazar `findAll()`

```ts
findAll(search?: string) {
  if (!search) {
    return this.products;
  }
  const lower = search.toLowerCase();
  return this.products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(lower) ||
      p.descripcion.toLowerCase().includes(lower)
  );
}
```

### 1c. Reemplazar `findOne()`

```ts
findOne(id: string) {
  const product = this.products.find((p) => p.id === id);
  if (!product) {
    throw new NotFoundException(`Producto con id ${id} no encontrado`);
  }
  return product;
}
```

---

## Paso 2 — Modificar `products.controller.ts`

Agregar `@Query` en el import:

```ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
```

Cambiar `findAll()`:

```ts
@Get()
findAll(@Query('search') search?: string) {
  return this.productsService.findAll(search);
}
```

`findOne()` ya debería estar bien del paso anterior (con `id: string` sin `+`).

---

## Paso 3 — Probar

```bash
# Todos los productos
curl http://localhost:3000/products

# Buscar por nombre o descripción
curl "http://localhost:3000/products?search=laptop"

# Buscar por ID (UUID)
curl http://localhost:3000/products/<uuid>
```

---

## Resumen de cambios

| Archivo | Cambio |
|---|---|
| `products.service.ts` | `findAll(search?)` filtra, `findOne()` lanza 404 si no existe |
| `products.controller.ts` | Agregar `@Query('search')` en findAll |
