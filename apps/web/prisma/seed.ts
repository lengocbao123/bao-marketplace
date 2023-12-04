import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'baole@prisma.io' },
    update: {},
    create: {
      email: 'baole@prisma.io',
      username: 'baole',
      status: 'verify_email',
      bannerUrl: '',
      avatarUrl: '',
      avatar: '',
      lastName: 'Bao',
      firstName: 'Le',
    },
  });
  await prisma.category.createMany({
    data: [
      {
        name: 'Art',
        code: 'art',
        logoImage: '',
        featured_image: '',
        banner_image: '',
        status: 'listed',
      },
      {
        name: 'Gaming',
        code: 'gaming',
        logoImage: '',
        featured_image: '',
        banner_image: '',
        status: 'listed',
      },
      {
        name: 'Memberships',
        code: 'memberships',
        logoImage: '',
        featured_image: '',
        banner_image: '',
        status: 'listed',
      },
      {
        name: 'Music',
        code: 'music',
        logoImage: '',
        featured_image: '',
        banner_image: '',
        status: 'listed',
      },
      {
        name: 'Photography',
        code: 'photography',
        logoImage: '',
        featured_image: '',
        banner_image: '',
        status: 'listed',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
