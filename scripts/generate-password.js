const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('🔑 Password:', password);
console.log('🔐 Hash:', hash);
console.log('\n📝 Add this to your .env.local:');
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('\n⚠️  Keep this secure! Do not commit to GitHub.');
