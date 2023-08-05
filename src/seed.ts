import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed para a tabela 'users'
    await prisma.users.createMany({
      data: [
        {
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password1',
          is_adm: true,
        },
        {
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password2',
          is_adm: false,
        },
      ],
    });

    // Seed para a tabela 'product_control'
    await prisma.product_control.createMany({
      data: [
        {
          user_id: 1,
          using_at: new Date(),
        },
        {
          user_id: 2,
          using_at: new Date(),
          devolution_at: new Date(),
        },
      ],
    });

    // Seed para a tabela 'category'
    await prisma.category.createMany({
      data: [
        {
          name: 'Category 1',
          description: 'Description for Category 1',
        },
        {
          name: 'Category 2',
          description: 'Description for Category 2',
        },
      ],
    });

    // Seed para a tabela 'origin'
    await prisma.origin.createMany({
      data: [
        {
          name: 'Origin 1',
        },
        {
          name: 'Origin 2',
        },
      ],
    });

    // Seed para a tabela 'rooms'
    await prisma.rooms.createMany({
      data: [
        {
          name: 'Room 1',
          identfier_key: 123,
        },
        {
          name: 'Room 2',
          identfier_key: 456,
        },
      ],
    });

    // Seed para a tabela 'products'
    await prisma.products.createMany({
      data: [
        {
          category_id: 1,
          origin_id: 1,
          room_id: 1,
          name: 'Product 1',
          sku: 'SKU001',
        },
        {
          category_id: 2,
          origin_id: 2,
          room_id: 2,
          name: 'Product 2',
          sku: 'SKU002',
        },
      ],
    });

    console.log('Seeds executadas com sucesso!');
  } catch (error) {
    console.error('Erro ao executar as seeds:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
