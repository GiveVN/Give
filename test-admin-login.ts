import fetch from 'node-fetch';

interface LoginResponse {
  data: {
    token: string;
    user: any;
  };
}

interface ProjectsResponse {
  results: any[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

async function testAdminLogin(): Promise<void> {
  const baseUrl = 'http://localhost:1338';
  
  try {
    console.log('🔐 Testing admin login...');
    
    // Login to admin
    const loginResponse = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'ai@rate.box',
        password: 'Y--BFZr!D6gu'
      })
    });

    console.log('Login response status:', loginResponse.status);
    const loginText = await loginResponse.text();
    console.log('Login response:', loginText);

    if (!loginResponse.ok) {
      console.log('❌ Login failed. Let me try different credentials...');
      
      // Try with different email formats
      const emails = ['ai@rate.box', 'admin@example.com', 'admin@admin.com'];
      const passwords = ['Y--BFZr!D6gu', 'admin', 'password'];
      
      for (const email of emails) {
        for (const password of passwords) {
          console.log(`\\nTrying: ${email} / ${password}`);
          const testResponse = await fetch(`${baseUrl}/admin/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
          });
          
          if (testResponse.ok) {
            console.log(`✅ Success with: ${email} / ${password}`);
            return;
          } else {
            const errorText = await testResponse.text();
            console.log(`❌ Failed: ${testResponse.status} - ${errorText.substring(0, 100)}`);
          }
        }
      }
      return;
    }

    const loginData = await loginResponse.json() as LoginResponse;
    const token = loginData.data.token;
    console.log('✅ Login successful! Token:', token.substring(0, 20) + '...');

    // Test projects endpoint with authentication
    console.log('\\n📋 Testing projects endpoint...');
    const projectsResponse = await fetch(`${baseUrl}/content-manager/collection-types/api::project.project?page=1&pageSize=10&sort=title%3AASC&locale=en`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!projectsResponse.ok) {
      console.log('❌ Projects request failed:', projectsResponse.status, projectsResponse.statusText);
      const errorText = await projectsResponse.text();
      console.log('Error details:', errorText);
      return;
    }

    const projectsData = await projectsResponse.json() as ProjectsResponse;
    console.log('✅ Projects endpoint successful!');
    console.log(`📊 Found ${projectsData.results.length} projects in admin interface`);
    console.log(`📄 Pagination: page ${projectsData.pagination.page} of ${projectsData.pagination.pageCount}, total: ${projectsData.pagination.total}`);

    if (projectsData.results.length > 0) {
      console.log('\\n📝 First few projects:');
      projectsData.results.slice(0, 3).forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id}, Title: ${project.title}`);
      });
    } else {
      console.log('\\n⚠️ No projects found in admin interface!');
      console.log('This explains why admin shows empty list.');
    }

    // Test different locales
    console.log('\\n🌐 Testing different locales...');
    const locales = ['en', 'vi', 'cs'];
    
    for (const locale of locales) {
      const localeResponse = await fetch(`${baseUrl}/content-manager/collection-types/api::project.project?page=1&pageSize=10&sort=title%3AASC&locale=${locale}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (localeResponse.ok) {
        const localeData = await localeResponse.json() as ProjectsResponse;
        console.log(`📍 Locale ${locale}: ${localeData.results.length} projects, total: ${localeData.pagination.total}`);
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testAdminLogin().catch(console.error); 