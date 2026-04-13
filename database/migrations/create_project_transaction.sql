-- =========================================
-- Migration: create_project_transaction
-- Creates project with all related records atomically
-- =========================================

CREATE OR REPLACE FUNCTION create_project_transaction(
  p_name TEXT,
  p_category TEXT,
  p_website_url TEXT,
  p_slug TEXT,
  p_user_id UUID,
  p_google_sheet_id TEXT,
  p_google_project_id TEXT,
  p_private_key_id TEXT,
  p_client_email TEXT,
  p_client_id TEXT,
  p_client_x509_cert_url TEXT,
  p_private_key TEXT,
  p_php_code TEXT,
  p_json_code JSON
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_project_id UUID;
  v_structure_id UUID;
  v_credentials_id UUID;
BEGIN
  -- Validate slug uniqueness before inserting
  IF EXISTS (SELECT 1 FROM projects WHERE slug = p_slug) THEN
    RAISE EXCEPTION 'SLUG_CONFLICT: Slug already exists' USING ERRCODE = 'P0001';
  END IF;

  -- Insert project record
  INSERT INTO projects (
    name,
    category,
    website_url,
    slug,
    created_by_user_id,
    owner_user_id,
    status
  )
  VALUES (
    p_name,
    p_category,
    p_website_url,
    p_slug,
    p_user_id,
    p_user_id,
    'active'
  )
  RETURNING id INTO v_project_id;

  -- Insert project owner mapping
  INSERT INTO project_user (
    project_id,
    user_id,
    role
  )
  VALUES (
    v_project_id,
    p_user_id,
    'owner'
  );

  -- Insert Google Sheet credentials
  INSERT INTO google_sheet_credentials (
    project_id,
    google_sheet_id,
    google_project_id,
    private_key_id,
    client_email,
    client_id,
    client_x509_cert_url,
    private_key
  )
  VALUES (
    v_project_id,
    p_google_sheet_id,
    p_google_project_id,
    p_private_key_id,
    p_client_email,
    p_client_id,
    p_client_x509_cert_url,
    p_private_key
  )
  RETURNING id INTO v_credentials_id;

  -- Insert initial structure version v1
  INSERT INTO project_structure_versions (
    project_id,
    version,
    json_code,
    php_code,
    is_current,
    created_by_user_id
  )
  VALUES (
    v_project_id,
    'v1',
    p_json_code,
    p_php_code,
    TRUE,
    p_user_id
  )
  RETURNING id INTO v_structure_id;

  -- Return all created records as JSON
  RETURN (
    SELECT json_build_object(
      'project', (
        SELECT row_to_json(p)
        FROM (
          SELECT id, name, slug, category, website_url, status
          FROM projects
          WHERE id = v_project_id
        ) p
      ),
      'structure', (
        SELECT row_to_json(s)
        FROM (
          SELECT id, version, is_current, json_code, php_code
          FROM project_structure_versions
          WHERE id = v_structure_id
        ) s
      ),
      'google_sheet_credentials', (
        SELECT row_to_json(g)
        FROM (
          SELECT id, google_sheet_id, google_project_id, client_email
          FROM google_sheet_credentials
          WHERE id = v_credentials_id
        ) g
      )
    )
  );
END;
$$;
