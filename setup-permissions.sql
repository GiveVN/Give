-- Setup Public API Permissions for Give Crowdfunding Platform

-- Insert permissions for Projects API
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at, document_id) VALUES
('find', 'api::project.project', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('findOne', 'api::project.project', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('count', 'api::project.project', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Tags API
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at, document_id) VALUES
('find', 'api::tag.tag', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('findOne', 'api::tag.tag', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('count', 'api::tag.tag', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Donations API (read-only for public)
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at, document_id) VALUES
('find', 'api::donation.donation', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('findOne', 'api::donation.donation', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('count', 'api::donation.donation', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Comments API (read-only for public)
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at, document_id) VALUES
('find', 'api::comment.comment', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('findOne', 'api::comment.comment', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('count', 'api::comment.comment', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Project Updates API (read-only for public)
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at, document_id) VALUES
('find', 'api::project-update.project-update', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('findOne', 'api::project-update.project-update', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid()),
('count', 'api::project-update.project-update', '{}', '[]', 4, NOW(), NOW(), gen_random_uuid());

-- Enable Project API permissions for public role
-- First, find the public role ID
SELECT id, name, type FROM up_roles WHERE type = 'public';

-- Insert permissions for Project API
-- Replace :public_role_id with the actual ID from the query above

-- Permission for find (GET /api/projects)
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at)
VALUES (
  'api::project.project.find',
  NULL,
  '{}',
  '[]',
  (SELECT id FROM up_roles WHERE type = 'public'),
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Permission for findOne (GET /api/projects/:id)
INSERT INTO up_permissions (action, subject, properties, conditions, role, created_at, updated_at)
VALUES (
  'api::project.project.findOne',
  NULL,
  '{}',
  '[]',
  (SELECT id FROM up_roles WHERE type = 'public'),
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Verify permissions were created
SELECT p.action, p.subject, r.name as role_name 
FROM up_permissions p 
JOIN up_roles r ON p.role = r.id 
WHERE p.action LIKE '%project%'; 