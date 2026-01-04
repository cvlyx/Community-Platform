/**
 * Script to make a user an admin
 * 
 * Usage (from project root):
 * node scripts/make-admin.js your-email@example.com
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeAdmin(email) {
  try {
    if (!email) {
      console.error('❌ Error: Email is required')
      console.log('Usage: node scripts/make-admin.js your-email@example.com')
      process.exit(1)
    }

    console.log(`🔄 Looking for user with email: ${email}`)

    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    console.log('✅ Success! User is now an admin:')
    console.log(JSON.stringify(user, null, 2))
    console.log('\n💡 Please sign out and sign in again to see admin features')
  } catch (error) {
    if (error.code === 'P2025') {
      console.error(`❌ Error: User with email '${email}' not found`)
      console.log('💡 Make sure the user has signed up first')
    } else {
      console.error('❌ Error making user admin:', error.message)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

const email = process.argv[2]
makeAdmin(email)
