import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed para a tabela 'users'
    await prisma.users.createMany({
      data: [
        {
          name: 'Roberto Eilisan',
          email: 'roberto@gmail.com',
          password: 'senha123',
          is_adm: true,
        },
        {
          name: 'Henrique Cursino',
          email: 'henrique@gail.com',
          password: 'senha123',
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
          name: 'Eletrônicos',
          description: 'Computados',
        },
        {
          name: 'Limpeza',
          description: 'Papel higiênico',
        },
        {
          name: 'Utensilios de cozinha',
          description: 'Colher, Pratos e Copos',
        },
      ],
    });

    // Seed para a tabela 'origin'
    await prisma.origin.createMany({
      data: [
        {
          name: 'Ongs',
        },
        {
          name: 'Doações',
        },
      ],
    });

    // Seed para a tabela 'rooms'
    await prisma.rooms.createMany({
      data: [
        {
          name: 'Sala 1',
          identfier_key: 123,
        },
        {
          name: 'Sala 2',
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
