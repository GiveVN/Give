-- Setup Public API Permissions (Fixed Format)

-- Insert permissions for Projects API
INSERT INTO up_permissions (action, created_at, updated_at, document_id) VALUES
('api::project.project.find', NOW(), NOW(), gen_random_uuid()),
('api::project.project.findOne', NOW(), NOW(), gen_random_uuid()),
('api::project.project.count', NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Tags API  
INSERT INTO up_permissions (action, created_at, updated_at, document_id) VALUES
('api::tag.tag.find', NOW(), NOW(), gen_random_uuid()),
('api::tag.tag.findOne', NOW(), NOW(), gen_random_uuid()),
('api::tag.tag.count', NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Donations API
INSERT INTO up_permissions (action, created_at, updated_at, document_id) VALUES
('api::donation.donation.find', NOW(), NOW(), gen_random_uuid()),
('api::donation.donation.findOne', NOW(), NOW(), gen_random_uuid()),
('api::donation.donation.count', NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Comments API
INSERT INTO up_permissions (action, created_at, updated_at, document_id) VALUES
('api::comment.comment.find', NOW(), NOW(), gen_random_uuid()),
('api::comment.comment.findOne', NOW(), NOW(), gen_random_uuid()),
('api::comment.comment.count', NOW(), NOW(), gen_random_uuid());

-- Insert permissions for Project Updates API
INSERT INTO up_permissions (action, created_at, updated_at, document_id) VALUES
('api::project-update.project-update.find', NOW(), NOW(), gen_random_uuid()),
('api::project-update.project-update.findOne', NOW(), NOW(), gen_random_uuid()),
('api::project-update.project-update.count', NOW(), NOW(), gen_random_uuid()); 