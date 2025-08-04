// Debug environment variables
console.log('🔍 Debugging environment variables...')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
console.log('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'LOADED' : 'MISSING')
console.log('All NEXT_PUBLIC_ variables:')
Object.keys(process.env)
  .filter(key => key.startsWith('NEXT_PUBLIC_'))
  .forEach(key => {
    console.log(`  ${key}: ${process.env[key] ? 'LOADED' : 'MISSING'}`)
  })
