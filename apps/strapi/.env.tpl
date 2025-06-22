HOST=0.0.0.0
PORT={{op://Employee/Give Strapi Env/PORT}}

APP_KEYS={{op://Employee/Give Strapi Env/APP_KEYS}}
API_TOKEN_SALT={{op://Employee/Give Strapi Env/API_TOKEN_SALT}}
ADMIN_JWT_SECRET={{op://Employee/Give Strapi Env/ADMIN_JWT_SECRET}}
JWT_SECRET={{op://Employee/Give Strapi Env/JWT_SECRET}}

APP_URL=http://localhost:{{op://Employee/Give Strapi Env/PORT}}

DATABASE_CLIENT=postgres
DATABASE_HOST={{op://Employee/Give Strapi Env/DATABASE_HOST}}
DATABASE_PORT={{op://Employee/Give Strapi Env/DATABASE_PORT}}
DATABASE_NAME={{op://Employee/Give Strapi Env/DATABASE_NAME}}
DATABASE_USERNAME={{op://Employee/Give Strapi Env/DATABASE_USERNAME}}
DATABASE_PASSWORD={{op://Employee/Give Strapi Env/DATABASE_PASSWORD}}
DATABASE_SSL=false

CLIENT_URL=http://localhost:3003
STRAPI_PREVIEW_ENABLED=true
STRAPI_PREVIEW_SECRET={{op://Employee/Give Strapi Env/STRAPI_PREVIEW_SECRET}} 