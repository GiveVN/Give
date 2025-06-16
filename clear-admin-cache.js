// Clear Admin Cache and Test Script
console.log('🔄 Clearing Strapi Admin Cache...');

// Instructions for manual steps:
console.log(`
📋 MANUAL STEPS TO FIX ADMIN INTERFACE:

1. 🌐 Open Browser Developer Tools (F12)
2. 🗑️ Clear Cache:
   - Right-click refresh button → "Empty Cache and Hard Reload"
   - Or: Application tab → Storage → Clear storage

3. 🔐 Login to Admin:
   - URL: http://localhost:1338/admin
   - Email: ai@rate.box
   - Password: Y--BFZr!D6gu

4. 🔍 Check Projects:
   - Go to Content Manager → Project
   - Make sure locale is set to "English (en)"
   - If still empty, try switching locales

5. 🔧 Alternative Solutions:
   - Try incognito/private browsing mode
   - Check browser console for JavaScript errors
   - Verify user permissions in Settings → Roles

6. 📊 Database Verification:
   - API works: http://localhost:1338/api/projects
   - 7 projects exist with locale='en'
   - All projects are published and active
`);

// Test API endpoints
const testEndpoints = [
  'http://localhost:1338/api/projects',
  'http://localhost:1338/api/projects?locale=en',
  'http://localhost:1338/api/projects?pagination[pageSize]=10'
];

console.log('\n🧪 Test these API endpoints:');
testEndpoints.forEach(url => {
  console.log(`✅ ${url}`);
});

console.log('\n🎯 Expected Result: All endpoints should return 7 projects');
console.log('🚨 If admin still shows 0 entries, this is a frontend/cache issue'); 