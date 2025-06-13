--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_permissions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.admin_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    action_parameters jsonb,
    subject character varying(255),
    properties jsonb,
    conditions jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_permissions OWNER TO "JOY";

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.admin_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_permissions_id_seq OWNER TO "JOY";

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.admin_permissions_id_seq OWNED BY public.admin_permissions.id;


--
-- Name: admin_permissions_role_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.admin_permissions_role_lnk (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_ord double precision
);


ALTER TABLE public.admin_permissions_role_lnk OWNER TO "JOY";

--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.admin_permissions_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_permissions_role_lnk_id_seq OWNER TO "JOY";

--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.admin_permissions_role_lnk_id_seq OWNED BY public.admin_permissions_role_lnk.id;


--
-- Name: admin_roles; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.admin_roles (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    code character varying(255),
    description character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_roles OWNER TO "JOY";

--
-- Name: admin_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.admin_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_roles_id_seq OWNER TO "JOY";

--
-- Name: admin_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.admin_roles_id_seq OWNED BY public.admin_roles.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    document_id character varying(255),
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    registration_token character varying(255),
    is_active boolean,
    blocked boolean,
    prefered_language character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_users OWNER TO "JOY";

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_id_seq OWNER TO "JOY";

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: admin_users_roles_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.admin_users_roles_lnk (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    role_ord double precision,
    user_ord double precision
);


ALTER TABLE public.admin_users_roles_lnk OWNER TO "JOY";

--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.admin_users_roles_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_roles_lnk_id_seq OWNER TO "JOY";

--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.admin_users_roles_lnk_id_seq OWNED BY public.admin_users_roles_lnk.id;


--
-- Name: components_elements_footer_items; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_elements_footer_items (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.components_elements_footer_items OWNER TO "JOY";

--
-- Name: components_elements_footer_items_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_elements_footer_items_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_elements_footer_items_cmps OWNER TO "JOY";

--
-- Name: components_elements_footer_items_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_elements_footer_items_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_elements_footer_items_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_elements_footer_items_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_elements_footer_items_cmps_id_seq OWNED BY public.components_elements_footer_items_cmps.id;


--
-- Name: components_elements_footer_items_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_elements_footer_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_elements_footer_items_id_seq OWNER TO "JOY";

--
-- Name: components_elements_footer_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_elements_footer_items_id_seq OWNED BY public.components_elements_footer_items.id;


--
-- Name: components_forms_contact_forms; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_forms_contact_forms (
    id integer NOT NULL,
    title character varying(255),
    description text
);


ALTER TABLE public.components_forms_contact_forms OWNER TO "JOY";

--
-- Name: components_forms_contact_forms_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_forms_contact_forms_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_forms_contact_forms_cmps OWNER TO "JOY";

--
-- Name: components_forms_contact_forms_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_forms_contact_forms_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_forms_contact_forms_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_forms_contact_forms_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_forms_contact_forms_cmps_id_seq OWNED BY public.components_forms_contact_forms_cmps.id;


--
-- Name: components_forms_contact_forms_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_forms_contact_forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_forms_contact_forms_id_seq OWNER TO "JOY";

--
-- Name: components_forms_contact_forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_forms_contact_forms_id_seq OWNED BY public.components_forms_contact_forms.id;


--
-- Name: components_forms_newsletter_forms; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_forms_newsletter_forms (
    id integer NOT NULL,
    title character varying(255),
    description text
);


ALTER TABLE public.components_forms_newsletter_forms OWNER TO "JOY";

--
-- Name: components_forms_newsletter_forms_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_forms_newsletter_forms_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_forms_newsletter_forms_cmps OWNER TO "JOY";

--
-- Name: components_forms_newsletter_forms_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_forms_newsletter_forms_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_forms_newsletter_forms_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_forms_newsletter_forms_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_forms_newsletter_forms_cmps_id_seq OWNED BY public.components_forms_newsletter_forms_cmps.id;


--
-- Name: components_forms_newsletter_forms_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_forms_newsletter_forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_forms_newsletter_forms_id_seq OWNER TO "JOY";

--
-- Name: components_forms_newsletter_forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_forms_newsletter_forms_id_seq OWNED BY public.components_forms_newsletter_forms.id;


--
-- Name: components_sections_animated_logo_rows; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_animated_logo_rows (
    id integer NOT NULL,
    text character varying(255)
);


ALTER TABLE public.components_sections_animated_logo_rows OWNER TO "JOY";

--
-- Name: components_sections_animated_logo_rows_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_animated_logo_rows_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_animated_logo_rows_cmps OWNER TO "JOY";

--
-- Name: components_sections_animated_logo_rows_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_animated_logo_rows_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_animated_logo_rows_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_animated_logo_rows_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_animated_logo_rows_cmps_id_seq OWNED BY public.components_sections_animated_logo_rows_cmps.id;


--
-- Name: components_sections_animated_logo_rows_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_animated_logo_rows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_animated_logo_rows_id_seq OWNER TO "JOY";

--
-- Name: components_sections_animated_logo_rows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_animated_logo_rows_id_seq OWNED BY public.components_sections_animated_logo_rows.id;


--
-- Name: components_sections_carousels; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_carousels (
    id integer NOT NULL,
    radius character varying(255)
);


ALTER TABLE public.components_sections_carousels OWNER TO "JOY";

--
-- Name: components_sections_carousels_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_carousels_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_carousels_cmps OWNER TO "JOY";

--
-- Name: components_sections_carousels_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_carousels_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_carousels_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_carousels_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_carousels_cmps_id_seq OWNED BY public.components_sections_carousels_cmps.id;


--
-- Name: components_sections_carousels_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_carousels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_carousels_id_seq OWNER TO "JOY";

--
-- Name: components_sections_carousels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_carousels_id_seq OWNED BY public.components_sections_carousels.id;


--
-- Name: components_sections_faqs; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_faqs (
    id integer NOT NULL,
    title character varying(255),
    sub_title character varying(255)
);


ALTER TABLE public.components_sections_faqs OWNER TO "JOY";

--
-- Name: components_sections_faqs_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_faqs_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_faqs_cmps OWNER TO "JOY";

--
-- Name: components_sections_faqs_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_faqs_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_faqs_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_faqs_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_faqs_cmps_id_seq OWNED BY public.components_sections_faqs_cmps.id;


--
-- Name: components_sections_faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_faqs_id_seq OWNER TO "JOY";

--
-- Name: components_sections_faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_faqs_id_seq OWNED BY public.components_sections_faqs.id;


--
-- Name: components_sections_heading_with_cta_buttons; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_heading_with_cta_buttons (
    id integer NOT NULL,
    title character varying(255),
    sub_text character varying(255)
);


ALTER TABLE public.components_sections_heading_with_cta_buttons OWNER TO "JOY";

--
-- Name: components_sections_heading_with_cta_buttons_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_heading_with_cta_buttons_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_heading_with_cta_buttons_cmps OWNER TO "JOY";

--
-- Name: components_sections_heading_with_cta_buttons_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_heading_with_cta_buttons_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_heading_with_cta_buttons_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_heading_with_cta_buttons_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_heading_with_cta_buttons_cmps_id_seq OWNED BY public.components_sections_heading_with_cta_buttons_cmps.id;


--
-- Name: components_sections_heading_with_cta_buttons_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_heading_with_cta_buttons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_heading_with_cta_buttons_id_seq OWNER TO "JOY";

--
-- Name: components_sections_heading_with_cta_buttons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_heading_with_cta_buttons_id_seq OWNED BY public.components_sections_heading_with_cta_buttons.id;


--
-- Name: components_sections_heroes; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_heroes (
    id integer NOT NULL,
    title character varying(255),
    sub_title character varying(255),
    bg_color character varying(255)
);


ALTER TABLE public.components_sections_heroes OWNER TO "JOY";

--
-- Name: components_sections_heroes_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_heroes_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_heroes_cmps OWNER TO "JOY";

--
-- Name: components_sections_heroes_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_heroes_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_heroes_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_heroes_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_heroes_cmps_id_seq OWNED BY public.components_sections_heroes_cmps.id;


--
-- Name: components_sections_heroes_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_heroes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_heroes_id_seq OWNER TO "JOY";

--
-- Name: components_sections_heroes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_heroes_id_seq OWNED BY public.components_sections_heroes.id;


--
-- Name: components_sections_horizontal_images; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_horizontal_images (
    id integer NOT NULL,
    title character varying(255),
    spacing integer,
    image_radius character varying(255),
    fixed_image_height integer,
    fixed_image_width integer
);


ALTER TABLE public.components_sections_horizontal_images OWNER TO "JOY";

--
-- Name: components_sections_horizontal_images_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_horizontal_images_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_horizontal_images_cmps OWNER TO "JOY";

--
-- Name: components_sections_horizontal_images_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_horizontal_images_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_horizontal_images_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_horizontal_images_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_horizontal_images_cmps_id_seq OWNED BY public.components_sections_horizontal_images_cmps.id;


--
-- Name: components_sections_horizontal_images_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_horizontal_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_horizontal_images_id_seq OWNER TO "JOY";

--
-- Name: components_sections_horizontal_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_horizontal_images_id_seq OWNED BY public.components_sections_horizontal_images.id;


--
-- Name: components_sections_image_with_cta_buttons; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_image_with_cta_buttons (
    id integer NOT NULL,
    title character varying(255),
    sub_text character varying(255)
);


ALTER TABLE public.components_sections_image_with_cta_buttons OWNER TO "JOY";

--
-- Name: components_sections_image_with_cta_buttons_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_sections_image_with_cta_buttons_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_sections_image_with_cta_buttons_cmps OWNER TO "JOY";

--
-- Name: components_sections_image_with_cta_buttons_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_image_with_cta_buttons_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_image_with_cta_buttons_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_sections_image_with_cta_buttons_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_image_with_cta_buttons_cmps_id_seq OWNED BY public.components_sections_image_with_cta_buttons_cmps.id;


--
-- Name: components_sections_image_with_cta_buttons_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_sections_image_with_cta_buttons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_sections_image_with_cta_buttons_id_seq OWNER TO "JOY";

--
-- Name: components_sections_image_with_cta_buttons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_sections_image_with_cta_buttons_id_seq OWNED BY public.components_sections_image_with_cta_buttons.id;


--
-- Name: components_seo_utilities_meta_socials; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_meta_socials (
    id integer NOT NULL,
    social_network character varying(255),
    title character varying(255),
    description character varying(255)
);


ALTER TABLE public.components_seo_utilities_meta_socials OWNER TO "JOY";

--
-- Name: components_seo_utilities_meta_socials_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_meta_socials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_meta_socials_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_meta_socials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_meta_socials_id_seq OWNED BY public.components_seo_utilities_meta_socials.id;


--
-- Name: components_seo_utilities_seo_ogs; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_seo_ogs (
    id integer NOT NULL,
    title character varying(255),
    description character varying(255),
    url character varying(255),
    type character varying(255)
);


ALTER TABLE public.components_seo_utilities_seo_ogs OWNER TO "JOY";

--
-- Name: components_seo_utilities_seo_ogs_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_seo_ogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_seo_ogs_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_seo_ogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_seo_ogs_id_seq OWNED BY public.components_seo_utilities_seo_ogs.id;


--
-- Name: components_seo_utilities_seo_twitters; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_seo_twitters (
    id integer NOT NULL,
    card character varying(255),
    title character varying(255),
    description character varying(255),
    site_id character varying(255),
    creator character varying(255),
    creator_id character varying(255)
);


ALTER TABLE public.components_seo_utilities_seo_twitters OWNER TO "JOY";

--
-- Name: components_seo_utilities_seo_twitters_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_seo_twitters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_seo_twitters_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_seo_twitters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_seo_twitters_id_seq OWNED BY public.components_seo_utilities_seo_twitters.id;


--
-- Name: components_seo_utilities_seos; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_seos (
    id integer NOT NULL,
    meta_title character varying(255),
    meta_description character varying(255),
    keywords text,
    application_name character varying(255),
    site_name character varying(255),
    email character varying(255),
    canonical_url character varying(255),
    meta_robots character varying(255),
    structured_data jsonb
);


ALTER TABLE public.components_seo_utilities_seos OWNER TO "JOY";

--
-- Name: components_seo_utilities_seos_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_seos_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_seo_utilities_seos_cmps OWNER TO "JOY";

--
-- Name: components_seo_utilities_seos_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_seos_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_seos_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_seos_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_seos_cmps_id_seq OWNED BY public.components_seo_utilities_seos_cmps.id;


--
-- Name: components_seo_utilities_seos_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_seos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_seos_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_seos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_seos_id_seq OWNED BY public.components_seo_utilities_seos.id;


--
-- Name: components_seo_utilities_social_icons; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_social_icons (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.components_seo_utilities_social_icons OWNER TO "JOY";

--
-- Name: components_seo_utilities_social_icons_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_seo_utilities_social_icons_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_seo_utilities_social_icons_cmps OWNER TO "JOY";

--
-- Name: components_seo_utilities_social_icons_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_social_icons_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_social_icons_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_social_icons_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_social_icons_cmps_id_seq OWNED BY public.components_seo_utilities_social_icons_cmps.id;


--
-- Name: components_seo_utilities_social_icons_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_seo_utilities_social_icons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_seo_utilities_social_icons_id_seq OWNER TO "JOY";

--
-- Name: components_seo_utilities_social_icons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_seo_utilities_social_icons_id_seq OWNED BY public.components_seo_utilities_social_icons.id;


--
-- Name: components_utilities_accordions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_accordions (
    id integer NOT NULL,
    question character varying(255),
    answer text
);


ALTER TABLE public.components_utilities_accordions OWNER TO "JOY";

--
-- Name: components_utilities_accordions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_accordions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_accordions_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_accordions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_accordions_id_seq OWNED BY public.components_utilities_accordions.id;


--
-- Name: components_utilities_basic_images; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_basic_images (
    id integer NOT NULL,
    alt character varying(255),
    width integer,
    height integer,
    fallback_src character varying(255)
);


ALTER TABLE public.components_utilities_basic_images OWNER TO "JOY";

--
-- Name: components_utilities_basic_images_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_basic_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_basic_images_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_basic_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_basic_images_id_seq OWNED BY public.components_utilities_basic_images.id;


--
-- Name: components_utilities_ck_editor_contents; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_ck_editor_contents (
    id integer NOT NULL,
    content text
);


ALTER TABLE public.components_utilities_ck_editor_contents OWNER TO "JOY";

--
-- Name: components_utilities_ck_editor_contents_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_ck_editor_contents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_ck_editor_contents_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_ck_editor_contents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_ck_editor_contents_id_seq OWNED BY public.components_utilities_ck_editor_contents.id;


--
-- Name: components_utilities_image_with_links; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_image_with_links (
    id integer NOT NULL
);


ALTER TABLE public.components_utilities_image_with_links OWNER TO "JOY";

--
-- Name: components_utilities_image_with_links_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_image_with_links_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_utilities_image_with_links_cmps OWNER TO "JOY";

--
-- Name: components_utilities_image_with_links_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_image_with_links_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_image_with_links_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_image_with_links_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_image_with_links_cmps_id_seq OWNED BY public.components_utilities_image_with_links_cmps.id;


--
-- Name: components_utilities_image_with_links_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_image_with_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_image_with_links_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_image_with_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_image_with_links_id_seq OWNED BY public.components_utilities_image_with_links.id;


--
-- Name: components_utilities_links; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_links (
    id integer NOT NULL,
    label character varying(255),
    href character varying(255),
    new_tab boolean
);


ALTER TABLE public.components_utilities_links OWNER TO "JOY";

--
-- Name: components_utilities_links_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_links_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_links_id_seq OWNED BY public.components_utilities_links.id;


--
-- Name: components_utilities_links_with_titles; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_links_with_titles (
    id integer NOT NULL,
    title character varying(255)
);


ALTER TABLE public.components_utilities_links_with_titles OWNER TO "JOY";

--
-- Name: components_utilities_links_with_titles_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_links_with_titles_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.components_utilities_links_with_titles_cmps OWNER TO "JOY";

--
-- Name: components_utilities_links_with_titles_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_links_with_titles_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_links_with_titles_cmps_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_links_with_titles_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_links_with_titles_cmps_id_seq OWNED BY public.components_utilities_links_with_titles_cmps.id;


--
-- Name: components_utilities_links_with_titles_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_links_with_titles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_links_with_titles_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_links_with_titles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_links_with_titles_id_seq OWNED BY public.components_utilities_links_with_titles.id;


--
-- Name: components_utilities_texts; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.components_utilities_texts (
    id integer NOT NULL,
    text character varying(255)
);


ALTER TABLE public.components_utilities_texts OWNER TO "JOY";

--
-- Name: components_utilities_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.components_utilities_texts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.components_utilities_texts_id_seq OWNER TO "JOY";

--
-- Name: components_utilities_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.components_utilities_texts_id_seq OWNED BY public.components_utilities_texts.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.files (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    alternative_text character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255),
    ext character varying(255),
    mime character varying(255),
    size numeric(10,2),
    url character varying(255),
    preview_url character varying(255),
    provider character varying(255),
    provider_metadata jsonb,
    folder_path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.files OWNER TO "JOY";

--
-- Name: files_folder_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.files_folder_lnk (
    id integer NOT NULL,
    file_id integer,
    folder_id integer,
    file_ord double precision
);


ALTER TABLE public.files_folder_lnk OWNER TO "JOY";

--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.files_folder_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_folder_lnk_id_seq OWNER TO "JOY";

--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.files_folder_lnk_id_seq OWNED BY public.files_folder_lnk.id;


--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_seq OWNER TO "JOY";

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: files_related_mph; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.files_related_mph (
    id integer NOT NULL,
    file_id integer,
    related_id integer,
    related_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.files_related_mph OWNER TO "JOY";

--
-- Name: files_related_mph_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.files_related_mph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_related_mph_id_seq OWNER TO "JOY";

--
-- Name: files_related_mph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.files_related_mph_id_seq OWNED BY public.files_related_mph.id;


--
-- Name: footers; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.footers (
    id integer NOT NULL,
    document_id character varying(255),
    copy_right character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.footers OWNER TO "JOY";

--
-- Name: footers_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.footers_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.footers_cmps OWNER TO "JOY";

--
-- Name: footers_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.footers_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.footers_cmps_id_seq OWNER TO "JOY";

--
-- Name: footers_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.footers_cmps_id_seq OWNED BY public.footers_cmps.id;


--
-- Name: footers_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.footers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.footers_id_seq OWNER TO "JOY";

--
-- Name: footers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.footers_id_seq OWNED BY public.footers.id;


--
-- Name: i18n_locale; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.i18n_locale (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    code character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.i18n_locale OWNER TO "JOY";

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.i18n_locale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.i18n_locale_id_seq OWNER TO "JOY";

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.i18n_locale_id_seq OWNED BY public.i18n_locale.id;


--
-- Name: navbars; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.navbars (
    id integer NOT NULL,
    document_id character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.navbars OWNER TO "JOY";

--
-- Name: navbars_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.navbars_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.navbars_cmps OWNER TO "JOY";

--
-- Name: navbars_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.navbars_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.navbars_cmps_id_seq OWNER TO "JOY";

--
-- Name: navbars_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.navbars_cmps_id_seq OWNED BY public.navbars_cmps.id;


--
-- Name: navbars_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.navbars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.navbars_id_seq OWNER TO "JOY";

--
-- Name: navbars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.navbars_id_seq OWNED BY public.navbars.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    document_id character varying(255),
    title character varying(255),
    breadcrumb_title character varying(255),
    slug character varying(255),
    full_path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.pages OWNER TO "JOY";

--
-- Name: pages_cmps; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.pages_cmps (
    id integer NOT NULL,
    entity_id integer,
    cmp_id integer,
    component_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.pages_cmps OWNER TO "JOY";

--
-- Name: pages_cmps_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.pages_cmps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_cmps_id_seq OWNER TO "JOY";

--
-- Name: pages_cmps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.pages_cmps_id_seq OWNED BY public.pages_cmps.id;


--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_id_seq OWNER TO "JOY";

--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: pages_parent_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.pages_parent_lnk (
    id integer NOT NULL,
    page_id integer,
    inv_page_id integer,
    page_ord double precision
);


ALTER TABLE public.pages_parent_lnk OWNER TO "JOY";

--
-- Name: pages_parent_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.pages_parent_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_parent_lnk_id_seq OWNER TO "JOY";

--
-- Name: pages_parent_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.pages_parent_lnk_id_seq OWNED BY public.pages_parent_lnk.id;


--
-- Name: strapi_api_token_permissions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_api_token_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_api_token_permissions OWNER TO "JOY";

--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_api_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_api_token_permissions_id_seq OWNER TO "JOY";

--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_api_token_permissions_id_seq OWNED BY public.strapi_api_token_permissions.id;


--
-- Name: strapi_api_token_permissions_token_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_api_token_permissions_token_lnk (
    id integer NOT NULL,
    api_token_permission_id integer,
    api_token_id integer,
    api_token_permission_ord double precision
);


ALTER TABLE public.strapi_api_token_permissions_token_lnk OWNER TO "JOY";

--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_api_token_permissions_token_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_api_token_permissions_token_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_api_token_permissions_token_lnk_id_seq OWNED BY public.strapi_api_token_permissions_token_lnk.id;


--
-- Name: strapi_api_tokens; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_api_tokens (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    type character varying(255),
    access_key character varying(255),
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    encrypted_key text
);


ALTER TABLE public.strapi_api_tokens OWNER TO "JOY";

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_api_tokens_id_seq OWNER TO "JOY";

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_api_tokens_id_seq OWNED BY public.strapi_api_tokens.id;


--
-- Name: strapi_core_store_settings; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_core_store_settings (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.strapi_core_store_settings OWNER TO "JOY";

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_core_store_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_core_store_settings_id_seq OWNER TO "JOY";

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_core_store_settings_id_seq OWNED BY public.strapi_core_store_settings.id;


--
-- Name: strapi_database_schema; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_database_schema (
    id integer NOT NULL,
    schema json,
    "time" timestamp without time zone,
    hash character varying(255)
);


ALTER TABLE public.strapi_database_schema OWNER TO "JOY";

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_database_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_database_schema_id_seq OWNER TO "JOY";

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_database_schema_id_seq OWNED BY public.strapi_database_schema.id;


--
-- Name: strapi_history_versions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_history_versions (
    id integer NOT NULL,
    content_type character varying(255) NOT NULL,
    related_document_id character varying(255),
    locale character varying(255),
    status character varying(255),
    data jsonb,
    schema jsonb,
    created_at timestamp(6) without time zone,
    created_by_id integer
);


ALTER TABLE public.strapi_history_versions OWNER TO "JOY";

--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_history_versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_history_versions_id_seq OWNER TO "JOY";

--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_history_versions_id_seq OWNED BY public.strapi_history_versions.id;


--
-- Name: strapi_migrations; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_migrations (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations OWNER TO "JOY";

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_migrations_id_seq OWNER TO "JOY";

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_migrations_id_seq OWNED BY public.strapi_migrations.id;


--
-- Name: strapi_migrations_internal; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_migrations_internal (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations_internal OWNER TO "JOY";

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_migrations_internal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_migrations_internal_id_seq OWNER TO "JOY";

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_migrations_internal_id_seq OWNED BY public.strapi_migrations_internal.id;


--
-- Name: strapi_release_actions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_release_actions (
    id integer NOT NULL,
    document_id character varying(255),
    type character varying(255),
    content_type character varying(255),
    entry_document_id character varying(255),
    locale character varying(255),
    is_entry_valid boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.strapi_release_actions OWNER TO "JOY";

--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_release_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_release_actions_id_seq OWNER TO "JOY";

--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_release_actions_id_seq OWNED BY public.strapi_release_actions.id;


--
-- Name: strapi_release_actions_release_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_release_actions_release_lnk (
    id integer NOT NULL,
    release_action_id integer,
    release_id integer,
    release_action_ord double precision
);


ALTER TABLE public.strapi_release_actions_release_lnk OWNER TO "JOY";

--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_release_actions_release_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_release_actions_release_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_release_actions_release_lnk_id_seq OWNED BY public.strapi_release_actions_release_lnk.id;


--
-- Name: strapi_releases; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_releases (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    released_at timestamp(6) without time zone,
    scheduled_at timestamp(6) without time zone,
    timezone character varying(255),
    status character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_releases OWNER TO "JOY";

--
-- Name: strapi_releases_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_releases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_releases_id_seq OWNER TO "JOY";

--
-- Name: strapi_releases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_releases_id_seq OWNED BY public.strapi_releases.id;


--
-- Name: strapi_transfer_token_permissions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_transfer_token_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_transfer_token_permissions OWNER TO "JOY";

--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_transfer_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_transfer_token_permissions_id_seq OWNER TO "JOY";

--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_transfer_token_permissions_id_seq OWNED BY public.strapi_transfer_token_permissions.id;


--
-- Name: strapi_transfer_token_permissions_token_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_transfer_token_permissions_token_lnk (
    id integer NOT NULL,
    transfer_token_permission_id integer,
    transfer_token_id integer,
    transfer_token_permission_ord double precision
);


ALTER TABLE public.strapi_transfer_token_permissions_token_lnk OWNER TO "JOY";

--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_transfer_token_permissions_token_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_transfer_token_permissions_token_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_transfer_token_permissions_token_lnk_id_seq OWNED BY public.strapi_transfer_token_permissions_token_lnk.id;


--
-- Name: strapi_transfer_tokens; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_transfer_tokens (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    access_key character varying(255),
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_transfer_tokens OWNER TO "JOY";

--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_transfer_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_transfer_tokens_id_seq OWNER TO "JOY";

--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_transfer_tokens_id_seq OWNED BY public.strapi_transfer_tokens.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


ALTER TABLE public.strapi_webhooks OWNER TO "JOY";

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_webhooks_id_seq OWNER TO "JOY";

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: strapi_workflows; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_workflows (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    content_types jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_workflows OWNER TO "JOY";

--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_workflows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_workflows_id_seq OWNER TO "JOY";

--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_workflows_id_seq OWNED BY public.strapi_workflows.id;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_workflows_stage_required_to_publish_lnk (
    id integer NOT NULL,
    workflow_id integer,
    workflow_stage_id integer
);


ALTER TABLE public.strapi_workflows_stage_required_to_publish_lnk OWNER TO "JOY";

--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_workflows_stage_required_to_publish_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_workflows_stage_required_to_publish_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_workflows_stage_required_to_publish_lnk_id_seq OWNED BY public.strapi_workflows_stage_required_to_publish_lnk.id;


--
-- Name: strapi_workflows_stages; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_workflows_stages (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    color character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_workflows_stages OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_workflows_stages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_workflows_stages_id_seq OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_workflows_stages_id_seq OWNED BY public.strapi_workflows_stages.id;


--
-- Name: strapi_workflows_stages_permissions_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_workflows_stages_permissions_lnk (
    id integer NOT NULL,
    workflow_stage_id integer,
    permission_id integer,
    permission_ord double precision
);


ALTER TABLE public.strapi_workflows_stages_permissions_lnk OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_workflows_stages_permissions_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_workflows_stages_permissions_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_workflows_stages_permissions_lnk_id_seq OWNED BY public.strapi_workflows_stages_permissions_lnk.id;


--
-- Name: strapi_workflows_stages_workflow_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.strapi_workflows_stages_workflow_lnk (
    id integer NOT NULL,
    workflow_stage_id integer,
    workflow_id integer,
    workflow_stage_ord double precision
);


ALTER TABLE public.strapi_workflows_stages_workflow_lnk OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.strapi_workflows_stages_workflow_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.strapi_workflows_stages_workflow_lnk_id_seq OWNER TO "JOY";

--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.strapi_workflows_stages_workflow_lnk_id_seq OWNED BY public.strapi_workflows_stages_workflow_lnk.id;


--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.subscribers (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    email character varying(255),
    message text,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.subscribers OWNER TO "JOY";

--
-- Name: subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscribers_id_seq OWNER TO "JOY";

--
-- Name: subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.subscribers_id_seq OWNED BY public.subscribers.id;


--
-- Name: up_permissions; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.up_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.up_permissions OWNER TO "JOY";

--
-- Name: up_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.up_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.up_permissions_id_seq OWNER TO "JOY";

--
-- Name: up_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.up_permissions_id_seq OWNED BY public.up_permissions.id;


--
-- Name: up_permissions_role_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.up_permissions_role_lnk (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_ord double precision
);


ALTER TABLE public.up_permissions_role_lnk OWNER TO "JOY";

--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.up_permissions_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.up_permissions_role_lnk_id_seq OWNER TO "JOY";

--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.up_permissions_role_lnk_id_seq OWNED BY public.up_permissions_role_lnk.id;


--
-- Name: up_roles; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.up_roles (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.up_roles OWNER TO "JOY";

--
-- Name: up_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.up_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.up_roles_id_seq OWNER TO "JOY";

--
-- Name: up_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.up_roles_id_seq OWNED BY public.up_roles.id;


--
-- Name: up_users; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.up_users (
    id integer NOT NULL,
    document_id character varying(255),
    username character varying(255),
    email character varying(255),
    provider character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    confirmation_token character varying(255),
    confirmed boolean,
    blocked boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.up_users OWNER TO "JOY";

--
-- Name: up_users_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.up_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.up_users_id_seq OWNER TO "JOY";

--
-- Name: up_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.up_users_id_seq OWNED BY public.up_users.id;


--
-- Name: up_users_role_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.up_users_role_lnk (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    user_ord double precision
);


ALTER TABLE public.up_users_role_lnk OWNER TO "JOY";

--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.up_users_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.up_users_role_lnk_id_seq OWNER TO "JOY";

--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.up_users_role_lnk_id_seq OWNED BY public.up_users_role_lnk.id;


--
-- Name: upload_folders; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.upload_folders (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    path_id integer,
    path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.upload_folders OWNER TO "JOY";

--
-- Name: upload_folders_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.upload_folders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.upload_folders_id_seq OWNER TO "JOY";

--
-- Name: upload_folders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.upload_folders_id_seq OWNED BY public.upload_folders.id;


--
-- Name: upload_folders_parent_lnk; Type: TABLE; Schema: public; Owner: JOY
--

CREATE TABLE public.upload_folders_parent_lnk (
    id integer NOT NULL,
    folder_id integer,
    inv_folder_id integer,
    folder_ord double precision
);


ALTER TABLE public.upload_folders_parent_lnk OWNER TO "JOY";

--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: JOY
--

CREATE SEQUENCE public.upload_folders_parent_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.upload_folders_parent_lnk_id_seq OWNER TO "JOY";

--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: JOY
--

ALTER SEQUENCE public.upload_folders_parent_lnk_id_seq OWNED BY public.upload_folders_parent_lnk.id;


--
-- Name: admin_permissions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_id_seq'::regclass);


--
-- Name: admin_permissions_role_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_role_lnk_id_seq'::regclass);


--
-- Name: admin_roles id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_roles ALTER COLUMN id SET DEFAULT nextval('public.admin_roles_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: admin_users_roles_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users_roles_lnk ALTER COLUMN id SET DEFAULT nextval('public.admin_users_roles_lnk_id_seq'::regclass);


--
-- Name: components_elements_footer_items id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items ALTER COLUMN id SET DEFAULT nextval('public.components_elements_footer_items_id_seq'::regclass);


--
-- Name: components_elements_footer_items_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_elements_footer_items_cmps_id_seq'::regclass);


--
-- Name: components_forms_contact_forms id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms ALTER COLUMN id SET DEFAULT nextval('public.components_forms_contact_forms_id_seq'::regclass);


--
-- Name: components_forms_contact_forms_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_forms_contact_forms_cmps_id_seq'::regclass);


--
-- Name: components_forms_newsletter_forms id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms ALTER COLUMN id SET DEFAULT nextval('public.components_forms_newsletter_forms_id_seq'::regclass);


--
-- Name: components_forms_newsletter_forms_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_forms_newsletter_forms_cmps_id_seq'::regclass);


--
-- Name: components_sections_animated_logo_rows id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows ALTER COLUMN id SET DEFAULT nextval('public.components_sections_animated_logo_rows_id_seq'::regclass);


--
-- Name: components_sections_animated_logo_rows_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_animated_logo_rows_cmps_id_seq'::regclass);


--
-- Name: components_sections_carousels id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels ALTER COLUMN id SET DEFAULT nextval('public.components_sections_carousels_id_seq'::regclass);


--
-- Name: components_sections_carousels_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_carousels_cmps_id_seq'::regclass);


--
-- Name: components_sections_faqs id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs ALTER COLUMN id SET DEFAULT nextval('public.components_sections_faqs_id_seq'::regclass);


--
-- Name: components_sections_faqs_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_faqs_cmps_id_seq'::regclass);


--
-- Name: components_sections_heading_with_cta_buttons id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons ALTER COLUMN id SET DEFAULT nextval('public.components_sections_heading_with_cta_buttons_id_seq'::regclass);


--
-- Name: components_sections_heading_with_cta_buttons_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_heading_with_cta_buttons_cmps_id_seq'::regclass);


--
-- Name: components_sections_heroes id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes ALTER COLUMN id SET DEFAULT nextval('public.components_sections_heroes_id_seq'::regclass);


--
-- Name: components_sections_heroes_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_heroes_cmps_id_seq'::regclass);


--
-- Name: components_sections_horizontal_images id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images ALTER COLUMN id SET DEFAULT nextval('public.components_sections_horizontal_images_id_seq'::regclass);


--
-- Name: components_sections_horizontal_images_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_horizontal_images_cmps_id_seq'::regclass);


--
-- Name: components_sections_image_with_cta_buttons id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons ALTER COLUMN id SET DEFAULT nextval('public.components_sections_image_with_cta_buttons_id_seq'::regclass);


--
-- Name: components_sections_image_with_cta_buttons_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_sections_image_with_cta_buttons_cmps_id_seq'::regclass);


--
-- Name: components_seo_utilities_meta_socials id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_meta_socials ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_meta_socials_id_seq'::regclass);


--
-- Name: components_seo_utilities_seo_ogs id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seo_ogs ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_seo_ogs_id_seq'::regclass);


--
-- Name: components_seo_utilities_seo_twitters id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seo_twitters ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_seo_twitters_id_seq'::regclass);


--
-- Name: components_seo_utilities_seos id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_seos_id_seq'::regclass);


--
-- Name: components_seo_utilities_seos_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_seos_cmps_id_seq'::regclass);


--
-- Name: components_seo_utilities_social_icons id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_social_icons_id_seq'::regclass);


--
-- Name: components_seo_utilities_social_icons_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_seo_utilities_social_icons_cmps_id_seq'::regclass);


--
-- Name: components_utilities_accordions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_accordions ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_accordions_id_seq'::regclass);


--
-- Name: components_utilities_basic_images id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_basic_images ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_basic_images_id_seq'::regclass);


--
-- Name: components_utilities_ck_editor_contents id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_ck_editor_contents ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_ck_editor_contents_id_seq'::regclass);


--
-- Name: components_utilities_image_with_links id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_image_with_links_id_seq'::regclass);


--
-- Name: components_utilities_image_with_links_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_image_with_links_cmps_id_seq'::regclass);


--
-- Name: components_utilities_links id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_links_id_seq'::regclass);


--
-- Name: components_utilities_links_with_titles id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_links_with_titles_id_seq'::regclass);


--
-- Name: components_utilities_links_with_titles_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles_cmps ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_links_with_titles_cmps_id_seq'::regclass);


--
-- Name: components_utilities_texts id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_texts ALTER COLUMN id SET DEFAULT nextval('public.components_utilities_texts_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: files_folder_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_folder_lnk ALTER COLUMN id SET DEFAULT nextval('public.files_folder_lnk_id_seq'::regclass);


--
-- Name: files_related_mph id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_related_mph ALTER COLUMN id SET DEFAULT nextval('public.files_related_mph_id_seq'::regclass);


--
-- Name: footers id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers ALTER COLUMN id SET DEFAULT nextval('public.footers_id_seq'::regclass);


--
-- Name: footers_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers_cmps ALTER COLUMN id SET DEFAULT nextval('public.footers_cmps_id_seq'::regclass);


--
-- Name: i18n_locale id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.i18n_locale ALTER COLUMN id SET DEFAULT nextval('public.i18n_locale_id_seq'::regclass);


--
-- Name: navbars id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars ALTER COLUMN id SET DEFAULT nextval('public.navbars_id_seq'::regclass);


--
-- Name: navbars_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars_cmps ALTER COLUMN id SET DEFAULT nextval('public.navbars_cmps_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: pages_cmps id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_cmps ALTER COLUMN id SET DEFAULT nextval('public.pages_cmps_id_seq'::regclass);


--
-- Name: pages_parent_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_parent_lnk ALTER COLUMN id SET DEFAULT nextval('public.pages_parent_lnk_id_seq'::regclass);


--
-- Name: strapi_api_token_permissions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_id_seq'::regclass);


--
-- Name: strapi_api_token_permissions_token_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_token_lnk_id_seq'::regclass);


--
-- Name: strapi_api_tokens id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_tokens_id_seq'::regclass);


--
-- Name: strapi_core_store_settings id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_core_store_settings ALTER COLUMN id SET DEFAULT nextval('public.strapi_core_store_settings_id_seq'::regclass);


--
-- Name: strapi_database_schema id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_database_schema ALTER COLUMN id SET DEFAULT nextval('public.strapi_database_schema_id_seq'::regclass);


--
-- Name: strapi_history_versions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_history_versions ALTER COLUMN id SET DEFAULT nextval('public.strapi_history_versions_id_seq'::regclass);


--
-- Name: strapi_migrations id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_migrations ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_id_seq'::regclass);


--
-- Name: strapi_migrations_internal id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_migrations_internal ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_internal_id_seq'::regclass);


--
-- Name: strapi_release_actions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions ALTER COLUMN id SET DEFAULT nextval('public.strapi_release_actions_id_seq'::regclass);


--
-- Name: strapi_release_actions_release_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_release_actions_release_lnk_id_seq'::regclass);


--
-- Name: strapi_releases id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_releases ALTER COLUMN id SET DEFAULT nextval('public.strapi_releases_id_seq'::regclass);


--
-- Name: strapi_transfer_token_permissions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_id_seq'::regclass);


--
-- Name: strapi_transfer_token_permissions_token_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_token_lnk_id_seq'::regclass);


--
-- Name: strapi_transfer_tokens id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_tokens_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: strapi_workflows id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_id_seq'::regclass);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stage_required_to_publish_lnk_id_seq'::regclass);


--
-- Name: strapi_workflows_stages id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_id_seq'::regclass);


--
-- Name: strapi_workflows_stages_permissions_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_permissions_lnk_id_seq'::regclass);


--
-- Name: strapi_workflows_stages_workflow_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_workflow_lnk_id_seq'::regclass);


--
-- Name: subscribers id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.subscribers ALTER COLUMN id SET DEFAULT nextval('public.subscribers_id_seq'::regclass);


--
-- Name: up_permissions id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_id_seq'::regclass);


--
-- Name: up_permissions_role_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_role_lnk_id_seq'::regclass);


--
-- Name: up_roles id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_roles ALTER COLUMN id SET DEFAULT nextval('public.up_roles_id_seq'::regclass);


--
-- Name: up_users id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users ALTER COLUMN id SET DEFAULT nextval('public.up_users_id_seq'::regclass);


--
-- Name: up_users_role_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.up_users_role_lnk_id_seq'::regclass);


--
-- Name: upload_folders id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_id_seq'::regclass);


--
-- Name: upload_folders_parent_lnk id; Type: DEFAULT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders_parent_lnk ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_parent_lnk_id_seq'::regclass);


--
-- Data for Name: admin_permissions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.admin_permissions (id, document_id, action, action_parameters, subject, properties, conditions, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	rmru4a25k0lmqq7t7bx91swe	plugin::content-manager.explorer.create	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.56	2025-06-13 16:21:23.56	2025-06-13 16:21:23.56	\N	\N	\N
2	loyulj89756zndeg57v5vfbc	plugin::content-manager.explorer.create	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.575	2025-06-13 16:21:23.575	2025-06-13 16:21:23.575	\N	\N	\N
3	qkikhn6yr2m8z05w7xr94qsj	plugin::content-manager.explorer.create	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	[]	2025-06-13 16:21:23.579	2025-06-13 16:21:23.579	2025-06-13 16:21:23.579	\N	\N	\N
4	o51enixqb7bt6sm4akj7f9h1	plugin::content-manager.explorer.create	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.584	2025-06-13 16:21:23.584	2025-06-13 16:21:23.584	\N	\N	\N
5	ngwsnop9p8ts2tdxz49jjfas	plugin::content-manager.explorer.read	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.587	2025-06-13 16:21:23.587	2025-06-13 16:21:23.587	\N	\N	\N
6	veqpqdkit72dlpz4dg7uf5g9	plugin::content-manager.explorer.read	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.592	2025-06-13 16:21:23.592	2025-06-13 16:21:23.592	\N	\N	\N
7	zexzh2fxdpzz00ry8yoenblj	plugin::content-manager.explorer.read	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	[]	2025-06-13 16:21:23.598	2025-06-13 16:21:23.598	2025-06-13 16:21:23.598	\N	\N	\N
8	e5esfrpw916hfeutuvi4pegs	plugin::content-manager.explorer.read	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.602	2025-06-13 16:21:23.602	2025-06-13 16:21:23.602	\N	\N	\N
9	zlw0r132a0epahareh96gcch	plugin::content-manager.explorer.update	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.606	2025-06-13 16:21:23.606	2025-06-13 16:21:23.606	\N	\N	\N
10	lqkbw7eeyjlm0y5idxe27quv	plugin::content-manager.explorer.update	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	[]	2025-06-13 16:21:23.61	2025-06-13 16:21:23.61	2025-06-13 16:21:23.611	\N	\N	\N
11	ttsknuk7504ap8btkrwxdyc7	plugin::content-manager.explorer.update	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	[]	2025-06-13 16:21:23.615	2025-06-13 16:21:23.615	2025-06-13 16:21:23.615	\N	\N	\N
12	betsx22yx4i7ydb1in4m1tr6	plugin::content-manager.explorer.update	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.618	2025-06-13 16:21:23.618	2025-06-13 16:21:23.618	\N	\N	\N
16	wz6ho2fhlwzqazg87l5jdmfg	plugin::content-manager.explorer.delete	{}	api::subscriber.subscriber	{}	[]	2025-06-13 16:21:23.635	2025-06-13 16:21:23.635	2025-06-13 16:21:23.636	\N	\N	\N
20	f5xi1jluq2lzgs5nt6wtpdu4	plugin::content-manager.explorer.publish	{}	api::subscriber.subscriber	{}	[]	2025-06-13 16:21:23.653	2025-06-13 16:21:23.653	2025-06-13 16:21:23.653	\N	\N	\N
21	v51bnoc81okgfps5ojdtukse	plugin::upload.read	{}	\N	{}	[]	2025-06-13 16:21:23.657	2025-06-13 16:21:23.657	2025-06-13 16:21:23.658	\N	\N	\N
22	bqwuswa0mbo0tj8z5u7jkk0q	plugin::upload.configure-view	{}	\N	{}	[]	2025-06-13 16:21:23.662	2025-06-13 16:21:23.662	2025-06-13 16:21:23.663	\N	\N	\N
23	bu8qcjmr9cn7tss88g69tx1m	plugin::upload.assets.create	{}	\N	{}	[]	2025-06-13 16:21:23.667	2025-06-13 16:21:23.667	2025-06-13 16:21:23.667	\N	\N	\N
24	f6fvwqlou1lba6a5vy4gcx1v	plugin::upload.assets.update	{}	\N	{}	[]	2025-06-13 16:21:23.671	2025-06-13 16:21:23.671	2025-06-13 16:21:23.671	\N	\N	\N
25	pvaclm1exebjf1jx1ook6s5u	plugin::upload.assets.download	{}	\N	{}	[]	2025-06-13 16:21:23.676	2025-06-13 16:21:23.676	2025-06-13 16:21:23.676	\N	\N	\N
26	zvnl4hpqkqnqojwwgsebwtxu	plugin::upload.assets.copy-link	{}	\N	{}	[]	2025-06-13 16:21:23.68	2025-06-13 16:21:23.68	2025-06-13 16:21:23.68	\N	\N	\N
27	vnb364wjdcllhe83e459wvuy	plugin::content-manager.explorer.create	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.686	2025-06-13 16:21:23.686	2025-06-13 16:21:23.686	\N	\N	\N
28	rn3ocnbjtkq43sfbuwx9c6qk	plugin::content-manager.explorer.create	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.694	2025-06-13 16:21:23.694	2025-06-13 16:21:23.694	\N	\N	\N
29	lm4juvs5bdas2xn2rc6d60yx	plugin::content-manager.explorer.create	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	["admin::is-creator"]	2025-06-13 16:21:23.698	2025-06-13 16:21:23.698	2025-06-13 16:21:23.698	\N	\N	\N
30	m2hx2id7rj1jtv7v9ragrls3	plugin::content-manager.explorer.create	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	["admin::is-creator"]	2025-06-13 16:21:23.703	2025-06-13 16:21:23.703	2025-06-13 16:21:23.703	\N	\N	\N
31	owb20bw51o44dmdgbat36ydu	plugin::content-manager.explorer.read	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.708	2025-06-13 16:21:23.708	2025-06-13 16:21:23.708	\N	\N	\N
32	w26kip2lucm2esw2ca0xfack	plugin::content-manager.explorer.read	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.713	2025-06-13 16:21:23.713	2025-06-13 16:21:23.713	\N	\N	\N
33	ys0kwnsirgyscx7qbmk6c1x7	plugin::content-manager.explorer.read	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	["admin::is-creator"]	2025-06-13 16:21:23.717	2025-06-13 16:21:23.717	2025-06-13 16:21:23.717	\N	\N	\N
34	bh09pmlf51q8kodpnxlxzege	plugin::content-manager.explorer.read	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	["admin::is-creator"]	2025-06-13 16:21:23.721	2025-06-13 16:21:23.721	2025-06-13 16:21:23.721	\N	\N	\N
35	ws9ror9147a7vjvizpcdw90b	plugin::content-manager.explorer.update	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.726	2025-06-13 16:21:23.726	2025-06-13 16:21:23.726	\N	\N	\N
36	jdnzoxgwnklpmjytlf57tq2u	plugin::content-manager.explorer.update	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"]}	["admin::is-creator"]	2025-06-13 16:21:23.73	2025-06-13 16:21:23.73	2025-06-13 16:21:23.73	\N	\N	\N
37	rgyjfy5r4grjk1zxmey9kwim	plugin::content-manager.explorer.update	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"]}	["admin::is-creator"]	2025-06-13 16:21:23.736	2025-06-13 16:21:23.736	2025-06-13 16:21:23.736	\N	\N	\N
38	myfbg60h4yupuastez88zngu	plugin::content-manager.explorer.update	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	["admin::is-creator"]	2025-06-13 16:21:23.741	2025-06-13 16:21:23.741	2025-06-13 16:21:23.741	\N	\N	\N
42	lw8tluf1wo57cj9s1znwyrku	plugin::content-manager.explorer.delete	{}	api::subscriber.subscriber	{}	["admin::is-creator"]	2025-06-13 16:21:23.762	2025-06-13 16:21:23.762	2025-06-13 16:21:23.763	\N	\N	\N
43	wl4jpvk1b3fnzn7ijyk0g2hn	plugin::upload.read	{}	\N	{}	["admin::is-creator"]	2025-06-13 16:21:23.768	2025-06-13 16:21:23.768	2025-06-13 16:21:23.768	\N	\N	\N
44	x0eps64jdatpdlaahpa64t60	plugin::upload.configure-view	{}	\N	{}	[]	2025-06-13 16:21:23.772	2025-06-13 16:21:23.772	2025-06-13 16:21:23.772	\N	\N	\N
45	eu0c9gi5rsigfrkg2gnoidr2	plugin::upload.assets.create	{}	\N	{}	[]	2025-06-13 16:21:23.777	2025-06-13 16:21:23.777	2025-06-13 16:21:23.777	\N	\N	\N
46	zua14ksb1nkr8ad4vahqczuj	plugin::upload.assets.update	{}	\N	{}	["admin::is-creator"]	2025-06-13 16:21:23.781	2025-06-13 16:21:23.781	2025-06-13 16:21:23.781	\N	\N	\N
47	y86f0rx3nudrpbalfbe4up7b	plugin::upload.assets.download	{}	\N	{}	[]	2025-06-13 16:21:23.786	2025-06-13 16:21:23.786	2025-06-13 16:21:23.786	\N	\N	\N
48	drl4f0zip79jct4uoe2d1jn9	plugin::upload.assets.copy-link	{}	\N	{}	[]	2025-06-13 16:21:23.79	2025-06-13 16:21:23.79	2025-06-13 16:21:23.79	\N	\N	\N
49	bzfi7jjb0nabcviqtj7k6n9f	plugin::content-manager.explorer.create	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2025-06-13 16:21:23.841	2025-06-13 16:21:23.841	2025-06-13 16:21:23.841	\N	\N	\N
73	peasdkuyy5bib4m2hd9fg61m	plugin::content-manager.explorer.publish	{}	api::subscriber.subscriber	{}	[]	2025-06-13 16:21:23.975	2025-06-13 16:21:23.975	2025-06-13 16:21:23.975	\N	\N	\N
53	wn2wagnhw20w12kdlkm47gzn	plugin::content-manager.explorer.create	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.864	2025-06-13 16:21:23.864	2025-06-13 16:21:23.865	\N	\N	\N
54	ek2wfrasek3rojk8srf15odu	plugin::content-manager.explorer.read	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2025-06-13 16:21:23.869	2025-06-13 16:21:23.869	2025-06-13 16:21:23.869	\N	\N	\N
58	zz61ncf34yk67z4vjn7q0p99	plugin::content-manager.explorer.read	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.894	2025-06-13 16:21:23.894	2025-06-13 16:21:23.895	\N	\N	\N
59	jp1ocph8ielk13ior0oo2rjr	plugin::content-manager.explorer.update	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2025-06-13 16:21:23.901	2025-06-13 16:21:23.901	2025-06-13 16:21:23.901	\N	\N	\N
63	ncjd4bh9y3kxivymnandm9rx	plugin::content-manager.explorer.update	{}	api::subscriber.subscriber	{"fields": ["name", "email", "message"]}	[]	2025-06-13 16:21:23.925	2025-06-13 16:21:23.925	2025-06-13 16:21:23.926	\N	\N	\N
64	wfuz56lfcej43jmwklip3zkx	plugin::content-manager.explorer.delete	{}	plugin::users-permissions.user	{}	[]	2025-06-13 16:21:23.931	2025-06-13 16:21:23.931	2025-06-13 16:21:23.931	\N	\N	\N
68	o8nyxst1k3d5dluze5cerm7v	plugin::content-manager.explorer.delete	{}	api::subscriber.subscriber	{}	[]	2025-06-13 16:21:23.951	2025-06-13 16:21:23.951	2025-06-13 16:21:23.951	\N	\N	\N
69	m2is57hmsgarz3aljwl4hhwh	plugin::content-manager.explorer.publish	{}	plugin::users-permissions.user	{}	[]	2025-06-13 16:21:23.956	2025-06-13 16:21:23.956	2025-06-13 16:21:23.956	\N	\N	\N
74	i70o9ne2p6m0sh4e1myryo11	plugin::content-manager.single-types.configure-view	{}	\N	{}	[]	2025-06-13 16:21:23.979	2025-06-13 16:21:23.979	2025-06-13 16:21:23.979	\N	\N	\N
75	a1ae421mrzqi6zw5vus6pzc1	plugin::content-manager.collection-types.configure-view	{}	\N	{}	[]	2025-06-13 16:21:23.984	2025-06-13 16:21:23.984	2025-06-13 16:21:23.984	\N	\N	\N
76	i8kykxcice8fwjn8lre4kn2c	plugin::content-manager.components.configure-layout	{}	\N	{}	[]	2025-06-13 16:21:23.988	2025-06-13 16:21:23.988	2025-06-13 16:21:23.988	\N	\N	\N
77	vg27h9qodpbnka0vebod9d7d	plugin::content-type-builder.read	{}	\N	{}	[]	2025-06-13 16:21:23.993	2025-06-13 16:21:23.993	2025-06-13 16:21:23.993	\N	\N	\N
78	jdm99satg1y9y64zvkusmcse	plugin::email.settings.read	{}	\N	{}	[]	2025-06-13 16:21:23.999	2025-06-13 16:21:23.999	2025-06-13 16:21:23.999	\N	\N	\N
79	y2qznwda6mv9ux5ccd59vob6	plugin::upload.read	{}	\N	{}	[]	2025-06-13 16:21:24.002	2025-06-13 16:21:24.002	2025-06-13 16:21:24.003	\N	\N	\N
80	qzp7fhili1u0kjlvjvbouamf	plugin::upload.assets.create	{}	\N	{}	[]	2025-06-13 16:21:24.007	2025-06-13 16:21:24.007	2025-06-13 16:21:24.007	\N	\N	\N
81	l2g7hx93rmr31n762v2aetsi	plugin::upload.assets.update	{}	\N	{}	[]	2025-06-13 16:21:24.01	2025-06-13 16:21:24.01	2025-06-13 16:21:24.011	\N	\N	\N
82	mpqb2ks108d2ev39hq4h86a7	plugin::upload.assets.download	{}	\N	{}	[]	2025-06-13 16:21:24.015	2025-06-13 16:21:24.015	2025-06-13 16:21:24.015	\N	\N	\N
83	a6w4t27iirdkm5jo99bcsbe7	plugin::upload.assets.copy-link	{}	\N	{}	[]	2025-06-13 16:21:24.019	2025-06-13 16:21:24.019	2025-06-13 16:21:24.019	\N	\N	\N
84	zklx20hhrzs1orka863uj0mg	plugin::upload.configure-view	{}	\N	{}	[]	2025-06-13 16:21:24.023	2025-06-13 16:21:24.023	2025-06-13 16:21:24.023	\N	\N	\N
85	mihd22rj8mix0isot53mshnh	plugin::upload.settings.read	{}	\N	{}	[]	2025-06-13 16:21:24.027	2025-06-13 16:21:24.027	2025-06-13 16:21:24.027	\N	\N	\N
86	pfv4t8ocq3nhtgq8wp6by9jd	plugin::i18n.locale.create	{}	\N	{}	[]	2025-06-13 16:21:24.032	2025-06-13 16:21:24.032	2025-06-13 16:21:24.032	\N	\N	\N
87	tlg4ni98gu5m4gjsc369sh2a	plugin::i18n.locale.read	{}	\N	{}	[]	2025-06-13 16:21:24.036	2025-06-13 16:21:24.036	2025-06-13 16:21:24.036	\N	\N	\N
88	gn2468a05h4zn5gfoj00t4ii	plugin::i18n.locale.update	{}	\N	{}	[]	2025-06-13 16:21:24.04	2025-06-13 16:21:24.04	2025-06-13 16:21:24.04	\N	\N	\N
89	drzloj8qbqbdmaqkp8nn2el3	plugin::i18n.locale.delete	{}	\N	{}	[]	2025-06-13 16:21:24.044	2025-06-13 16:21:24.044	2025-06-13 16:21:24.044	\N	\N	\N
90	ptoakhbon9bl5n69gv8dyvpt	plugin::seo.read	{}	\N	{}	[]	2025-06-13 16:21:24.049	2025-06-13 16:21:24.049	2025-06-13 16:21:24.049	\N	\N	\N
91	rg5zugyehxyl5ky77dy6kpu0	plugin::config-sync.settings.read	{}	\N	{}	[]	2025-06-13 16:21:24.052	2025-06-13 16:21:24.052	2025-06-13 16:21:24.052	\N	\N	\N
92	j2zm9dhcsdvew4cgfd8vg2my	plugin::config-sync.menu-link	{}	\N	{}	[]	2025-06-13 16:21:24.056	2025-06-13 16:21:24.056	2025-06-13 16:21:24.056	\N	\N	\N
93	qr9fk368li4fsqnm7ycy1sm9	plugin::users-permissions.roles.create	{}	\N	{}	[]	2025-06-13 16:21:24.06	2025-06-13 16:21:24.06	2025-06-13 16:21:24.06	\N	\N	\N
94	ha603gneuhpflxwb24wyxrue	plugin::users-permissions.roles.read	{}	\N	{}	[]	2025-06-13 16:21:24.066	2025-06-13 16:21:24.066	2025-06-13 16:21:24.066	\N	\N	\N
95	ss5to75zxbqxmn7640kx2ji0	plugin::users-permissions.roles.update	{}	\N	{}	[]	2025-06-13 16:21:24.07	2025-06-13 16:21:24.07	2025-06-13 16:21:24.07	\N	\N	\N
96	l1xhp8h7idnzqnagxk9d8abk	plugin::users-permissions.roles.delete	{}	\N	{}	[]	2025-06-13 16:21:24.074	2025-06-13 16:21:24.074	2025-06-13 16:21:24.074	\N	\N	\N
97	vuqda7gt71ckpt4b5swcnvnc	plugin::users-permissions.providers.read	{}	\N	{}	[]	2025-06-13 16:21:24.079	2025-06-13 16:21:24.079	2025-06-13 16:21:24.079	\N	\N	\N
98	zkaadiyk6j8woccwp5ag17qy	plugin::users-permissions.providers.update	{}	\N	{}	[]	2025-06-13 16:21:24.084	2025-06-13 16:21:24.084	2025-06-13 16:21:24.084	\N	\N	\N
99	iprg0057u7tn4jwg4gpjp345	plugin::users-permissions.email-templates.read	{}	\N	{}	[]	2025-06-13 16:21:24.088	2025-06-13 16:21:24.088	2025-06-13 16:21:24.088	\N	\N	\N
100	wg1daavgwg6v6jlwgyzqgx94	plugin::users-permissions.email-templates.update	{}	\N	{}	[]	2025-06-13 16:21:24.092	2025-06-13 16:21:24.092	2025-06-13 16:21:24.092	\N	\N	\N
101	ubb4tcvsqqxff8jr8uhqko0l	plugin::users-permissions.advanced-settings.read	{}	\N	{}	[]	2025-06-13 16:21:24.097	2025-06-13 16:21:24.097	2025-06-13 16:21:24.097	\N	\N	\N
102	i5jwwce527urhq64doi4k5gp	plugin::users-permissions.advanced-settings.update	{}	\N	{}	[]	2025-06-13 16:21:24.101	2025-06-13 16:21:24.101	2025-06-13 16:21:24.102	\N	\N	\N
103	ky2dzls769uox48e5kfgwnrp	admin::marketplace.read	{}	\N	{}	[]	2025-06-13 16:21:24.106	2025-06-13 16:21:24.106	2025-06-13 16:21:24.106	\N	\N	\N
104	admb4vyo7tkd4ailwcwj3xie	admin::webhooks.create	{}	\N	{}	[]	2025-06-13 16:21:24.111	2025-06-13 16:21:24.111	2025-06-13 16:21:24.111	\N	\N	\N
105	tfhg9pl9dy9s4zxm3w2jp12l	admin::webhooks.read	{}	\N	{}	[]	2025-06-13 16:21:24.116	2025-06-13 16:21:24.116	2025-06-13 16:21:24.117	\N	\N	\N
106	rbjjfpc3m9koi8u0qtma40tw	admin::webhooks.update	{}	\N	{}	[]	2025-06-13 16:21:24.121	2025-06-13 16:21:24.121	2025-06-13 16:21:24.121	\N	\N	\N
107	wswxd1p76x2vak8mjelxaxin	admin::webhooks.delete	{}	\N	{}	[]	2025-06-13 16:21:24.126	2025-06-13 16:21:24.126	2025-06-13 16:21:24.126	\N	\N	\N
108	gfwk8sjmapbd8h8hmujik0br	admin::users.create	{}	\N	{}	[]	2025-06-13 16:21:24.132	2025-06-13 16:21:24.132	2025-06-13 16:21:24.133	\N	\N	\N
109	ae5w30w6ev8sgx8phtxnyeic	admin::users.read	{}	\N	{}	[]	2025-06-13 16:21:24.137	2025-06-13 16:21:24.137	2025-06-13 16:21:24.137	\N	\N	\N
110	rbs3o9pxhwa2wnaumufwik5z	admin::users.update	{}	\N	{}	[]	2025-06-13 16:21:24.143	2025-06-13 16:21:24.143	2025-06-13 16:21:24.143	\N	\N	\N
111	babib4qsppkoqnax3j44cajw	admin::users.delete	{}	\N	{}	[]	2025-06-13 16:21:24.148	2025-06-13 16:21:24.148	2025-06-13 16:21:24.148	\N	\N	\N
112	b3d8xy5x63jt6kljwlcsxx2a	admin::roles.create	{}	\N	{}	[]	2025-06-13 16:21:24.154	2025-06-13 16:21:24.154	2025-06-13 16:21:24.154	\N	\N	\N
113	yh9as2rftoh71wt2nbfetffl	admin::roles.read	{}	\N	{}	[]	2025-06-13 16:21:24.159	2025-06-13 16:21:24.159	2025-06-13 16:21:24.16	\N	\N	\N
114	r3o3z6q2o1jy9oih65fkapbz	admin::roles.update	{}	\N	{}	[]	2025-06-13 16:21:24.165	2025-06-13 16:21:24.165	2025-06-13 16:21:24.165	\N	\N	\N
115	lf97rmei3l3qr0gakb3wi33f	admin::roles.delete	{}	\N	{}	[]	2025-06-13 16:21:24.17	2025-06-13 16:21:24.17	2025-06-13 16:21:24.17	\N	\N	\N
116	arw4wmovw42a9b0spundrql1	admin::api-tokens.access	{}	\N	{}	[]	2025-06-13 16:21:24.174	2025-06-13 16:21:24.174	2025-06-13 16:21:24.174	\N	\N	\N
117	tazlviz18vcfrnwd3cijs13n	admin::api-tokens.create	{}	\N	{}	[]	2025-06-13 16:21:24.179	2025-06-13 16:21:24.179	2025-06-13 16:21:24.179	\N	\N	\N
118	cxzxtrdy2442ka0k3d04y3k1	admin::api-tokens.read	{}	\N	{}	[]	2025-06-13 16:21:24.183	2025-06-13 16:21:24.183	2025-06-13 16:21:24.184	\N	\N	\N
119	liitiaieujm967d2ccrly45r	admin::api-tokens.update	{}	\N	{}	[]	2025-06-13 16:21:24.188	2025-06-13 16:21:24.188	2025-06-13 16:21:24.188	\N	\N	\N
120	mdnhnaljsh2qr6ora5gn13o6	admin::api-tokens.regenerate	{}	\N	{}	[]	2025-06-13 16:21:24.192	2025-06-13 16:21:24.192	2025-06-13 16:21:24.193	\N	\N	\N
121	bx79j8lxm21eaizg2bow74kx	admin::api-tokens.delete	{}	\N	{}	[]	2025-06-13 16:21:24.197	2025-06-13 16:21:24.197	2025-06-13 16:21:24.197	\N	\N	\N
122	to8hh0uppg21i7p4ls1d9nar	admin::project-settings.update	{}	\N	{}	[]	2025-06-13 16:21:24.203	2025-06-13 16:21:24.203	2025-06-13 16:21:24.203	\N	\N	\N
123	xefht1qy0f2tpvidvxodzm4q	admin::project-settings.read	{}	\N	{}	[]	2025-06-13 16:21:24.211	2025-06-13 16:21:24.211	2025-06-13 16:21:24.211	\N	\N	\N
124	wu75a6iv8s78fqtk792cuq7r	admin::transfer.tokens.access	{}	\N	{}	[]	2025-06-13 16:21:24.216	2025-06-13 16:21:24.216	2025-06-13 16:21:24.216	\N	\N	\N
125	i164l798ukzdh3l5p9cbtwjy	admin::transfer.tokens.create	{}	\N	{}	[]	2025-06-13 16:21:24.22	2025-06-13 16:21:24.22	2025-06-13 16:21:24.22	\N	\N	\N
126	jteq71u31ctrowk8glzwps2r	admin::transfer.tokens.read	{}	\N	{}	[]	2025-06-13 16:21:24.224	2025-06-13 16:21:24.224	2025-06-13 16:21:24.224	\N	\N	\N
127	rqj7x8kqsbxldyn1kxuadc6r	admin::transfer.tokens.update	{}	\N	{}	[]	2025-06-13 16:21:24.228	2025-06-13 16:21:24.228	2025-06-13 16:21:24.229	\N	\N	\N
128	s0zhw679gw6kxprh3ek27djt	admin::transfer.tokens.regenerate	{}	\N	{}	[]	2025-06-13 16:21:24.232	2025-06-13 16:21:24.232	2025-06-13 16:21:24.232	\N	\N	\N
129	kk3nxp8d9ai31ga1gzbncfwc	admin::transfer.tokens.delete	{}	\N	{}	[]	2025-06-13 16:21:24.236	2025-06-13 16:21:24.236	2025-06-13 16:21:24.236	\N	\N	\N
132	cvro720z9qdztivxoidmrp4v	plugin::content-manager.explorer.create	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.831	2025-06-13 19:14:39.831	2025-06-13 19:14:39.832	\N	\N	\N
130	rzo5z95rsdlb9qpfsf1kvn4c	plugin::content-manager.explorer.create	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.839	2025-06-13 19:14:39.839	2025-06-13 19:14:39.84	\N	\N	\N
141	uqzjhxtvquezs167k7u0tpqx	plugin::content-manager.explorer.delete	{}	api::page.page	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.848	2025-06-13 19:14:39.848	2025-06-13 19:14:39.848	\N	\N	\N
136	bp645ewo057yerd9h15wtvvf	plugin::content-manager.explorer.update	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.853	2025-06-13 19:14:39.853	2025-06-13 19:14:39.854	\N	\N	\N
143	r70az1rxncfnwgwcpmvw4mnw	plugin::content-manager.explorer.publish	{}	api::navbar.navbar	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.859	2025-06-13 19:14:39.859	2025-06-13 19:14:39.859	\N	\N	\N
144	klflmypi8tn5x2khqse18l6l	plugin::content-manager.explorer.publish	{}	api::page.page	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.864	2025-06-13 19:14:39.864	2025-06-13 19:14:39.864	\N	\N	\N
135	gn4u0wlfey6w1sfit7qlqwch	plugin::content-manager.explorer.read	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.869	2025-06-13 19:14:39.869	2025-06-13 19:14:39.869	\N	\N	\N
142	pmmoavkcnfe8cz14gcqbjjvy	plugin::content-manager.explorer.publish	{}	api::footer.footer	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.874	2025-06-13 19:14:39.874	2025-06-13 19:14:39.874	\N	\N	\N
131	t42iene6axo864iuy2utllml	plugin::content-manager.explorer.create	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.88	2025-06-13 19:14:39.88	2025-06-13 19:14:39.88	\N	\N	\N
139	ykg3atntwz1htxt7tsz8nod4	plugin::content-manager.explorer.delete	{}	api::footer.footer	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.885	2025-06-13 19:14:39.885	2025-06-13 19:14:39.885	\N	\N	\N
137	r6pmilkh850jj7zw70weuagp	plugin::content-manager.explorer.update	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.89	2025-06-13 19:14:39.89	2025-06-13 19:14:39.89	\N	\N	\N
138	ioj7gai800j9s7o9u3hwtxqe	plugin::content-manager.explorer.update	{}	api::page.page	{"fields": ["title", "breadcrumbTitle", "slug", "fullPath", "content", "children", "parent", "seo.metaTitle", "seo.metaDescription", "seo.metaImage", "seo.keywords", "seo.twitter.card", "seo.twitter.title", "seo.twitter.description", "seo.twitter.siteId", "seo.twitter.creator", "seo.twitter.creatorId", "seo.twitter.images", "seo.og.title", "seo.og.description", "seo.og.url", "seo.og.type", "seo.og.image", "seo.applicationName", "seo.siteName", "seo.email", "seo.canonicalUrl", "seo.metaRobots", "seo.structuredData"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.895	2025-06-13 19:14:39.895	2025-06-13 19:14:39.896	\N	\N	\N
134	jvmpsewgnma9073dp7cun3nt	plugin::content-manager.explorer.read	{}	api::navbar.navbar	{"fields": ["links.label", "links.href", "links.newTab", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.9	2025-06-13 19:14:39.9	2025-06-13 19:14:39.9	\N	\N	\N
140	y32dh3lzjbft4rs3rnb96t22	plugin::content-manager.explorer.delete	{}	api::navbar.navbar	{"locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.904	2025-06-13 19:14:39.904	2025-06-13 19:14:39.904	\N	\N	\N
133	kntywxgbs4hgvoo1n17witzw	plugin::content-manager.explorer.read	{}	api::footer.footer	{"fields": ["sections.title", "sections.links.label", "sections.links.href", "sections.links.newTab", "links.label", "links.href", "links.newTab", "copyRight", "logoImage.image.media", "logoImage.image.alt", "logoImage.image.width", "logoImage.image.height", "logoImage.image.fallbackSrc", "logoImage.link.label", "logoImage.link.href", "logoImage.link.newTab"], "locales": ["cs", "en", "vi"]}	[]	2025-06-13 19:14:39.909	2025-06-13 19:14:39.909	2025-06-13 19:14:39.909	\N	\N	\N
\.


--
-- Data for Name: admin_permissions_role_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.admin_permissions_role_lnk (id, permission_id, role_id, permission_ord) FROM stdin;
1	1	2	1
2	2	2	2
3	3	2	3
4	4	2	4
5	5	2	5
6	6	2	6
7	7	2	7
8	8	2	8
9	9	2	9
10	10	2	10
11	11	2	11
12	12	2	12
16	16	2	16
20	20	2	20
21	21	2	21
22	22	2	22
23	23	2	23
24	24	2	24
25	25	2	25
26	26	2	26
27	27	3	1
28	28	3	2
29	29	3	3
30	30	3	4
31	31	3	5
32	32	3	6
33	33	3	7
34	34	3	8
35	35	3	9
36	36	3	10
37	37	3	11
38	38	3	12
42	42	3	16
43	43	3	17
44	44	3	18
45	45	3	19
46	46	3	20
47	47	3	21
48	48	3	22
49	49	1	1
53	53	1	5
54	54	1	6
58	58	1	10
59	59	1	11
63	63	1	15
64	64	1	16
68	68	1	20
69	69	1	21
73	73	1	25
74	74	1	26
75	75	1	27
76	76	1	28
77	77	1	29
78	78	1	30
79	79	1	31
80	80	1	32
81	81	1	33
82	82	1	34
83	83	1	35
84	84	1	36
85	85	1	37
86	86	1	38
87	87	1	39
88	88	1	40
89	89	1	41
90	90	1	42
91	91	1	43
92	92	1	44
93	93	1	45
94	94	1	46
95	95	1	47
96	96	1	48
97	97	1	49
98	98	1	50
99	99	1	51
100	100	1	52
101	101	1	53
102	102	1	54
103	103	1	55
104	104	1	56
105	105	1	57
106	106	1	58
107	107	1	59
108	108	1	60
109	109	1	61
110	110	1	62
111	111	1	63
112	112	1	64
113	113	1	65
114	114	1	66
115	115	1	67
116	116	1	68
117	117	1	69
118	118	1	70
119	119	1	71
120	120	1	72
121	121	1	73
122	122	1	74
123	123	1	75
124	124	1	76
125	125	1	77
126	126	1	78
127	127	1	79
128	128	1	80
129	129	1	81
190	132	1	82
191	130	1	83
192	141	1	84
193	136	1	85
194	143	1	86
195	144	1	87
196	135	1	88
197	142	1	89
198	131	1	90
199	139	1	91
200	137	1	92
201	138	1	93
202	134	1	94
203	140	1	95
204	133	1	96
\.


--
-- Data for Name: admin_roles; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	z7244rsz01sluju9tjsq3v4w	Super Admin	strapi-super-admin	Super Admins can access and manage all features and settings.	2025-06-13 16:21:23.538	2025-06-13 16:21:23.538	2025-06-13 16:21:23.538	\N	\N	\N
2	y6k4exd4ssn4r8mo8ud1ex09	Editor	strapi-editor	Editors can manage and publish contents including those of other users.	2025-06-13 16:21:23.55	2025-06-13 16:21:23.55	2025-06-13 16:21:23.55	\N	\N	\N
3	gtk2uztt215wecf8wztqaf67	Author	strapi-author	Authors can manage the content they have created.	2025-06-13 16:21:23.554	2025-06-13 16:21:23.554	2025-06-13 16:21:23.554	\N	\N	\N
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.admin_users (id, document_id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	qbpnt8d0e8geuftwobpoecop	Anh	Le	\N	joy@joy.vn	$2a$10$XIL.0jxm6QsXvpdZYPJQ1esmUAOl8Qohyhs.ar096hm2kJMWEET7S	\N	\N	t	f	\N	2025-06-13 16:22:02.09	2025-06-13 16:22:02.09	2025-06-13 16:22:02.091	\N	\N	\N
\.


--
-- Data for Name: admin_users_roles_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.admin_users_roles_lnk (id, user_id, role_id, role_ord, user_ord) FROM stdin;
1	1	1	1	1
\.


--
-- Data for Name: components_elements_footer_items; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_elements_footer_items (id, title) FROM stdin;
1	Pages
2	Pages
3	Pages
\.


--
-- Data for Name: components_elements_footer_items_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_elements_footer_items_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	utilities.link	links	1
2	1	2	utilities.link	links	2
3	2	18	utilities.link	links	1
4	2	19	utilities.link	links	2
5	3	21	utilities.link	links	1
6	3	22	utilities.link	links	2
\.


--
-- Data for Name: components_forms_contact_forms; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_forms_contact_forms (id, title, description) FROM stdin;
1	Contact Us	Have questions, feedback, or want to contribute? We’d love to hear from you. Whether you’re building with the starter, planning to use it in production, or have suggestions for improvement—reach out!
2	Contact Us	Have questions, feedback, or want to contribute? We’d love to hear from you. Whether you’re building with the starter, planning to use it in production, or have suggestions for improvement—reach out!
\.


--
-- Data for Name: components_forms_contact_forms_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_forms_contact_forms_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_forms_newsletter_forms; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_forms_newsletter_forms (id, title, description) FROM stdin;
\.


--
-- Data for Name: components_forms_newsletter_forms_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_forms_newsletter_forms_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_sections_animated_logo_rows; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_animated_logo_rows (id, text) FROM stdin;
1	Technologies
2	Technologies
\.


--
-- Data for Name: components_sections_animated_logo_rows_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_animated_logo_rows_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	utilities.basic-image	logos	1
2	1	2	utilities.basic-image	logos	2
3	1	3	utilities.basic-image	logos	3
4	1	4	utilities.basic-image	logos	4
5	2	6	utilities.basic-image	logos	1
6	2	7	utilities.basic-image	logos	2
7	2	8	utilities.basic-image	logos	3
8	2	9	utilities.basic-image	logos	4
\.


--
-- Data for Name: components_sections_carousels; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_carousels (id, radius) FROM stdin;
1	lg
2	lg
\.


--
-- Data for Name: components_sections_carousels_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_carousels_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	utilities.image-with-link	images	1
2	1	2	utilities.image-with-link	images	2
3	1	3	utilities.image-with-link	images	3
4	2	4	utilities.image-with-link	images	1
5	2	5	utilities.image-with-link	images	2
6	2	6	utilities.image-with-link	images	3
\.


--
-- Data for Name: components_sections_faqs; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_faqs (id, title, sub_title) FROM stdin;
1	FAQ	\N
2	FAQ	\N
\.


--
-- Data for Name: components_sections_faqs_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_faqs_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	utilities.accordions	accordions	1
2	1	2	utilities.accordions	accordions	2
3	1	3	utilities.accordions	accordions	3
4	1	4	utilities.accordions	accordions	4
5	2	5	utilities.accordions	accordions	1
6	2	6	utilities.accordions	accordions	2
7	2	7	utilities.accordions	accordions	3
8	2	8	utilities.accordions	accordions	4
\.


--
-- Data for Name: components_sections_heading_with_cta_buttons; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_heading_with_cta_buttons (id, title, sub_text) FROM stdin;
1	Modern Stack, Zero Setup	Everything you need, preconfigured!
2	Modern Stack, Zero Setup	Everything you need, preconfigured!
\.


--
-- Data for Name: components_sections_heading_with_cta_buttons_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_heading_with_cta_buttons_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	10	utilities.link	cta	\N
2	2	14	utilities.link	cta	\N
\.


--
-- Data for Name: components_sections_heroes; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_heroes (id, title, sub_title, bg_color) FROM stdin;
1	Strapi + NextJS	Monorepo Starter	\N
2	Strapi + NextJS	Monorepo Starter	\N
\.


--
-- Data for Name: components_sections_heroes_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_heroes_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	6	utilities.link	links	1
2	1	7	utilities.link	links	2
3	1	5	utilities.basic-image	image	\N
4	2	8	utilities.link	links	1
5	2	9	utilities.link	links	2
6	2	10	utilities.basic-image	image	\N
\.


--
-- Data for Name: components_sections_horizontal_images; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_horizontal_images (id, title, spacing, image_radius, fixed_image_height, fixed_image_width) FROM stdin;
\.


--
-- Data for Name: components_sections_horizontal_images_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_horizontal_images_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_sections_image_with_cta_buttons; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_image_with_cta_buttons (id, title, sub_text) FROM stdin;
\.


--
-- Data for Name: components_sections_image_with_cta_buttons_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_sections_image_with_cta_buttons_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_meta_socials; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_meta_socials (id, social_network, title, description) FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_seo_ogs; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_seo_ogs (id, title, description, url, type) FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_seo_twitters; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_seo_twitters (id, card, title, description, site_id, creator, creator_id) FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_seos; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_seos (id, meta_title, meta_description, keywords, application_name, site_name, email, canonical_url, meta_robots, structured_data) FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_seos_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_seos_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_social_icons; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_social_icons (id, title) FROM stdin;
\.


--
-- Data for Name: components_seo_utilities_social_icons_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_seo_utilities_social_icons_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_utilities_accordions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_accordions (id, question, answer) FROM stdin;
1	What is this starter project for?	This starter provides a fully configured monorepo setup combining Strapi v5 (as the headless CMS) with Next.js 14 (for the frontend), including TypeScript, Tailwind CSS, Shadcn/ui, and Turborepo. It's ideal for building scalable, fullstack applications quickly without wasting time on boilerplate setup.
2	Can I deploy the backend and frontend separately?	Yes. While the monorepo makes local development easy, the Strapi backend and Next.js frontend can be deployed independently on services like Vercel, Strapi Cloud, Heroku or DigitalOcean. Environment variables and Docker support make deployments flexible and environment-specific.
3	Does it support TypeScript end-to-end?	Absolutely. Both the backend (Strapi) and frontend (Next.js) are fully written in TypeScript. Shared types are included so your API contracts remain consistent across the entire stack.
4	How do I customize or extend the CMS?	Strapi v5 plugins and extensions are supported out of the box. You can add custom content types, controllers, routes, and policies using the provided TypeScript scaffolding. It's fully adaptable to your business logic and data model needs.
5	What is this starter project for?	This starter provides a fully configured monorepo setup combining Strapi v5 (as the headless CMS) with Next.js 14 (for the frontend), including TypeScript, Tailwind CSS, Shadcn/ui, and Turborepo. It's ideal for building scalable, fullstack applications quickly without wasting time on boilerplate setup.
6	Can I deploy the backend and frontend separately?	Yes. While the monorepo makes local development easy, the Strapi backend and Next.js frontend can be deployed independently on services like Vercel, Strapi Cloud, Heroku or DigitalOcean. Environment variables and Docker support make deployments flexible and environment-specific.
7	Does it support TypeScript end-to-end?	Absolutely. Both the backend (Strapi) and frontend (Next.js) are fully written in TypeScript. Shared types are included so your API contracts remain consistent across the entire stack.
8	How do I customize or extend the CMS?	Strapi v5 plugins and extensions are supported out of the box. You can add custom content types, controllers, routes, and policies using the provided TypeScript scaffolding. It's fully adaptable to your business logic and data model needs.
\.


--
-- Data for Name: components_utilities_basic_images; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_basic_images (id, alt, width, height, fallback_src) FROM stdin;
1	strapi	\N	\N	\N
2	nextjs	\N	\N	\N
3	tailwindcss	\N	\N	\N
4	shadcn/ui	\N	\N	\N
5	starter-template	\N	\N	\N
6	strapi	\N	\N	\N
7	nextjs	\N	\N	\N
8	tailwindcss	\N	\N	\N
9	shadcn/ui	\N	\N	\N
10	starter-template	\N	\N	\N
11	carousel1	\N	\N	\N
12	carousel-2	\N	\N	\N
13	carousel-3	\N	\N	\N
14	carousel1	\N	\N	\N
15	carousel-2	\N	\N	\N
16	carousel-3	\N	\N	\N
\.


--
-- Data for Name: components_utilities_ck_editor_contents; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_ck_editor_contents (id, content) FROM stdin;
1	<h3 style="text-align:center;">🚀 Kickstart your project development&nbsp;</h3><p style="text-align:center;"><span style="color:var(--color-muted-foreground);">Build Faster with the Ultimate Monorepo Starter for Strapi &amp; Next.js</span></p>
2	<h3 style="text-align:center;">🚀 Kickstart your project development&nbsp;</h3><p style="text-align:center;"><span style="color:var(--color-muted-foreground);">Build Faster with the Ultimate Monorepo Starter for Strapi &amp; Next.js</span></p>
\.


--
-- Data for Name: components_utilities_image_with_links; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_image_with_links (id) FROM stdin;
1
2
3
4
5
6
7
8
9
10
\.


--
-- Data for Name: components_utilities_image_with_links_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_image_with_links_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	11	utilities.basic-image	image	\N
2	2	12	utilities.basic-image	image	\N
3	3	13	utilities.basic-image	image	\N
4	1	11	utilities.link	link	\N
5	2	12	utilities.link	link	\N
6	3	13	utilities.link	link	\N
7	4	14	utilities.basic-image	image	\N
8	5	15	utilities.basic-image	image	\N
9	6	16	utilities.basic-image	image	\N
10	4	15	utilities.link	link	\N
11	5	16	utilities.link	link	\N
12	6	17	utilities.link	link	\N
\.


--
-- Data for Name: components_utilities_links; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_links (id, label, href, new_tab) FROM stdin;
1	Page 1	/page1	\N
2	Page 2	/page2	\N
3	Notum technologies	https://notum.cz/en/	t
4	Page 1	/page1	\N
5	Page 2	/page2	\N
6	Github	https://github.com/notum-cz/strapi-next-monorepo-starter	t
7	Notum	https://notum.cz/en/	t
8	Github	https://github.com/notum-cz/strapi-next-monorepo-starter	t
9	Notum	https://notum.cz/en/	t
10	Get Started	https://github.com/notum-cz/strapi-next-monorepo-starter	t
11	carousel1	#	\N
12	carousel-2	#	\N
13	carousel-3	#	\N
14	Get Started	https://github.com/notum-cz/strapi-next-monorepo-starter	t
15	carousel1	#	\N
16	carousel-2	#	\N
17	carousel-3	#	\N
18	Page 1	/page1	\N
19	Page 2	/page2	\N
20	Notum technologies	https://notum.cz/en/	t
21	Page 1	/page1	\N
22	Page 2	/page2	\N
23	Notum technologies	https://notum.cz/en/	t
24	Page 1	/page1	\N
25	Page 2	/page2	\N
26	Page 1	/page1	\N
27	Page 2	/page2	\N
\.


--
-- Data for Name: components_utilities_links_with_titles; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_links_with_titles (id, title) FROM stdin;
\.


--
-- Data for Name: components_utilities_links_with_titles_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_links_with_titles_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
\.


--
-- Data for Name: components_utilities_texts; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.components_utilities_texts (id, text) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.files (id, document_id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, folder_path, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
7	gw07ww94v48qn0h6bkyaysgj	images (1).png	\N	\N	474	106	{"thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_images_1_bbe0e5df33.png", "hash": "thumbnail_images_1_bbe0e5df33", "mime": "image/png", "name": "thumbnail_images (1).png", "path": null, "size": 5.56, "width": 245, "height": 55, "sizeInBytes": 5555}}	images_1_bbe0e5df33	.png	image/png	2.65	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/images_1_bbe0e5df33.png	\N	aws-s3	\N	/	2025-05-08 21:05:57.274	2025-05-08 21:05:57.274	2025-05-08 21:05:57.274	\N	\N	\N
8	fvcp8qi44dz3lto6h0txs76y	tailwind-css.svg	\N	\N	2500	866	\N	tailwind_css_0fda0a53a0	.svg	image/svg+xml	2.35	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/tailwind_css_0fda0a53a0.svg	\N	aws-s3	\N	/	2025-05-08 21:05:57.275	2025-05-08 21:05:57.275	2025-05-08 21:05:57.275	\N	\N	\N
1	ccjnki4cbtc4nc1qwkfc064z	221a294a.webp	\N	\N	1280	720	{"large": {"ext": ".webp", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_221a294a_4f4a1dd1be.webp", "hash": "large_221a294a_4f4a1dd1be", "mime": "image/webp", "name": "large_221a294a.webp", "path": null, "size": 23.03, "width": 1000, "height": 562, "sizeInBytes": 23028}, "small": {"ext": ".webp", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_221a294a_4f4a1dd1be.webp", "hash": "small_221a294a_4f4a1dd1be", "mime": "image/webp", "name": "small_221a294a.webp", "path": null, "size": 11.92, "width": 500, "height": 281, "sizeInBytes": 11924}, "medium": {"ext": ".webp", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_221a294a_4f4a1dd1be.webp", "hash": "medium_221a294a_4f4a1dd1be", "mime": "image/webp", "name": "medium_221a294a.webp", "path": null, "size": 17.72, "width": 750, "height": 422, "sizeInBytes": 17720}, "thumbnail": {"ext": ".webp", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_221a294a_4f4a1dd1be.webp", "hash": "thumbnail_221a294a_4f4a1dd1be", "mime": "image/webp", "name": "thumbnail_221a294a.webp", "path": null, "size": 5.65, "width": 245, "height": 138, "sizeInBytes": 5648}}	221a294a_4f4a1dd1be	.webp	image/webp	33.63	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/221a294a_4f4a1dd1be.webp	\N	aws-s3	\N	/	2025-05-08 20:43:22.569	2025-05-08 20:43:22.569	2025-05-08 20:43:22.569	\N	\N	\N
2	u5wgdy85u61l3qji5vbh6h46	ChatGPT Image May 7, 2025, 03_48_02 PM.png	\N	\N	1024	1024	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1.png", "hash": "large_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1", "mime": "image/png", "name": "large_ChatGPT Image May 7, 2025, 03_48_02 PM.png", "path": null, "size": 1086.78, "width": 1000, "height": 1000, "sizeInBytes": 1086778}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1.png", "hash": "small_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1", "mime": "image/png", "name": "small_ChatGPT Image May 7, 2025, 03_48_02 PM.png", "path": null, "size": 282.39, "width": 500, "height": 500, "sizeInBytes": 282392}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1.png", "hash": "medium_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1", "mime": "image/png", "name": "medium_ChatGPT Image May 7, 2025, 03_48_02 PM.png", "path": null, "size": 643.1, "width": 750, "height": 750, "sizeInBytes": 643099}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1.png", "hash": "thumbnail_Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1", "mime": "image/png", "name": "thumbnail_ChatGPT Image May 7, 2025, 03_48_02 PM.png", "path": null, "size": 32.5, "width": 156, "height": 156, "sizeInBytes": 32498}}	Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1	.png	image/png	304.41	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Chat_GPT_Image_May_7_2025_03_48_02_PM_134056fcb1.png	\N	aws-s3	\N	/	2025-05-08 20:43:22.842	2025-05-08 20:43:22.842	2025-05-08 20:43:22.843	\N	\N	\N
3	lklxbgd1lvvboowts469badq	ChatGPT Image May 7, 2025, 03_43_27 PM.png	\N	\N	1024	1536	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17.png", "hash": "large_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17", "mime": "image/png", "name": "large_ChatGPT Image May 7, 2025, 03_43_27 PM.png", "path": null, "size": 564.55, "width": 667, "height": 1000, "sizeInBytes": 564547}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17.png", "hash": "small_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17", "mime": "image/png", "name": "small_ChatGPT Image May 7, 2025, 03_43_27 PM.png", "path": null, "size": 138.15, "width": 333, "height": 500, "sizeInBytes": 138154}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17.png", "hash": "medium_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17", "mime": "image/png", "name": "medium_ChatGPT Image May 7, 2025, 03_43_27 PM.png", "path": null, "size": 310.29, "width": 500, "height": 750, "sizeInBytes": 310291}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17.png", "hash": "thumbnail_Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17", "mime": "image/png", "name": "thumbnail_ChatGPT Image May 7, 2025, 03_43_27 PM.png", "path": null, "size": 17.94, "width": 104, "height": 156, "sizeInBytes": 17944}}	Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17	.png	image/png	382.08	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Chat_GPT_Image_May_7_2025_03_43_27_PM_95766c4c17.png	\N	aws-s3	\N	/	2025-05-08 20:43:23.074	2025-05-08 20:43:23.074	2025-05-08 20:43:23.074	\N	\N	\N
4	mwhf74tznd38zqyr6anj9fcv	ChatGPT Image May 7, 2025, 03_43_26 PM.png	\N	\N	1024	1536	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65.png", "hash": "large_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65", "mime": "image/png", "name": "large_ChatGPT Image May 7, 2025, 03_43_26 PM.png", "path": null, "size": 785.65, "width": 667, "height": 1000, "sizeInBytes": 785654}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65.png", "hash": "small_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65", "mime": "image/png", "name": "small_ChatGPT Image May 7, 2025, 03_43_26 PM.png", "path": null, "size": 190.07, "width": 333, "height": 500, "sizeInBytes": 190066}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65.png", "hash": "medium_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65", "mime": "image/png", "name": "medium_ChatGPT Image May 7, 2025, 03_43_26 PM.png", "path": null, "size": 428.89, "width": 500, "height": 750, "sizeInBytes": 428888}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65.png", "hash": "thumbnail_Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65", "mime": "image/png", "name": "thumbnail_ChatGPT Image May 7, 2025, 03_43_26 PM.png", "path": null, "size": 23.95, "width": 104, "height": 156, "sizeInBytes": 23952}}	Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65	.png	image/png	448.10	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Chat_GPT_Image_May_7_2025_03_43_26_PM_59e3296a65.png	\N	aws-s3	\N	/	2025-05-08 20:43:23.397	2025-05-08 20:43:23.397	2025-05-08 20:43:23.397	\N	\N	\N
5	tw7wgn1sj3al121vayj2eq08	ChatGPT Image May 7, 2025, 03_48_08 PM.png	\N	\N	1024	1024	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a.png", "hash": "large_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a", "mime": "image/png", "name": "large_ChatGPT Image May 7, 2025, 03_48_08 PM.png", "path": null, "size": 1086.78, "width": 1000, "height": 1000, "sizeInBytes": 1086778}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a.png", "hash": "small_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a", "mime": "image/png", "name": "small_ChatGPT Image May 7, 2025, 03_48_08 PM.png", "path": null, "size": 282.39, "width": 500, "height": 500, "sizeInBytes": 282392}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a.png", "hash": "medium_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a", "mime": "image/png", "name": "medium_ChatGPT Image May 7, 2025, 03_48_08 PM.png", "path": null, "size": 643.1, "width": 750, "height": 750, "sizeInBytes": 643099}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a.png", "hash": "thumbnail_Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a", "mime": "image/png", "name": "thumbnail_ChatGPT Image May 7, 2025, 03_48_08 PM.png", "path": null, "size": 32.5, "width": 156, "height": 156, "sizeInBytes": 32498}}	Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a	.png	image/png	304.41	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Chat_GPT_Image_May_7_2025_03_48_08_PM_51865c048a.png	\N	aws-s3	\N	/	2025-05-08 20:43:23.416	2025-05-08 20:43:23.416	2025-05-08 20:43:23.416	\N	\N	\N
6	zbuzga1viwjfotahoxkg3y5v	ChatGPT Image May 7, 2025, 03_48_04 PM.png	\N	\N	1024	1024	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5.png", "hash": "large_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5", "mime": "image/png", "name": "large_ChatGPT Image May 7, 2025, 03_48_04 PM.png", "path": null, "size": 1354.92, "width": 1000, "height": 1000, "sizeInBytes": 1354924}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5.png", "hash": "small_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5", "mime": "image/png", "name": "small_ChatGPT Image May 7, 2025, 03_48_04 PM.png", "path": null, "size": 340.37, "width": 500, "height": 500, "sizeInBytes": 340374}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5.png", "hash": "medium_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5", "mime": "image/png", "name": "medium_ChatGPT Image May 7, 2025, 03_48_04 PM.png", "path": null, "size": 788.77, "width": 750, "height": 750, "sizeInBytes": 788767}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5.png", "hash": "thumbnail_Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5", "mime": "image/png", "name": "thumbnail_ChatGPT Image May 7, 2025, 03_48_04 PM.png", "path": null, "size": 36.57, "width": 156, "height": 156, "sizeInBytes": 36573}}	Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5	.png	image/png	371.11	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Chat_GPT_Image_May_7_2025_03_48_04_PM_b42a6a45e5.png	\N	aws-s3	\N	/	2025-05-08 20:43:23.546	2025-05-08 20:43:32.513	2025-05-08 20:43:23.546	\N	\N	\N
9	qpkl5v8p06gsvaawa45foar8	next-js-logo-freelogovectors.net_.png	\N	\N	1280	800	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_next_js_logo_freelogovectors_net_10271b6b01.png", "hash": "large_next_js_logo_freelogovectors_net_10271b6b01", "mime": "image/png", "name": "large_next-js-logo-freelogovectors.net_.png", "path": null, "size": 21.3, "width": 1000, "height": 625, "sizeInBytes": 21299}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_next_js_logo_freelogovectors_net_10271b6b01.png", "hash": "small_next_js_logo_freelogovectors_net_10271b6b01", "mime": "image/png", "name": "small_next-js-logo-freelogovectors.net_.png", "path": null, "size": 8.84, "width": 500, "height": 313, "sizeInBytes": 8840}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_next_js_logo_freelogovectors_net_10271b6b01.png", "hash": "medium_next_js_logo_freelogovectors_net_10271b6b01", "mime": "image/png", "name": "medium_next-js-logo-freelogovectors.net_.png", "path": null, "size": 14.63, "width": 750, "height": 469, "sizeInBytes": 14628}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_next_js_logo_freelogovectors_net_10271b6b01.png", "hash": "thumbnail_next_js_logo_freelogovectors_net_10271b6b01", "mime": "image/png", "name": "thumbnail_next-js-logo-freelogovectors.net_.png", "path": null, "size": 4.38, "width": 245, "height": 153, "sizeInBytes": 4382}}	next_js_logo_freelogovectors_net_10271b6b01	.png	image/png	7.50	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/next_js_logo_freelogovectors_net_10271b6b01.png	\N	aws-s3	\N	/	2025-05-08 21:05:57.292	2025-05-08 21:05:57.292	2025-05-08 21:05:57.292	\N	\N	\N
10	tnddu9v9cy06ovg0x6b8i2xp	Strapi.full.logo.dark.D_WYV59t.png	\N	\N	1751	424	{"large": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/large_Strapi_full_logo_dark_D_WYV_59t_a110d4e695.png", "hash": "large_Strapi_full_logo_dark_D_WYV_59t_a110d4e695", "mime": "image/png", "name": "large_Strapi.full.logo.dark.D_WYV59t.png", "path": null, "size": 30.84, "width": 1000, "height": 242, "sizeInBytes": 30844}, "small": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/small_Strapi_full_logo_dark_D_WYV_59t_a110d4e695.png", "hash": "small_Strapi_full_logo_dark_D_WYV_59t_a110d4e695", "mime": "image/png", "name": "small_Strapi.full.logo.dark.D_WYV59t.png", "path": null, "size": 14.64, "width": 500, "height": 121, "sizeInBytes": 14635}, "medium": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/medium_Strapi_full_logo_dark_D_WYV_59t_a110d4e695.png", "hash": "medium_Strapi_full_logo_dark_D_WYV_59t_a110d4e695", "mime": "image/png", "name": "medium_Strapi.full.logo.dark.D_WYV59t.png", "path": null, "size": 22.16, "width": 750, "height": 182, "sizeInBytes": 22159}, "thumbnail": {"ext": ".png", "url": "https://strapi-next-starter.s3.eu-central-1.amazonaws.com/thumbnail_Strapi_full_logo_dark_D_WYV_59t_a110d4e695.png", "hash": "thumbnail_Strapi_full_logo_dark_D_WYV_59t_a110d4e695", "mime": "image/png", "name": "thumbnail_Strapi.full.logo.dark.D_WYV59t.png", "path": null, "size": 7.33, "width": 245, "height": 59, "sizeInBytes": 7328}}	Strapi_full_logo_dark_D_WYV_59t_a110d4e695	.png	image/png	11.36	https://strapi-next-starter.s3.eu-central-1.amazonaws.com/Strapi_full_logo_dark_D_WYV_59t_a110d4e695.png	\N	aws-s3	\N	/	2025-05-08 21:05:57.351	2025-05-08 21:05:57.351	2025-05-08 21:05:57.351	\N	\N	\N
\.


--
-- Data for Name: files_folder_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.files_folder_lnk (id, file_id, folder_id, file_ord) FROM stdin;
\.


--
-- Data for Name: files_related_mph; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.files_related_mph (id, file_id, related_id, related_type, field, "order") FROM stdin;
1	6	11	utilities.basic-image	media	1
2	4	12	utilities.basic-image	media	1
3	3	13	utilities.basic-image	media	1
4	6	14	utilities.basic-image	media	1
5	4	15	utilities.basic-image	media	1
6	3	16	utilities.basic-image	media	1
7	10	1	utilities.basic-image	media	1
8	9	2	utilities.basic-image	media	1
9	8	3	utilities.basic-image	media	1
10	7	4	utilities.basic-image	media	1
11	5	5	utilities.basic-image	media	1
12	10	6	utilities.basic-image	media	1
13	9	7	utilities.basic-image	media	1
14	8	8	utilities.basic-image	media	1
15	7	9	utilities.basic-image	media	1
16	5	10	utilities.basic-image	media	1
\.


--
-- Data for Name: footers; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.footers (id, document_id, copy_right, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	ls2f509pk1vy8i8c7k2v6qej	\N	2025-05-08 22:24:55.119	2025-05-08 22:24:55.119	2025-05-08 22:24:54.691	\N	\N	en
2	ls2f509pk1vy8i8c7k2v6qej	\N	2025-06-13 19:16:16.31	2025-06-13 19:16:16.31	2025-06-13 19:16:16.281	1	1	cs
3	ls2f509pk1vy8i8c7k2v6qej	\N	2025-06-13 19:16:25.721	2025-06-13 19:16:25.721	2025-06-13 19:16:25.701	1	1	vi
\.


--
-- Data for Name: footers_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.footers_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	elements.footer-item	sections	1
2	1	3	utilities.link	links	1
3	2	2	elements.footer-item	sections	1
4	2	20	utilities.link	links	1
5	2	7	utilities.image-with-link	logoImage	\N
6	3	3	elements.footer-item	sections	1
7	3	23	utilities.link	links	1
8	3	8	utilities.image-with-link	logoImage	\N
\.


--
-- Data for Name: i18n_locale; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.i18n_locale (id, document_id, name, code, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
5	hvyrypmy3iqn78cbjj0kmd6u	Czech (cs)	cs	2025-06-13 19:13:57.299	2025-06-13 19:13:57.299	2025-06-13 19:13:57.3	1	1	\N
4	b05qiqrbpfpco6w91sn0a19t	English (en)	en	2025-05-08 20:41:47.763	2025-06-13 19:14:30.852	2025-05-08 20:41:47.765	\N	1	\N
6	jnhqw3b9ed2qfkteyjxt1b7a	Vietnamese (vi)	vi	2025-06-13 19:14:39.587	2025-06-13 19:14:39.587	2025-06-13 19:14:39.587	1	1	\N
\.


--
-- Data for Name: navbars; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.navbars (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	rqov3pijy8hy4d6lwtat13vz	2025-05-08 21:59:22.612	2025-05-08 21:59:22.612	2025-05-08 21:59:22.422	\N	\N	en
2	rqov3pijy8hy4d6lwtat13vz	2025-06-13 19:16:48.273	2025-06-13 19:16:48.273	2025-06-13 19:16:48.256	1	1	cs
3	rqov3pijy8hy4d6lwtat13vz	2025-06-13 19:16:54.75	2025-06-13 19:16:54.75	2025-06-13 19:16:54.735	1	1	vi
\.


--
-- Data for Name: navbars_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.navbars_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	4	utilities.link	links	1
2	1	5	utilities.link	links	2
3	2	24	utilities.link	links	1
4	2	25	utilities.link	links	2
5	2	9	utilities.image-with-link	logoImage	\N
6	3	26	utilities.link	links	1
7	3	27	utilities.link	links	2
8	3	10	utilities.image-with-link	logoImage	\N
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.pages (id, document_id, title, breadcrumb_title, slug, full_path, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	p7d0agmr5oen6948c5g3c4lv	Index	Home	/	/	2025-05-08 20:45:34.276	2025-05-08 21:41:52.624	\N	\N	\N	en
2	p7d0agmr5oen6948c5g3c4lv	Index	Home	/	/	2025-05-08 20:45:34.276	2025-05-08 21:41:52.624	2025-05-08 21:41:56.043	\N	\N	en
3	ok1o858xfxd4do4jau9lx7ze	Page 1	Page 1	page1	/page1	2025-05-08 22:02:39.381	2025-05-08 22:31:02.477	\N	\N	\N	en
4	ok1o858xfxd4do4jau9lx7ze	Page 1	Page 1	page1	/page1	2025-05-08 22:02:39.381	2025-05-08 22:31:02.477	2025-05-08 22:31:06.546	\N	\N	en
5	zj18v623qcixxhyypoti1fm2	Page 2	Page 2	page2	/page2	2025-05-08 22:34:24.045	2025-05-08 22:34:24.045	\N	\N	\N	en
6	zj18v623qcixxhyypoti1fm2	Page 2	Page 2	page2	/page2	2025-05-08 22:34:24.045	2025-05-08 22:34:24.045	2025-05-08 22:34:25.02	\N	\N	en
\.


--
-- Data for Name: pages_cmps; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.pages_cmps (id, entity_id, cmp_id, component_type, field, "order") FROM stdin;
1	1	1	sections.hero	content	1
2	1	1	utilities.ck-editor-content	content	2
3	1	1	sections.animated-logo-row	content	3
4	2	2	sections.hero	content	1
5	2	2	utilities.ck-editor-content	content	2
6	2	2	sections.animated-logo-row	content	3
7	3	1	sections.heading-with-cta-button	content	1
8	3	1	sections.carousel	content	2
9	3	1	sections.faq	content	3
10	4	2	sections.heading-with-cta-button	content	1
11	4	2	sections.carousel	content	2
12	4	2	sections.faq	content	3
13	5	1	forms.contact-form	content	1
14	6	2	forms.contact-form	content	1
\.


--
-- Data for Name: pages_parent_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.pages_parent_lnk (id, page_id, inv_page_id, page_ord) FROM stdin;
1	3	1	1
2	4	2	1
3	5	1	2
4	6	2	2
\.


--
-- Data for Name: strapi_api_token_permissions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_api_token_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_api_token_permissions_token_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_api_token_permissions_token_lnk (id, api_token_permission_id, api_token_id, api_token_permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_api_tokens; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_api_tokens (id, document_id, name, description, type, access_key, last_used_at, expires_at, lifespan, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, encrypted_key) FROM stdin;
1	vrsybahfyxm0vyk5k3nz5y01	Read Only	A default API token with read-only permissions, only used for accessing resources	read-only	b0c81315c261d4c97507a94814e9df3bc5d6493f877c5cc3ecca8362f2096db7c8c3fa62322ec8602185b2751fc7e310445184372dd407c6f74e0e280195a596	\N	\N	\N	2025-06-13 16:21:24.308	2025-06-13 19:35:50.4	2025-06-13 16:21:24.308	\N	\N	\N	\N
2	sc3imwdft4ajzak9nrbkb5rx	Full Access	A default API token with full access permissions, used for accessing or modifying resources	full-access	6b039936cafec26a24d2e4e36132d519ecc40d7a93441235c9629ca7d85566d9f54e24aee5606750ddf0fc21f1d16cb464cb8c6103957479bf06825be488b556	\N	\N	\N	2025-06-13 16:21:24.317	2025-06-13 19:35:57.465	2025-06-13 16:21:24.317	\N	\N	\N	\N
\.


--
-- Data for Name: strapi_core_store_settings; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_core_store_settings (id, key, value, type, environment, tag) FROM stdin;
61	plugin_content_manager_configuration_components::seo-utilities.seo	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"metaTitle","defaultSortBy":"metaTitle","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"metaTitle":{"edit":{"label":"metaTitle","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"metaTitle","searchable":true,"sortable":true}},"metaDescription":{"edit":{"label":"metaDescription","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"metaDescription","searchable":true,"sortable":true}},"metaImage":{"edit":{"label":"metaImage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"metaImage","searchable":false,"sortable":false}},"keywords":{"edit":{"label":"keywords","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"keywords","searchable":true,"sortable":true}},"twitter":{"edit":{"label":"twitter","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"twitter","searchable":false,"sortable":false}},"og":{"edit":{"label":"og","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"og","searchable":false,"sortable":false}},"applicationName":{"edit":{"label":"applicationName","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"applicationName","searchable":true,"sortable":true}},"siteName":{"edit":{"label":"siteName","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"siteName","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"canonicalUrl":{"edit":{"label":"canonicalUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"canonicalUrl","searchable":true,"sortable":true}},"metaRobots":{"edit":{"label":"metaRobots","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"metaRobots","searchable":true,"sortable":true}},"structuredData":{"edit":{"label":"structuredData","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"structuredData","searchable":false,"sortable":false}}},"layouts":{"list":["id","metaTitle","metaDescription","metaImage"],"edit":[[{"name":"metaTitle","size":6},{"name":"metaDescription","size":6}],[{"name":"metaImage","size":6},{"name":"keywords","size":6}],[{"name":"twitter","size":12}],[{"name":"og","size":12}],[{"name":"applicationName","size":6},{"name":"siteName","size":6}],[{"name":"email","size":6},{"name":"canonicalUrl","size":6}],[{"name":"metaRobots","size":6}],[{"name":"structuredData","size":12}]]},"uid":"seo-utilities.seo","isComponent":true}	object	\N	\N
60	plugin_content_manager_configuration_components::seo-utilities.social-icons	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"socials":{"edit":{"label":"socials","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"socials","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","socials"],"edit":[[{"name":"title","size":6}],[{"name":"socials","size":12}]]},"uid":"seo-utilities.social-icons","isComponent":true}	object	\N	\N
53	strapi_content_types_schema	{"plugin::upload.file":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false},"folder":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"files","private":true},"folderPath":{"type":"string","minLength":1,"required":true,"private":true,"searchable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"files"}}},"indexes":[{"name":"upload_files_folder_path_index","columns":["folder_path"],"type":null},{"name":"upload_files_created_at_index","columns":["created_at"],"type":null},{"name":"upload_files_updated_at_index","columns":["updated_at"],"type":null},{"name":"upload_files_name_index","columns":["name"],"type":null},{"name":"upload_files_size_index","columns":["size"],"type":null},{"name":"upload_files_ext_index","columns":["ext"],"type":null}],"plugin":"upload","globalId":"UploadFile","uid":"plugin::upload.file","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false},"folder":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"files","private":true},"folderPath":{"type":"string","minLength":1,"required":true,"private":true,"searchable":false}},"kind":"collectionType"},"modelName":"file"},"plugin::upload.folder":{"collectionName":"upload_folders","info":{"singularName":"folder","pluralName":"folders","displayName":"Folder"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"required":true},"pathId":{"type":"integer","unique":true,"required":true},"parent":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"children"},"children":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","mappedBy":"parent"},"files":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","mappedBy":"folder"},"path":{"type":"string","minLength":1,"required":true},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"upload_folders"}}},"indexes":[{"name":"upload_folders_path_id_index","columns":["path_id"],"type":"unique"},{"name":"upload_folders_path_index","columns":["path"],"type":"unique"}],"plugin":"upload","globalId":"UploadFolder","uid":"plugin::upload.folder","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"upload_folders","info":{"singularName":"folder","pluralName":"folders","displayName":"Folder"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"required":true},"pathId":{"type":"integer","unique":true,"required":true},"parent":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"children"},"children":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","mappedBy":"parent"},"files":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","mappedBy":"folder"},"path":{"type":"string","minLength":1,"required":true}},"kind":"collectionType"},"modelName":"folder"},"plugin::i18n.locale":{"info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::i18n.locale","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"i18n_locale"}}},"plugin":"i18n","collectionName":"i18n_locale","globalId":"I18NLocale","uid":"plugin::i18n.locale","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"i18n_locale","info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false}},"kind":"collectionType"},"modelName":"locale"},"plugin::content-releases.release":{"collectionName":"strapi_releases","info":{"singularName":"release","pluralName":"releases","displayName":"Release"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true},"releasedAt":{"type":"datetime"},"scheduledAt":{"type":"datetime"},"timezone":{"type":"string"},"status":{"type":"enumeration","enum":["ready","blocked","failed","done","empty"],"required":true},"actions":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","mappedBy":"release"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_releases"}}},"plugin":"content-releases","globalId":"ContentReleasesRelease","uid":"plugin::content-releases.release","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_releases","info":{"singularName":"release","pluralName":"releases","displayName":"Release"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true},"releasedAt":{"type":"datetime"},"scheduledAt":{"type":"datetime"},"timezone":{"type":"string"},"status":{"type":"enumeration","enum":["ready","blocked","failed","done","empty"],"required":true},"actions":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","mappedBy":"release"}},"kind":"collectionType"},"modelName":"release"},"plugin::content-releases.release-action":{"collectionName":"strapi_release_actions","info":{"singularName":"release-action","pluralName":"release-actions","displayName":"Release Action"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"type":{"type":"enumeration","enum":["publish","unpublish"],"required":true},"contentType":{"type":"string","required":true},"entryDocumentId":{"type":"string"},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"release":{"type":"relation","relation":"manyToOne","target":"plugin::content-releases.release","inversedBy":"actions"},"isEntryValid":{"type":"boolean"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_release_actions"}}},"plugin":"content-releases","globalId":"ContentReleasesReleaseAction","uid":"plugin::content-releases.release-action","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_release_actions","info":{"singularName":"release-action","pluralName":"release-actions","displayName":"Release Action"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"type":{"type":"enumeration","enum":["publish","unpublish"],"required":true},"contentType":{"type":"string","required":true},"entryDocumentId":{"type":"string"},"locale":{"type":"string"},"release":{"type":"relation","relation":"manyToOne","target":"plugin::content-releases.release","inversedBy":"actions"},"isEntryValid":{"type":"boolean"}},"kind":"collectionType"},"modelName":"release-action"},"plugin::review-workflows.workflow":{"collectionName":"strapi_workflows","info":{"name":"Workflow","description":"","singularName":"workflow","pluralName":"workflows","displayName":"Workflow"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true,"unique":true},"stages":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToMany","mappedBy":"workflow"},"stageRequiredToPublish":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToOne","required":false},"contentTypes":{"type":"json","required":true,"default":"[]"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::review-workflows.workflow","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_workflows"}}},"plugin":"review-workflows","globalId":"ReviewWorkflowsWorkflow","uid":"plugin::review-workflows.workflow","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_workflows","info":{"name":"Workflow","description":"","singularName":"workflow","pluralName":"workflows","displayName":"Workflow"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true,"unique":true},"stages":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToMany","mappedBy":"workflow"},"stageRequiredToPublish":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToOne","required":false},"contentTypes":{"type":"json","required":true,"default":"[]"}},"kind":"collectionType"},"modelName":"workflow"},"plugin::review-workflows.workflow-stage":{"collectionName":"strapi_workflows_stages","info":{"name":"Workflow Stage","description":"","singularName":"workflow-stage","pluralName":"workflow-stages","displayName":"Stages"},"options":{"version":"1.1.0","draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false},"color":{"type":"string","configurable":false,"default":"#4945FF"},"workflow":{"type":"relation","target":"plugin::review-workflows.workflow","relation":"manyToOne","inversedBy":"stages","configurable":false},"permissions":{"type":"relation","target":"admin::permission","relation":"manyToMany","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::review-workflows.workflow-stage","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_workflows_stages"}}},"plugin":"review-workflows","globalId":"ReviewWorkflowsWorkflowStage","uid":"plugin::review-workflows.workflow-stage","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_workflows_stages","info":{"name":"Workflow Stage","description":"","singularName":"workflow-stage","pluralName":"workflow-stages","displayName":"Stages"},"options":{"version":"1.1.0"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false},"color":{"type":"string","configurable":false,"default":"#4945FF"},"workflow":{"type":"relation","target":"plugin::review-workflows.workflow","relation":"manyToOne","inversedBy":"stages","configurable":false},"permissions":{"type":"relation","target":"admin::permission","relation":"manyToMany","configurable":false}},"kind":"collectionType"},"modelName":"workflow-stage"},"plugin::users-permissions.permission":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_permissions"}}},"plugin":"users-permissions","globalId":"UsersPermissionsPermission","uid":"plugin::users-permissions.permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false}},"kind":"collectionType"},"modelName":"permission","options":{"draftAndPublish":false}},"plugin::users-permissions.role":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.role","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_roles"}}},"plugin":"users-permissions","globalId":"UsersPermissionsRole","uid":"plugin::users-permissions.role","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false}},"kind":"collectionType"},"modelName":"role","options":{"draftAndPublish":false}},"plugin::users-permissions.user":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"timestamps":true,"draftAndPublish":false},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_users"}}},"config":{"attributes":{"resetPasswordToken":{"hidden":true},"confirmationToken":{"hidden":true},"provider":{"hidden":true}}},"plugin":"users-permissions","globalId":"UsersPermissionsUser","uid":"plugin::users-permissions.user","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"timestamps":true},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false}},"kind":"collectionType"},"modelName":"user"},"api::footer.footer":{"kind":"singleType","collectionName":"footers","info":{"singularName":"footer","pluralName":"footers","displayName":"Footer","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"sections":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"elements.footer-item"},"links":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.link"},"copyRight":{"pluginOptions":{"i18n":{"localized":true}},"type":"string"},"logoImage":{"type":"component","repeatable":false,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.image-with-link"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":false,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::footer.footer","writable":false,"private":false,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"footers"}}},"apiName":"footer","globalId":"Footer","uid":"api::footer.footer","modelType":"contentType","__schema__":{"collectionName":"footers","info":{"singularName":"footer","pluralName":"footers","displayName":"Footer","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"sections":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"elements.footer-item"},"links":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.link"},"copyRight":{"pluginOptions":{"i18n":{"localized":true}},"type":"string"},"logoImage":{"type":"component","repeatable":false,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.image-with-link"}},"kind":"singleType"},"modelName":"footer","actions":{},"lifecycles":{}},"api::navbar.navbar":{"kind":"singleType","collectionName":"navbars","info":{"singularName":"navbar","pluralName":"navbars","displayName":"Navbar","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"links":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.link"},"logoImage":{"type":"component","repeatable":false,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.image-with-link"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":false,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::navbar.navbar","writable":false,"private":false,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"navbars"}}},"apiName":"navbar","globalId":"Navbar","uid":"api::navbar.navbar","modelType":"contentType","__schema__":{"collectionName":"navbars","info":{"singularName":"navbar","pluralName":"navbars","displayName":"Navbar","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"links":{"type":"component","repeatable":true,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.link"},"logoImage":{"type":"component","repeatable":false,"pluginOptions":{"i18n":{"localized":true}},"component":"utilities.image-with-link"}},"kind":"singleType"},"modelName":"navbar","actions":{},"lifecycles":{}},"api::page.page":{"kind":"collectionType","collectionName":"pages","info":{"singularName":"page","pluralName":"pages","displayName":"Page","description":""},"options":{"draftAndPublish":true},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"title":{"pluginOptions":{"i18n":{"localized":true}},"type":"string","required":true},"breadcrumbTitle":{"pluginOptions":{"i18n":{"localized":true}},"type":"string"},"slug":{"type":"string","required":true,"regex":"^[a-z0-9/-]+$","pluginOptions":{"i18n":{"localized":true}}},"fullPath":{"pluginOptions":{"i18n":{"localized":true}},"type":"string","required":false,"unique":true},"content":{"type":"dynamiczone","components":["sections.image-with-cta-button","sections.horizontal-images","sections.hero","sections.heading-with-cta-button","sections.faq","sections.carousel","sections.animated-logo-row","forms.newsletter-form","forms.contact-form","utilities.ck-editor-content"],"pluginOptions":{"i18n":{"localized":true}}},"children":{"type":"relation","relation":"oneToMany","target":"api::page.page","mappedBy":"parent"},"parent":{"type":"relation","relation":"manyToOne","target":"api::page.page","inversedBy":"children"},"seo":{"type":"component","repeatable":false,"component":"seo-utilities.seo","pluginOptions":{"i18n":{"localized":true}}},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":false,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::page.page","writable":false,"private":false,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"pages"}}},"apiName":"page","globalId":"Page","uid":"api::page.page","modelType":"contentType","__schema__":{"collectionName":"pages","info":{"singularName":"page","pluralName":"pages","displayName":"Page","description":""},"options":{"draftAndPublish":true},"pluginOptions":{"i18n":{"localized":true}},"attributes":{"title":{"pluginOptions":{"i18n":{"localized":true}},"type":"string","required":true},"breadcrumbTitle":{"pluginOptions":{"i18n":{"localized":true}},"type":"string"},"slug":{"type":"string","required":true,"regex":"^[a-z0-9/-]+$","pluginOptions":{"i18n":{"localized":true}}},"fullPath":{"pluginOptions":{"i18n":{"localized":true}},"type":"string","required":false,"unique":true},"content":{"type":"dynamiczone","components":["sections.image-with-cta-button","sections.horizontal-images","sections.hero","sections.heading-with-cta-button","sections.faq","sections.carousel","sections.animated-logo-row","forms.newsletter-form","forms.contact-form","utilities.ck-editor-content"],"pluginOptions":{"i18n":{"localized":true}}},"children":{"type":"relation","relation":"oneToMany","target":"api::page.page","mappedBy":"parent"},"parent":{"type":"relation","relation":"manyToOne","target":"api::page.page","inversedBy":"children"},"seo":{"type":"component","repeatable":false,"component":"seo-utilities.seo","pluginOptions":{"i18n":{"localized":true}}}},"kind":"collectionType"},"modelName":"page","actions":{},"lifecycles":{}},"api::subscriber.subscriber":{"kind":"collectionType","collectionName":"subscribers","info":{"singularName":"subscriber","pluralName":"subscribers","displayName":"Subscriber"},"options":{"draftAndPublish":false},"attributes":{"name":{"type":"string"},"email":{"type":"email"},"message":{"type":"text"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::subscriber.subscriber","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"subscribers"}}},"apiName":"subscriber","globalId":"Subscriber","uid":"api::subscriber.subscriber","modelType":"contentType","__schema__":{"collectionName":"subscribers","info":{"singularName":"subscriber","pluralName":"subscribers","displayName":"Subscriber"},"options":{"draftAndPublish":false},"attributes":{"name":{"type":"string"},"email":{"type":"email"},"message":{"type":"text"}},"kind":"collectionType"},"modelName":"subscriber","actions":{},"lifecycles":{}},"admin::permission":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"actionParameters":{"type":"json","configurable":false,"required":false,"default":{}},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_permissions"}}},"plugin":"admin","globalId":"AdminPermission","uid":"admin::permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"actionParameters":{"type":"json","configurable":false,"required":false,"default":{}},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"}},"kind":"collectionType"},"modelName":"permission"},"admin::user":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"registrationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false,"searchable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::user","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_users"}}},"config":{"attributes":{"resetPasswordToken":{"hidden":true},"registrationToken":{"hidden":true}}},"plugin":"admin","globalId":"AdminUser","uid":"admin::user","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"registrationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false,"searchable":false}},"kind":"collectionType"},"modelName":"user","options":{"draftAndPublish":false}},"admin::role":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::role","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_roles"}}},"plugin":"admin","globalId":"AdminRole","uid":"admin::role","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"}},"kind":"collectionType"},"modelName":"role"},"admin::api-token":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access","custom"],"configurable":false,"required":true,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true,"searchable":false},"encryptedKey":{"type":"text","minLength":1,"configurable":false,"required":false,"searchable":false},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::api-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::api-token","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_api_tokens"}}},"plugin":"admin","globalId":"AdminApiToken","uid":"admin::api-token","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access","custom"],"configurable":false,"required":true,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true,"searchable":false},"encryptedKey":{"type":"text","minLength":1,"configurable":false,"required":false,"searchable":false},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::api-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false}},"kind":"collectionType"},"modelName":"api-token"},"admin::api-token-permission":{"collectionName":"strapi_api_token_permissions","info":{"name":"API Token Permission","description":"","singularName":"api-token-permission","pluralName":"api-token-permissions","displayName":"API Token Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::api-token"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::api-token-permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_api_token_permissions"}}},"plugin":"admin","globalId":"AdminApiTokenPermission","uid":"admin::api-token-permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_api_token_permissions","info":{"name":"API Token Permission","description":"","singularName":"api-token-permission","pluralName":"api-token-permissions","displayName":"API Token Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::api-token"}},"kind":"collectionType"},"modelName":"api-token-permission"},"admin::transfer-token":{"collectionName":"strapi_transfer_tokens","info":{"name":"Transfer Token","singularName":"transfer-token","pluralName":"transfer-tokens","displayName":"Transfer Token","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::transfer-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::transfer-token","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_transfer_tokens"}}},"plugin":"admin","globalId":"AdminTransferToken","uid":"admin::transfer-token","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_transfer_tokens","info":{"name":"Transfer Token","singularName":"transfer-token","pluralName":"transfer-tokens","displayName":"Transfer Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::transfer-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false}},"kind":"collectionType"},"modelName":"transfer-token"},"admin::transfer-token-permission":{"collectionName":"strapi_transfer_token_permissions","info":{"name":"Transfer Token Permission","description":"","singularName":"transfer-token-permission","pluralName":"transfer-token-permissions","displayName":"Transfer Token Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::transfer-token"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":false},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::transfer-token-permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_transfer_token_permissions"}}},"plugin":"admin","globalId":"AdminTransferTokenPermission","uid":"admin::transfer-token-permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_transfer_token_permissions","info":{"name":"Transfer Token Permission","description":"","singularName":"transfer-token-permission","pluralName":"transfer-token-permissions","displayName":"Transfer Token Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::transfer-token"}},"kind":"collectionType"},"modelName":"transfer-token-permission"}}	object	\N	\N
63	plugin_content_manager_configuration_components::seo-utilities.seo-twitter	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"card","defaultSortBy":"card","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"card":{"edit":{"label":"card","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"card","searchable":true,"sortable":true}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"siteId":{"edit":{"label":"siteId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"siteId","searchable":true,"sortable":true}},"creator":{"edit":{"label":"creator","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"creator","searchable":true,"sortable":true}},"creatorId":{"edit":{"label":"creatorId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"creatorId","searchable":true,"sortable":true}},"images":{"edit":{"label":"images","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"images","searchable":false,"sortable":false}}},"layouts":{"list":["id","card","title","description"],"edit":[[{"name":"card","size":6},{"name":"title","size":6}],[{"name":"description","size":6},{"name":"siteId","size":6}],[{"name":"creator","size":6},{"name":"creatorId","size":6}],[{"name":"images","size":6}]]},"uid":"seo-utilities.seo-twitter","isComponent":true}	object	\N	\N
65	plugin_content_manager_configuration_components::seo-utilities.meta-social	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"socialNetwork":{"edit":{"label":"socialNetwork","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"socialNetwork","searchable":true,"sortable":true}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"image":{"edit":{"label":"image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"image","searchable":false,"sortable":false}}},"layouts":{"list":["id","socialNetwork","title","description"],"edit":[[{"name":"socialNetwork","size":6},{"name":"title","size":6}],[{"name":"description","size":6},{"name":"image","size":6}]]},"uid":"seo-utilities.meta-social","isComponent":true}	object	\N	\N
93	plugin_content_manager_configuration_content_types::plugin::users-permissions.role	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"users","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6},{"name":"permissions","size":6}],[{"name":"users","size":6}]]},"uid":"plugin::users-permissions.role"}	object	\N	\N
70	plugin_content_manager_configuration_components::sections.faq	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"subTitle":{"edit":{"label":"subTitle","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subTitle","searchable":true,"sortable":true}},"accordions":{"edit":{"label":"accordions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accordions","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","subTitle","accordions"],"edit":[[{"name":"title","size":6},{"name":"subTitle","size":6}],[{"name":"accordions","size":12}]]},"uid":"sections.faq","isComponent":true}	object	\N	\N
72	plugin_content_manager_configuration_components::sections.animated-logo-row	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"text","defaultSortBy":"text","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"text":{"edit":{"label":"text","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"text","searchable":true,"sortable":true}},"logos":{"edit":{"label":"logos","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"logos","searchable":false,"sortable":false}}},"layouts":{"list":["id","text","logos"],"edit":[[{"name":"text","size":6}],[{"name":"logos","size":12}]]},"uid":"sections.animated-logo-row","isComponent":true}	object	\N	\N
85	plugin_content_manager_configuration_content_types::admin::api-token	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"accessKey":{"edit":{"label":"accessKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accessKey","searchable":true,"sortable":true}},"encryptedKey":{"edit":{"label":"encryptedKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"encryptedKey","searchable":true,"sortable":true}},"lastUsedAt":{"edit":{"label":"lastUsedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastUsedAt","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"expiresAt":{"edit":{"label":"expiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"expiresAt","searchable":true,"sortable":true}},"lifespan":{"edit":{"label":"lifespan","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lifespan","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6},{"name":"accessKey","size":6}],[{"name":"lastUsedAt","size":6},{"name":"permissions","size":6}],[{"name":"expiresAt","size":6},{"name":"lifespan","size":4}],[{"name":"encryptedKey","size":6}]]},"uid":"admin::api-token"}	object	\N	\N
76	plugin_content_manager_configuration_content_types::plugin::upload.file	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"alternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"alternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"width","searchable":true,"sortable":true}},"height":{"edit":{"label":"height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"size","searchable":true,"sortable":true}},"url":{"edit":{"label":"url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"previewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"previewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider_metadata","searchable":false,"sortable":false}},"folder":{"edit":{"label":"folder","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"folder","searchable":true,"sortable":true}},"folderPath":{"edit":{"label":"folderPath","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"folderPath","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}],[{"name":"folder","size":6},{"name":"folderPath","size":6}]]},"uid":"plugin::upload.file"}	object	\N	\N
77	plugin_content_manager_configuration_content_types::plugin::content-releases.release	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"releasedAt":{"edit":{"label":"releasedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"releasedAt","searchable":true,"sortable":true}},"scheduledAt":{"edit":{"label":"scheduledAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"scheduledAt","searchable":true,"sortable":true}},"timezone":{"edit":{"label":"timezone","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"timezone","searchable":true,"sortable":true}},"status":{"edit":{"label":"status","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"status","searchable":true,"sortable":true}},"actions":{"edit":{"label":"actions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"contentType"},"list":{"label":"actions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","releasedAt","scheduledAt"],"edit":[[{"name":"name","size":6},{"name":"releasedAt","size":6}],[{"name":"scheduledAt","size":6},{"name":"timezone","size":6}],[{"name":"status","size":6},{"name":"actions","size":6}]]},"uid":"plugin::content-releases.release"}	object	\N	\N
78	plugin_content_manager_configuration_content_types::api::footer.footer	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"copyRight","defaultSortBy":"copyRight","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"sections":{"edit":{"label":"sections","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"sections","searchable":false,"sortable":false}},"links":{"edit":{"label":"links","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"links","searchable":false,"sortable":false}},"copyRight":{"edit":{"label":"copyRight","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"copyRight","searchable":true,"sortable":true}},"logoImage":{"edit":{"label":"logoImage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"logoImage","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","sections","links","copyRight"],"edit":[[{"name":"sections","size":12}],[{"name":"links","size":12}],[{"name":"copyRight","size":6}],[{"name":"logoImage","size":12}]]},"uid":"api::footer.footer"}	object	\N	\N
84	plugin_content_manager_configuration_content_types::admin::role	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"users","searchable":false,"sortable":false}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","description"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}],[{"name":"description","size":6},{"name":"users","size":6}],[{"name":"permissions","size":6}]]},"uid":"admin::role"}	object	\N	\N
71	plugin_content_manager_configuration_components::sections.carousel	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"images":{"edit":{"label":"images","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"images","searchable":false,"sortable":false}},"radius":{"edit":{"label":"radius","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"radius","searchable":true,"sortable":true}}},"layouts":{"list":["id","images","radius"],"edit":[[{"name":"images","size":12}],[{"name":"radius","size":6}]]},"uid":"sections.carousel","isComponent":true}	object	\N	\N
79	plugin_content_manager_configuration_content_types::api::navbar.navbar	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"links":{"edit":{"label":"links","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"links","searchable":false,"sortable":false}},"logoImage":{"edit":{"label":"logoImage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"logoImage","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","links","logoImage","createdAt"],"edit":[[{"name":"links","size":12}],[{"name":"logoImage","size":12}]]},"uid":"api::navbar.navbar"}	object	\N	\N
80	plugin_content_manager_configuration_content_types::api::page.page	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"breadcrumbTitle":{"edit":{"label":"breadcrumbTitle","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"breadcrumbTitle","searchable":true,"sortable":true}},"slug":{"edit":{"label":"slug","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"slug","searchable":true,"sortable":true}},"fullPath":{"edit":{"label":"fullPath","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"fullPath","searchable":true,"sortable":true}},"content":{"edit":{"label":"content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"content","searchable":false,"sortable":false}},"children":{"edit":{"label":"children","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"children","searchable":false,"sortable":false}},"parent":{"edit":{"label":"parent","description":"","placeholder":"","visible":true,"editable":true,"mainField":"title"},"list":{"label":"parent","searchable":true,"sortable":true}},"seo":{"edit":{"label":"seo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"seo","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","title","breadcrumbTitle","slug"],"edit":[[{"name":"title","size":6},{"name":"breadcrumbTitle","size":6}],[{"name":"slug","size":6},{"name":"fullPath","size":6}],[{"name":"content","size":12}],[{"name":"children","size":6},{"name":"parent","size":6}],[{"name":"seo","size":12}]]},"uid":"api::page.page"}	object	\N	\N
81	plugin_content_manager_configuration_content_types::api::subscriber.subscriber	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"message":{"edit":{"label":"message","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"message","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","email","message"],"edit":[[{"name":"name","size":6},{"name":"email","size":6}],[{"name":"message","size":6}]]},"uid":"api::subscriber.subscriber"}	object	\N	\N
82	plugin_content_manager_configuration_content_types::admin::permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"actionParameters":{"edit":{"label":"actionParameters","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"actionParameters","searchable":false,"sortable":false}},"subject":{"edit":{"label":"subject","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subject","searchable":true,"sortable":true}},"properties":{"edit":{"label":"properties","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"properties","searchable":false,"sortable":false}},"conditions":{"edit":{"label":"conditions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"conditions","searchable":false,"sortable":false}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","subject","role"],"edit":[[{"name":"action","size":6}],[{"name":"actionParameters","size":12}],[{"name":"subject","size":6}],[{"name":"properties","size":12}],[{"name":"conditions","size":12}],[{"name":"role","size":6}]]},"uid":"admin::permission"}	object	\N	\N
83	plugin_content_manager_configuration_content_types::admin::user	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"firstname","defaultSortBy":"firstname","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"firstname":{"edit":{"label":"firstname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"firstname","searchable":true,"sortable":true}},"lastname":{"edit":{"label":"lastname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastname","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"registrationToken":{"edit":{"label":"registrationToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"registrationToken","searchable":true,"sortable":true}},"isActive":{"edit":{"label":"isActive","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"isActive","searchable":true,"sortable":true}},"roles":{"edit":{"label":"roles","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"roles","searchable":false,"sortable":false}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"preferedLanguage":{"edit":{"label":"preferedLanguage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"preferedLanguage","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","firstname","lastname","username"],"edit":[[{"name":"firstname","size":6},{"name":"lastname","size":6}],[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"isActive","size":4}],[{"name":"roles","size":6},{"name":"blocked","size":4}],[{"name":"preferedLanguage","size":6}]]},"uid":"admin::user"}	object	\N	\N
87	plugin_content_manager_configuration_content_types::admin::transfer-token	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"accessKey":{"edit":{"label":"accessKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accessKey","searchable":true,"sortable":true}},"lastUsedAt":{"edit":{"label":"lastUsedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastUsedAt","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"expiresAt":{"edit":{"label":"expiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"expiresAt","searchable":true,"sortable":true}},"lifespan":{"edit":{"label":"lifespan","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lifespan","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","accessKey"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"accessKey","size":6},{"name":"lastUsedAt","size":6}],[{"name":"permissions","size":6},{"name":"expiresAt","size":6}],[{"name":"lifespan","size":4}]]},"uid":"admin::transfer-token"}	object	\N	\N
88	plugin_content_manager_configuration_content_types::admin::transfer-token-permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"token":{"edit":{"label":"token","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"token","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","token","createdAt"],"edit":[[{"name":"action","size":6},{"name":"token","size":6}]]},"uid":"admin::transfer-token-permission"}	object	\N	\N
86	plugin_content_manager_configuration_content_types::admin::api-token-permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"token":{"edit":{"label":"token","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"token","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","token","createdAt"],"edit":[[{"name":"action","size":6},{"name":"token","size":6}]]},"uid":"admin::api-token-permission"}	object	\N	\N
89	plugin_content_manager_configuration_content_types::plugin::upload.folder	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"pathId":{"edit":{"label":"pathId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"pathId","searchable":true,"sortable":true}},"parent":{"edit":{"label":"parent","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"parent","searchable":true,"sortable":true}},"children":{"edit":{"label":"children","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"children","searchable":false,"sortable":false}},"files":{"edit":{"label":"files","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"files","searchable":false,"sortable":false}},"path":{"edit":{"label":"path","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"path","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","pathId","parent"],"edit":[[{"name":"name","size":6},{"name":"pathId","size":4}],[{"name":"parent","size":6},{"name":"children","size":6}],[{"name":"files","size":6},{"name":"path","size":6}]]},"uid":"plugin::upload.folder"}	object	\N	\N
90	plugin_content_manager_configuration_content_types::plugin::users-permissions.user	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"confirmationToken":{"edit":{"label":"confirmationToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"confirmationToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","confirmed"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"confirmed","size":4}],[{"name":"blocked","size":4},{"name":"role","size":6}]]},"uid":"plugin::users-permissions.user"}	object	\N	\N
91	plugin_content_manager_configuration_content_types::plugin::i18n.locale	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","createdAt"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}]]},"uid":"plugin::i18n.locale"}	object	\N	\N
92	plugin_content_manager_configuration_content_types::plugin::users-permissions.permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","role","createdAt"],"edit":[[{"name":"action","size":6},{"name":"role","size":6}]]},"uid":"plugin::users-permissions.permission"}	object	\N	\N
97	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true,"autoOrientation":false}	object	\N	\N
98	plugin_upload_view_configuration	{"pageSize":10,"sort":"createdAt:DESC"}	object	\N	\N
100	plugin_users-permissions_grant	{"email":{"icon":"envelope","enabled":true},"discord":{"icon":"discord","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/discord/callback","scope":["identify","email"]},"facebook":{"icon":"facebook-square","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/facebook/callback","scope":["email"]},"google":{"icon":"google","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/google/callback","scope":["email"]},"github":{"icon":"github","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/github/callback","scope":["user","user:email"]},"microsoft":{"icon":"windows","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/microsoft/callback","scope":["user.read"]},"twitter":{"icon":"twitter","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/twitter/callback"},"instagram":{"icon":"instagram","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/instagram/callback","scope":["user_profile"]},"vk":{"icon":"vk","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/vk/callback","scope":["email"]},"twitch":{"icon":"twitch","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/twitch/callback","scope":["user:read:email"]},"linkedin":{"icon":"linkedin","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/linkedin/callback","scope":["r_liteprofile","r_emailaddress"]},"cognito":{"icon":"aws","enabled":false,"key":"","secret":"","subdomain":"my.subdomain.com","callback":"api/auth/cognito/callback","scope":["email","openid","profile"]},"reddit":{"icon":"reddit","enabled":false,"key":"","secret":"","callback":"api/auth/reddit/callback","scope":["identity"]},"auth0":{"icon":"","enabled":false,"key":"","secret":"","subdomain":"my-tenant.eu","callback":"api/auth/auth0/callback","scope":["openid","email","profile"]},"cas":{"icon":"book","enabled":false,"key":"","secret":"","callback":"api/auth/cas/callback","scope":["openid email"],"subdomain":"my.subdomain.com/cas"},"patreon":{"icon":"","enabled":false,"key":"","secret":"","callback":"api/auth/patreon/callback","scope":["identity","identity[email]"]},"keycloak":{"icon":"","enabled":false,"key":"","secret":"","subdomain":"myKeycloakProvider.com/realms/myrealm","callback":"api/auth/keycloak/callback","scope":["openid","email","profile"]}}	object	\N	\N
101	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object	\N	\N
102	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_reset_password":null,"email_confirmation_redirection":null,"default_role":"authenticated"}	object	\N	\N
99	plugin_upload_metrics	{"weeklySchedule":"59 10 19 * * 5","lastWeeklyUpdate":1749816659024}	object	\N	\N
103	core_admin_auth	{"providers":{"autoRegister":false,"defaultRole":null,"ssoLockedRoles":null}}	object	\N	\N
94	plugin_content_manager_configuration_content_types::plugin::content-releases.release-action	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"contentType","defaultSortBy":"contentType","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"contentType":{"edit":{"label":"contentType","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"contentType","searchable":true,"sortable":true}},"entryDocumentId":{"edit":{"label":"entryDocumentId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"entryDocumentId","searchable":true,"sortable":true}},"release":{"edit":{"label":"release","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"release","searchable":true,"sortable":true}},"isEntryValid":{"edit":{"label":"isEntryValid","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"isEntryValid","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","type","contentType","entryDocumentId"],"edit":[[{"name":"type","size":6},{"name":"contentType","size":6}],[{"name":"entryDocumentId","size":6},{"name":"release","size":6}],[{"name":"isEntryValid","size":4}]]},"uid":"plugin::content-releases.release-action"}	object	\N	\N
95	plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"stages":{"edit":{"label":"stages","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"stages","searchable":false,"sortable":false}},"stageRequiredToPublish":{"edit":{"label":"stageRequiredToPublish","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"stageRequiredToPublish","searchable":true,"sortable":true}},"contentTypes":{"edit":{"label":"contentTypes","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"contentTypes","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","stages","stageRequiredToPublish"],"edit":[[{"name":"name","size":6},{"name":"stages","size":6}],[{"name":"stageRequiredToPublish","size":6}],[{"name":"contentTypes","size":12}]]},"uid":"plugin::review-workflows.workflow"}	object	\N	\N
96	plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow-stage	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"color":{"edit":{"label":"color","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"color","searchable":true,"sortable":true}},"workflow":{"edit":{"label":"workflow","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"workflow","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","color","workflow"],"edit":[[{"name":"name","size":6},{"name":"color","size":6}],[{"name":"workflow","size":6},{"name":"permissions","size":6}]]},"uid":"plugin::review-workflows.workflow-stage"}	object	\N	\N
54	plugin_content_manager_configuration_components::utilities.text	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"text","defaultSortBy":"text","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"text":{"edit":{"label":"text","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"text","searchable":true,"sortable":true}}},"layouts":{"list":["id","text"],"edit":[[{"name":"text","size":6}]]},"uid":"utilities.text","isComponent":true}	object	\N	\N
56	plugin_content_manager_configuration_components::utilities.image-with-link	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"image":{"edit":{"label":"image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"image","searchable":false,"sortable":false}},"link":{"edit":{"label":"link","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"link","searchable":false,"sortable":false}}},"layouts":{"list":["id","image","link"],"edit":[[{"name":"image","size":12}],[{"name":"link","size":12}]]},"uid":"utilities.image-with-link","isComponent":true}	object	\N	\N
69	plugin_content_manager_configuration_components::sections.heading-with-cta-button	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"subText":{"edit":{"label":"subText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subText","searchable":true,"sortable":true}},"cta":{"edit":{"label":"cta","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"cta","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","subText","cta"],"edit":[[{"name":"title","size":6},{"name":"subText","size":6}],[{"name":"cta","size":12}]]},"uid":"sections.heading-with-cta-button","isComponent":true}	object	\N	\N
67	plugin_content_manager_configuration_components::sections.horizontal-images	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"images":{"edit":{"label":"images","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"images","searchable":false,"sortable":false}},"spacing":{"edit":{"label":"spacing","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"spacing","searchable":true,"sortable":true}},"imageRadius":{"edit":{"label":"imageRadius","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"imageRadius","searchable":true,"sortable":true}},"fixedImageHeight":{"edit":{"label":"fixedImageHeight","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"fixedImageHeight","searchable":true,"sortable":true}},"fixedImageWidth":{"edit":{"label":"fixedImageWidth","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"fixedImageWidth","searchable":true,"sortable":true}}},"layouts":{"list":["id","title","images","spacing"],"edit":[[{"name":"title","size":6}],[{"name":"images","size":12}],[{"name":"spacing","size":4},{"name":"imageRadius","size":6}],[{"name":"fixedImageHeight","size":4},{"name":"fixedImageWidth","size":4}]]},"uid":"sections.horizontal-images","isComponent":true}	object	\N	\N
59	plugin_content_manager_configuration_components::utilities.accordions	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"question","defaultSortBy":"question","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"question":{"edit":{"label":"question","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"question","searchable":true,"sortable":true}},"answer":{"edit":{"label":"answer","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"answer","searchable":true,"sortable":true}}},"layouts":{"list":["id","question","answer"],"edit":[[{"name":"question","size":6},{"name":"answer","size":6}]]},"uid":"utilities.accordions","isComponent":true}	object	\N	\N
58	plugin_content_manager_configuration_components::utilities.basic-image	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"alt","defaultSortBy":"alt","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"media":{"edit":{"label":"media","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"media","searchable":false,"sortable":false}},"alt":{"edit":{"label":"alt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"alt","searchable":true,"sortable":true}},"width":{"edit":{"label":"width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"width","searchable":true,"sortable":true}},"height":{"edit":{"label":"height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"height","searchable":true,"sortable":true}},"fallbackSrc":{"edit":{"label":"fallbackSrc","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"fallbackSrc","searchable":true,"sortable":true}}},"layouts":{"list":["id","media","alt","width"],"edit":[[{"name":"media","size":6},{"name":"alt","size":6}],[{"name":"width","size":4},{"name":"height","size":4}],[{"name":"fallbackSrc","size":6}]]},"uid":"utilities.basic-image","isComponent":true}	object	\N	\N
62	plugin_content_manager_configuration_components::utilities.links-with-title	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"links":{"edit":{"label":"links","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"links","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","links"],"edit":[[{"name":"title","size":6}],[{"name":"links","size":12}]]},"uid":"utilities.links-with-title","isComponent":true}	object	\N	\N
55	plugin_content_manager_configuration_components::utilities.link	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"label","defaultSortBy":"label","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"label":{"edit":{"label":"label","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"label","searchable":true,"sortable":true}},"href":{"edit":{"label":"href","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"href","searchable":true,"sortable":true}},"newTab":{"edit":{"label":"newTab","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"newTab","searchable":true,"sortable":true}}},"layouts":{"list":["id","label","href","newTab"],"edit":[[{"name":"label","size":6},{"name":"href","size":6}],[{"name":"newTab","size":4}]]},"uid":"utilities.link","isComponent":true}	object	\N	\N
57	plugin_content_manager_configuration_components::utilities.ck-editor-content	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"content":{"edit":{"label":"content","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"content","searchable":false,"sortable":false}}},"layouts":{"list":["id"],"edit":[[{"name":"content","size":12}]]},"uid":"utilities.ck-editor-content","isComponent":true}	object	\N	\N
68	plugin_content_manager_configuration_components::sections.hero	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"subTitle":{"edit":{"label":"subTitle","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subTitle","searchable":true,"sortable":true}},"links":{"edit":{"label":"links","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"links","searchable":false,"sortable":false}},"image":{"edit":{"label":"image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"image","searchable":false,"sortable":false}},"bgColor":{"edit":{"label":"bgColor","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"bgColor","searchable":true,"sortable":true}},"steps":{"edit":{"label":"steps","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"steps","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","subTitle","links"],"edit":[[{"name":"title","size":6},{"name":"subTitle","size":6}],[{"name":"links","size":12}],[{"name":"image","size":12}],[{"name":"bgColor","size":6}],[{"name":"steps","size":12}]]},"uid":"sections.hero","isComponent":true}	object	\N	\N
75	plugin_content_manager_configuration_components::elements.footer-item	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"links":{"edit":{"label":"links","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"links","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","links"],"edit":[[{"name":"title","size":6}],[{"name":"links","size":12}]]},"uid":"elements.footer-item","isComponent":true}	object	\N	\N
66	plugin_content_manager_configuration_components::sections.image-with-cta-button	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"subText":{"edit":{"label":"subText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subText","searchable":true,"sortable":true}},"image":{"edit":{"label":"image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"image","searchable":false,"sortable":false}},"link":{"edit":{"label":"link","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"link","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","subText","image"],"edit":[[{"name":"title","size":6},{"name":"subText","size":6}],[{"name":"image","size":12}],[{"name":"link","size":12}]]},"uid":"sections.image-with-cta-button","isComponent":true}	object	\N	\N
64	plugin_content_manager_configuration_components::seo-utilities.seo-og	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"url":{"edit":{"label":"url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"url","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"image":{"edit":{"label":"image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"image","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","description","url"],"edit":[[{"name":"title","size":6},{"name":"description","size":6}],[{"name":"url","size":6},{"name":"type","size":6}],[{"name":"image","size":6}]]},"uid":"seo-utilities.seo-og","isComponent":true}	object	\N	\N
73	plugin_content_manager_configuration_components::forms.newsletter-form	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"gdpr":{"edit":{"label":"gdpr","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"gdpr","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","description","gdpr"],"edit":[[{"name":"title","size":6},{"name":"description","size":6}],[{"name":"gdpr","size":12}]]},"uid":"forms.newsletter-form","isComponent":true}	object	\N	\N
74	plugin_content_manager_configuration_components::forms.contact-form	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"title","defaultSortBy":"title","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":false,"sortable":false}},"title":{"edit":{"label":"title","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"title","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"gdpr":{"edit":{"label":"gdpr","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"gdpr","searchable":false,"sortable":false}}},"layouts":{"list":["id","title","description","gdpr"],"edit":[[{"name":"title","size":6},{"name":"description","size":6}],[{"name":"gdpr","size":12}]]},"uid":"forms.contact-form","isComponent":true}	object	\N	\N
104	plugin_i18n_default_locale	"en"	string	\N	\N
105	plugin_seo_settings	{"api::footer.footer":{"collectionName":"footer","seoChecks":{"metaTitle":true,"metaDescription":true,"metaRobots":true,"metaSocial":true,"wordCount":true,"canonicalUrl":true,"keywordDensity":true,"structuredData":true,"alternativeText":true,"lastUpdatedAt":true}},"api::navbar.navbar":{"collectionName":"navbar","seoChecks":{"metaTitle":true,"metaDescription":true,"metaRobots":true,"metaSocial":true,"wordCount":true,"canonicalUrl":true,"keywordDensity":true,"structuredData":true,"alternativeText":true,"lastUpdatedAt":true}},"api::page.page":{"collectionName":"page","seoChecks":{"metaTitle":true,"metaDescription":true,"metaRobots":true,"metaSocial":true,"wordCount":true,"canonicalUrl":true,"keywordDensity":true,"structuredData":true,"alternativeText":true,"lastUpdatedAt":true}},"api::subscriber.subscriber":{"collectionName":"subscriber","seoChecks":{"metaTitle":true,"metaDescription":true,"metaRobots":true,"metaSocial":true,"wordCount":true,"canonicalUrl":true,"keywordDensity":true,"structuredData":true,"alternativeText":true,"lastUpdatedAt":true}}}	object	\N	\N
\.


--
-- Data for Name: strapi_database_schema; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_database_schema (id, schema, "time", hash) FROM stdin;
22	{"tables":[{"name":"files","indexes":[{"name":"upload_files_folder_path_index","columns":["folder_path"],"type":null},{"name":"upload_files_created_at_index","columns":["created_at"],"type":null},{"name":"upload_files_updated_at_index","columns":["updated_at"],"type":null},{"name":"upload_files_name_index","columns":["name"],"type":null},{"name":"upload_files_size_index","columns":["size"],"type":null},{"name":"upload_files_ext_index","columns":["ext"],"type":null},{"name":"files_documents_idx","columns":["document_id","locale","published_at"]},{"name":"files_created_by_id_fk","columns":["created_by_id"]},{"name":"files_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"files_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"files_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"alternative_text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"caption","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"width","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"height","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"formats","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"hash","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"ext","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"mime","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"size","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"preview_url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider_metadata","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"folder_path","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"upload_folders","indexes":[{"name":"upload_folders_path_id_index","columns":["path_id"],"type":"unique"},{"name":"upload_folders_path_index","columns":["path"],"type":"unique"},{"name":"upload_folders_documents_idx","columns":["document_id","locale","published_at"]},{"name":"upload_folders_created_by_id_fk","columns":["created_by_id"]},{"name":"upload_folders_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"upload_folders_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"upload_folders_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"path_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"path","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"i18n_locale","indexes":[{"name":"i18n_locale_documents_idx","columns":["document_id","locale","published_at"]},{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"]},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_releases","indexes":[{"name":"strapi_releases_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_releases_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_releases_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_releases_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_releases_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"released_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"scheduled_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"timezone","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_release_actions","indexes":[{"name":"strapi_release_actions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_release_actions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_release_actions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_release_actions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_release_actions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"content_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"entry_document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_entry_valid","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows","indexes":[{"name":"strapi_workflows_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_workflows_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_workflows_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_workflows_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_workflows_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"content_types","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_workflows_stages","indexes":[{"name":"strapi_workflows_stages_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_workflows_stages_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_workflows_stages_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_workflows_stages_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_workflows_stages_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"color","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_permissions","indexes":[{"name":"up_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_roles","indexes":[{"name":"up_roles_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_users","indexes":[{"name":"up_users_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_users_created_by_id_fk","columns":["created_by_id"]},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmation_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmed","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"footers_cmps","indexes":[{"name":"footers_field_idx","columns":["field"]},{"name":"footers_component_type_idx","columns":["component_type"]},{"name":"footers_entity_fk","columns":["entity_id"]},{"name":"footers_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"footers_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"footers","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"footers","indexes":[{"name":"footers_documents_idx","columns":["document_id","locale","published_at"]},{"name":"footers_created_by_id_fk","columns":["created_by_id"]},{"name":"footers_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"footers_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"footers_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"copy_right","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"navbars_cmps","indexes":[{"name":"navbars_field_idx","columns":["field"]},{"name":"navbars_component_type_idx","columns":["component_type"]},{"name":"navbars_entity_fk","columns":["entity_id"]},{"name":"navbars_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"navbars_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"navbars","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"navbars","indexes":[{"name":"navbars_documents_idx","columns":["document_id","locale","published_at"]},{"name":"navbars_created_by_id_fk","columns":["created_by_id"]},{"name":"navbars_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"navbars_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"navbars_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"pages_cmps","indexes":[{"name":"pages_field_idx","columns":["field"]},{"name":"pages_component_type_idx","columns":["component_type"]},{"name":"pages_entity_fk","columns":["entity_id"]},{"name":"pages_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"pages_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"pages","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"pages","indexes":[{"name":"pages_documents_idx","columns":["document_id","locale","published_at"]},{"name":"pages_created_by_id_fk","columns":["created_by_id"]},{"name":"pages_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"pages_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"pages_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"breadcrumb_title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"slug","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"full_path","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"subscribers","indexes":[{"name":"subscribers_documents_idx","columns":["document_id","locale","published_at"]},{"name":"subscribers_created_by_id_fk","columns":["created_by_id"]},{"name":"subscribers_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"subscribers_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"subscribers_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"message","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_permissions","indexes":[{"name":"admin_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action_parameters","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"subject","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"properties","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"conditions","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_users","indexes":[{"name":"admin_users_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_users_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"firstname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lastname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"registration_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_active","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"prefered_language","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_roles","indexes":[{"name":"admin_roles_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_api_tokens","indexes":[{"name":"strapi_api_tokens_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"access_key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"encrypted_key","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"last_used_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lifespan","type":"bigInteger","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_api_token_permissions","indexes":[{"name":"strapi_api_token_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_api_token_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_api_token_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_api_token_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_api_token_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_transfer_tokens","indexes":[{"name":"strapi_transfer_tokens_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_transfer_tokens_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_transfer_tokens_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_transfer_tokens_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_transfer_tokens_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"access_key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"last_used_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lifespan","type":"bigInteger","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_transfer_token_permissions","indexes":[{"name":"strapi_transfer_token_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_transfer_token_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_transfer_token_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_transfer_token_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_transfer_token_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_texts","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_links_with_titles_cmps","indexes":[{"name":"components_utilities_links_with_titles_field_idx","columns":["field"]},{"name":"components_utilities_links_withe4603_component_type_idx","columns":["component_type"]},{"name":"components_utilities_links_with_titles_entity_fk","columns":["entity_id"]},{"name":"components_utilities_links_with_titles_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_utilities_links_with_titles_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_utilities_links_with_titles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_utilities_links_with_titles","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_links","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"label","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"href","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"new_tab","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_image_with_links_cmps","indexes":[{"name":"components_utilities_image_with_links_field_idx","columns":["field"]},{"name":"components_utilities_image_with37a81_component_type_idx","columns":["component_type"]},{"name":"components_utilities_image_with_links_entity_fk","columns":["entity_id"]},{"name":"components_utilities_image_with_links_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_utilities_image_with_links_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_utilities_image_with_links","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_utilities_image_with_links","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false}]},{"name":"components_utilities_ck_editor_contents","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"content","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_basic_images","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"alt","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"width","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"height","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"fallback_src","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_utilities_accordions","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"question","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"answer","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_seo_utilities_social_icons_cmps","indexes":[{"name":"components_seo_utilities_social_icons_field_idx","columns":["field"]},{"name":"components_seo_utilities_sociale6b11_component_type_idx","columns":["component_type"]},{"name":"components_seo_utilities_social_icons_entity_fk","columns":["entity_id"]},{"name":"components_seo_utilities_social_icons_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_seo_utilities_social_icons_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_seo_utilities_social_icons","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_seo_utilities_social_icons","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_seo_utilities_seos_cmps","indexes":[{"name":"components_seo_utilities_seos_field_idx","columns":["field"]},{"name":"components_seo_utilities_seos_component_type_idx","columns":["component_type"]},{"name":"components_seo_utilities_seos_entity_fk","columns":["entity_id"]},{"name":"components_seo_utilities_seos_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_seo_utilities_seos_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_seo_utilities_seos","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_seo_utilities_seos","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"meta_title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"meta_description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"keywords","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"application_name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"site_name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"canonical_url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"meta_robots","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"structured_data","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_seo_utilities_seo_twitters","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"card","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"site_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"creator","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"creator_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_seo_utilities_seo_ogs","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_seo_utilities_meta_socials","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"social_network","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_image_with_cta_buttons_cmps","indexes":[{"name":"components_sections_image_with_cta_buttons_field_idx","columns":["field"]},{"name":"components_sections_image_with_7e8fc_component_type_idx","columns":["component_type"]},{"name":"components_sections_image_with_cta_buttons_entity_fk","columns":["entity_id"]},{"name":"components_sections_image_with_cta_buttons_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_image_with_cta_buttons_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_image_with_cta_buttons","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_image_with_cta_buttons","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"sub_text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_horizontal_images_cmps","indexes":[{"name":"components_sections_horizontal_images_field_idx","columns":["field"]},{"name":"components_sections_horizontal_1685d_component_type_idx","columns":["component_type"]},{"name":"components_sections_horizontal_images_entity_fk","columns":["entity_id"]},{"name":"components_sections_horizontal_images_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_horizontal_images_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_horizontal_images","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_horizontal_images","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"spacing","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"image_radius","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"fixed_image_height","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"fixed_image_width","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_heroes_cmps","indexes":[{"name":"components_sections_heroes_field_idx","columns":["field"]},{"name":"components_sections_heroes_component_type_idx","columns":["component_type"]},{"name":"components_sections_heroes_entity_fk","columns":["entity_id"]},{"name":"components_sections_heroes_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_heroes_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_heroes","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_heroes","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"sub_title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"bg_color","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_heading_with_cta_buttons_cmps","indexes":[{"name":"components_sections_heading_with_cta_buttons_field_idx","columns":["field"]},{"name":"components_sections_heading_wit3fa0d_component_type_idx","columns":["component_type"]},{"name":"components_sections_heading_with_cta_buttons_entity_fk","columns":["entity_id"]},{"name":"components_sections_heading_with_cta_buttons_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_heading_with_cta_buttons_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_heading_with_cta_buttons","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_heading_with_cta_buttons","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"sub_text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_faqs_cmps","indexes":[{"name":"components_sections_faqs_field_idx","columns":["field"]},{"name":"components_sections_faqs_component_type_idx","columns":["component_type"]},{"name":"components_sections_faqs_entity_fk","columns":["entity_id"]},{"name":"components_sections_faqs_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_faqs_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_faqs","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_faqs","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"sub_title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_carousels_cmps","indexes":[{"name":"components_sections_carousels_field_idx","columns":["field"]},{"name":"components_sections_carousels_component_type_idx","columns":["component_type"]},{"name":"components_sections_carousels_entity_fk","columns":["entity_id"]},{"name":"components_sections_carousels_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_carousels_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_carousels","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_carousels","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"radius","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_sections_animated_logo_rows_cmps","indexes":[{"name":"components_sections_animated_logo_rows_field_idx","columns":["field"]},{"name":"components_sections_animated_lofcbcf_component_type_idx","columns":["component_type"]},{"name":"components_sections_animated_logo_rows_entity_fk","columns":["entity_id"]},{"name":"components_sections_animated_logo_rows_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_sections_animated_logo_rows_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_sections_animated_logo_rows","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_sections_animated_logo_rows","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"text","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_forms_newsletter_forms_cmps","indexes":[{"name":"components_forms_newsletter_forms_field_idx","columns":["field"]},{"name":"components_forms_newsletter_forms_component_type_idx","columns":["component_type"]},{"name":"components_forms_newsletter_forms_entity_fk","columns":["entity_id"]},{"name":"components_forms_newsletter_forms_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_forms_newsletter_forms_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_forms_newsletter_forms","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_forms_newsletter_forms","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_forms_contact_forms_cmps","indexes":[{"name":"components_forms_contact_forms_field_idx","columns":["field"]},{"name":"components_forms_contact_forms_component_type_idx","columns":["component_type"]},{"name":"components_forms_contact_forms_entity_fk","columns":["entity_id"]},{"name":"components_forms_contact_forms_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_forms_contact_forms_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_forms_contact_forms","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_forms_contact_forms","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"components_elements_footer_items_cmps","indexes":[{"name":"components_elements_footer_items_field_idx","columns":["field"]},{"name":"components_elements_footer_items_component_type_idx","columns":["component_type"]},{"name":"components_elements_footer_items_entity_fk","columns":["entity_id"]},{"name":"components_elements_footer_items_uq","columns":["entity_id","cmp_id","field","component_type"],"type":"unique"}],"foreignKeys":[{"name":"components_elements_footer_items_entity_fk","columns":["entity_id"],"referencedColumns":["id"],"referencedTable":"components_elements_footer_items","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"entity_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"cmp_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"component_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"components_elements_footer_items","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"title","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_core_store_settings","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"value","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"environment","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"tag","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_webhooks","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"headers","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"events","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"enabled","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_history_versions","indexes":[{"name":"strapi_history_versions_created_by_id_fk","columns":["created_by_id"]}],"foreignKeys":[{"name":"strapi_history_versions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"content_type","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"related_document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"data","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"schema","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files_related_mph","indexes":[{"name":"files_related_mph_fk","columns":["file_id"]},{"name":"files_related_mph_oidx","columns":["order"]},{"name":"files_related_mph_idix","columns":["related_id"]}],"foreignKeys":[{"name":"files_related_mph_fk","columns":["file_id"],"referencedColumns":["id"],"referencedTable":"files","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"file_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files_folder_lnk","indexes":[{"name":"files_folder_lnk_fk","columns":["file_id"]},{"name":"files_folder_lnk_ifk","columns":["folder_id"]},{"name":"files_folder_lnk_uq","columns":["file_id","folder_id"],"type":"unique"},{"name":"files_folder_lnk_oifk","columns":["file_ord"]}],"foreignKeys":[{"name":"files_folder_lnk_fk","columns":["file_id"],"referencedColumns":["id"],"referencedTable":"files","onDelete":"CASCADE"},{"name":"files_folder_lnk_ifk","columns":["folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"file_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"file_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"upload_folders_parent_lnk","indexes":[{"name":"upload_folders_parent_lnk_fk","columns":["folder_id"]},{"name":"upload_folders_parent_lnk_ifk","columns":["inv_folder_id"]},{"name":"upload_folders_parent_lnk_uq","columns":["folder_id","inv_folder_id"],"type":"unique"},{"name":"upload_folders_parent_lnk_oifk","columns":["folder_ord"]}],"foreignKeys":[{"name":"upload_folders_parent_lnk_fk","columns":["folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"},{"name":"upload_folders_parent_lnk_ifk","columns":["inv_folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"inv_folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"folder_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_release_actions_release_lnk","indexes":[{"name":"strapi_release_actions_release_lnk_fk","columns":["release_action_id"]},{"name":"strapi_release_actions_release_lnk_ifk","columns":["release_id"]},{"name":"strapi_release_actions_release_lnk_uq","columns":["release_action_id","release_id"],"type":"unique"},{"name":"strapi_release_actions_release_lnk_oifk","columns":["release_action_ord"]}],"foreignKeys":[{"name":"strapi_release_actions_release_lnk_fk","columns":["release_action_id"],"referencedColumns":["id"],"referencedTable":"strapi_release_actions","onDelete":"CASCADE"},{"name":"strapi_release_actions_release_lnk_ifk","columns":["release_id"],"referencedColumns":["id"],"referencedTable":"strapi_releases","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"release_action_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"release_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"release_action_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stage_required_to_publish_lnk","indexes":[{"name":"strapi_workflows_stage_required_to_publish_lnk_fk","columns":["workflow_id"]},{"name":"strapi_workflows_stage_required_to_publish_lnk_ifk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stage_required_to_publish_lnk_uq","columns":["workflow_id","workflow_stage_id"],"type":"unique"}],"foreignKeys":[{"name":"strapi_workflows_stage_required_to_publish_lnk_fk","columns":["workflow_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows","onDelete":"CASCADE"},{"name":"strapi_workflows_stage_required_to_publish_lnk_ifk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stages_workflow_lnk","indexes":[{"name":"strapi_workflows_stages_workflow_lnk_fk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stages_workflow_lnk_ifk","columns":["workflow_id"]},{"name":"strapi_workflows_stages_workflow_lnk_uq","columns":["workflow_stage_id","workflow_id"],"type":"unique"},{"name":"strapi_workflows_stages_workflow_lnk_oifk","columns":["workflow_stage_ord"]}],"foreignKeys":[{"name":"strapi_workflows_stages_workflow_lnk_fk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"},{"name":"strapi_workflows_stages_workflow_lnk_ifk","columns":["workflow_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_stage_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stages_permissions_lnk","indexes":[{"name":"strapi_workflows_stages_permissions_lnk_fk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stages_permissions_lnk_ifk","columns":["permission_id"]},{"name":"strapi_workflows_stages_permissions_lnk_uq","columns":["workflow_stage_id","permission_id"],"type":"unique"},{"name":"strapi_workflows_stages_permissions_lnk_ofk","columns":["permission_ord"]}],"foreignKeys":[{"name":"strapi_workflows_stages_permissions_lnk_fk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"},{"name":"strapi_workflows_stages_permissions_lnk_ifk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"admin_permissions","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_permissions_role_lnk","indexes":[{"name":"up_permissions_role_lnk_fk","columns":["permission_id"]},{"name":"up_permissions_role_lnk_ifk","columns":["role_id"]},{"name":"up_permissions_role_lnk_uq","columns":["permission_id","role_id"],"type":"unique"},{"name":"up_permissions_role_lnk_oifk","columns":["permission_ord"]}],"foreignKeys":[{"name":"up_permissions_role_lnk_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"up_permissions","onDelete":"CASCADE"},{"name":"up_permissions_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_users_role_lnk","indexes":[{"name":"up_users_role_lnk_fk","columns":["user_id"]},{"name":"up_users_role_lnk_ifk","columns":["role_id"]},{"name":"up_users_role_lnk_uq","columns":["user_id","role_id"],"type":"unique"},{"name":"up_users_role_lnk_oifk","columns":["user_ord"]}],"foreignKeys":[{"name":"up_users_role_lnk_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"},{"name":"up_users_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"pages_parent_lnk","indexes":[{"name":"pages_parent_lnk_fk","columns":["page_id"]},{"name":"pages_parent_lnk_ifk","columns":["inv_page_id"]},{"name":"pages_parent_lnk_uq","columns":["page_id","inv_page_id"],"type":"unique"},{"name":"pages_parent_lnk_oifk","columns":["page_ord"]}],"foreignKeys":[{"name":"pages_parent_lnk_fk","columns":["page_id"],"referencedColumns":["id"],"referencedTable":"pages","onDelete":"CASCADE"},{"name":"pages_parent_lnk_ifk","columns":["inv_page_id"],"referencedColumns":["id"],"referencedTable":"pages","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"page_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"inv_page_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"page_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_permissions_role_lnk","indexes":[{"name":"admin_permissions_role_lnk_fk","columns":["permission_id"]},{"name":"admin_permissions_role_lnk_ifk","columns":["role_id"]},{"name":"admin_permissions_role_lnk_uq","columns":["permission_id","role_id"],"type":"unique"},{"name":"admin_permissions_role_lnk_oifk","columns":["permission_ord"]}],"foreignKeys":[{"name":"admin_permissions_role_lnk_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"admin_permissions","onDelete":"CASCADE"},{"name":"admin_permissions_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_users_roles_lnk","indexes":[{"name":"admin_users_roles_lnk_fk","columns":["user_id"]},{"name":"admin_users_roles_lnk_ifk","columns":["role_id"]},{"name":"admin_users_roles_lnk_uq","columns":["user_id","role_id"],"type":"unique"},{"name":"admin_users_roles_lnk_ofk","columns":["role_ord"]},{"name":"admin_users_roles_lnk_oifk","columns":["user_ord"]}],"foreignKeys":[{"name":"admin_users_roles_lnk_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"admin_users","onDelete":"CASCADE"},{"name":"admin_users_roles_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_api_token_permissions_token_lnk","indexes":[{"name":"strapi_api_token_permissions_token_lnk_fk","columns":["api_token_permission_id"]},{"name":"strapi_api_token_permissions_token_lnk_ifk","columns":["api_token_id"]},{"name":"strapi_api_token_permissions_token_lnk_uq","columns":["api_token_permission_id","api_token_id"],"type":"unique"},{"name":"strapi_api_token_permissions_token_lnk_oifk","columns":["api_token_permission_ord"]}],"foreignKeys":[{"name":"strapi_api_token_permissions_token_lnk_fk","columns":["api_token_permission_id"],"referencedColumns":["id"],"referencedTable":"strapi_api_token_permissions","onDelete":"CASCADE"},{"name":"strapi_api_token_permissions_token_lnk_ifk","columns":["api_token_id"],"referencedColumns":["id"],"referencedTable":"strapi_api_tokens","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"api_token_permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"api_token_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"api_token_permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_transfer_token_permissions_token_lnk","indexes":[{"name":"strapi_transfer_token_permissions_token_lnk_fk","columns":["transfer_token_permission_id"]},{"name":"strapi_transfer_token_permissions_token_lnk_ifk","columns":["transfer_token_id"]},{"name":"strapi_transfer_token_permissions_token_lnk_uq","columns":["transfer_token_permission_id","transfer_token_id"],"type":"unique"},{"name":"strapi_transfer_token_permissions_token_lnk_oifk","columns":["transfer_token_permission_ord"]}],"foreignKeys":[{"name":"strapi_transfer_token_permissions_token_lnk_fk","columns":["transfer_token_permission_id"],"referencedColumns":["id"],"referencedTable":"strapi_transfer_token_permissions","onDelete":"CASCADE"},{"name":"strapi_transfer_token_permissions_token_lnk_ifk","columns":["transfer_token_id"],"referencedColumns":["id"],"referencedTable":"strapi_transfer_tokens","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"transfer_token_permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"transfer_token_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"transfer_token_permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]}]}	2025-06-13 19:35:27.717	fcb5f39a690ea02cef97ca59d724c45d1efe64f181396d784e2d7c23a7926eb1
\.


--
-- Data for Name: strapi_history_versions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_history_versions (id, content_type, related_document_id, locale, status, data, schema, created_at, created_by_id) FROM stdin;
\.


--
-- Data for Name: strapi_migrations; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_migrations (id, name, "time") FROM stdin;
\.


--
-- Data for Name: strapi_migrations_internal; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_migrations_internal (id, name, "time") FROM stdin;
1	5.0.0-rename-identifiers-longer-than-max-length	2025-06-13 16:21:20.487
2	5.0.0-02-created-document-id	2025-06-13 16:21:20.542
3	5.0.0-03-created-locale	2025-06-13 16:21:20.597
4	5.0.0-04-created-published-at	2025-06-13 16:21:20.649
5	5.0.0-05-drop-slug-fields-index	2025-06-13 16:21:20.699
6	core::5.0.0-discard-drafts	2025-06-13 16:21:20.758
\.


--
-- Data for Name: strapi_release_actions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_release_actions (id, document_id, type, content_type, entry_document_id, locale, is_entry_valid, created_at, updated_at, published_at, created_by_id, updated_by_id) FROM stdin;
\.


--
-- Data for Name: strapi_release_actions_release_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_release_actions_release_lnk (id, release_action_id, release_id, release_action_ord) FROM stdin;
\.


--
-- Data for Name: strapi_releases; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_releases (id, document_id, name, released_at, scheduled_at, timezone, status, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_transfer_token_permissions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_transfer_token_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_transfer_token_permissions_token_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_transfer_token_permissions_token_lnk (id, transfer_token_permission_id, transfer_token_id, transfer_token_permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_transfer_tokens; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_transfer_tokens (id, document_id, name, description, access_key, last_used_at, expires_at, lifespan, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Data for Name: strapi_workflows; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_workflows (id, document_id, name, content_types, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stage_required_to_publish_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_workflows_stage_required_to_publish_lnk (id, workflow_id, workflow_stage_id) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_workflows_stages (id, document_id, name, color, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages_permissions_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_workflows_stages_permissions_lnk (id, workflow_stage_id, permission_id, permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages_workflow_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.strapi_workflows_stages_workflow_lnk (id, workflow_stage_id, workflow_id, workflow_stage_ord) FROM stdin;
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.subscribers (id, document_id, name, email, message, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	my6nqgp64maoawg6039zohui	Tomáš Jakúbek	tmsjkbk@gmail.com	asf aasf sa. sa a s	2025-05-09 01:06:37.351	2025-05-09 01:06:37.351	2025-05-09 01:06:37.349	\N	\N	\N
\.


--
-- Data for Name: up_permissions; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.up_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
10	c942ti5w98l1vws4q0236o8s	plugin::users-permissions.user.me	2025-05-08 20:41:49.266	2025-05-08 20:41:49.266	2025-05-08 20:41:49.268	\N	\N	\N
11	rn5bub8qkam36wp2me9dni05	plugin::users-permissions.auth.changePassword	2025-05-08 20:41:49.266	2025-05-08 20:41:49.266	2025-05-08 20:41:49.268	\N	\N	\N
12	rm4s9ha0jn37vu3ok7cj42it	plugin::users-permissions.auth.connect	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
13	yg2abyvdcnxu9nv6y81x7owz	plugin::users-permissions.auth.emailConfirmation	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
14	kkaqdl58sab1xw9o5irdfwki	plugin::users-permissions.auth.register	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
15	r27tx4q516i8tmkqhwbliwqi	plugin::users-permissions.auth.resetPassword	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
16	ipdi4gogrfpuw478apl9w1js	plugin::users-permissions.auth.forgotPassword	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
17	hm077wfb70pwtuj6hzxvxdys	plugin::users-permissions.auth.callback	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
18	jb1sikqefhk6sagf1qhu34hw	plugin::users-permissions.auth.sendEmailConfirmation	2025-05-08 20:41:49.557	2025-05-08 20:41:49.557	2025-05-08 20:41:49.558	\N	\N	\N
19	soxzt6jymohfsf9wtuc59252	api::footer.footer.find	2025-06-13 19:13:34.362	2025-06-13 19:13:34.362	2025-06-13 19:13:34.364	\N	\N	\N
20	pdenqck20ighcg9tq56v8dsp	api::navbar.navbar.find	2025-06-13 19:13:34.362	2025-06-13 19:13:34.362	2025-06-13 19:13:34.365	\N	\N	\N
21	rfmfmrmo3mablqsirkda1gbf	api::page.page.find	2025-06-13 19:13:34.362	2025-06-13 19:13:34.362	2025-06-13 19:13:34.365	\N	\N	\N
22	e65qpcyr13zd9ko49cf2kgld	api::page.page.findOne	2025-06-13 19:13:34.362	2025-06-13 19:13:34.362	2025-06-13 19:13:34.365	\N	\N	\N
\.


--
-- Data for Name: up_permissions_role_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.up_permissions_role_lnk (id, permission_id, role_id, permission_ord) FROM stdin;
10	10	3	1
11	11	3	1
12	12	4	1
13	13	4	1
14	18	4	1
15	16	4	1
16	15	4	1
17	14	4	1
18	17	4	1
19	19	4	2
20	20	4	2
21	21	4	3
22	22	4	4
\.


--
-- Data for Name: up_roles; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.up_roles (id, document_id, name, description, type, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
3	caoelvgjtry6axw56g38kyuf	Authenticated	Default role given to authenticated user.	authenticated	2025-05-08 20:41:48.877	2025-05-08 20:41:48.877	2025-05-08 20:41:48.878	\N	\N	\N
4	uqlw8g5f3zyxkspmeaweiiw2	Public	Default role given to unauthenticated user.	public	2025-05-08 20:41:49.03	2025-06-13 19:13:34.069	2025-05-08 20:41:49.031	\N	\N	\N
\.


--
-- Data for Name: up_users; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.up_users (id, document_id, username, email, provider, password, reset_password_token, confirmation_token, confirmed, blocked, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	igfl46vj2z22o4tm999enpen	tmsjkbk@gmail.com	tmsjkbk@gmail.com	local	$2a$10$Z06Qhk4j1K2mB.6ts4q0Hetmst3WqO/QlUMLtCZQlJ.EAesAdutTa	\N	\N	t	f	2025-05-09 02:20:40.841	2025-05-09 02:41:52.335	2025-05-09 02:40:14.363	\N	\N	\N
\.


--
-- Data for Name: up_users_role_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.up_users_role_lnk (id, user_id, role_id, user_ord) FROM stdin;
1	1	3	1
\.


--
-- Data for Name: upload_folders; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.upload_folders (id, document_id, name, path_id, path, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: upload_folders_parent_lnk; Type: TABLE DATA; Schema: public; Owner: JOY
--

COPY public.upload_folders_parent_lnk (id, folder_id, inv_folder_id, folder_ord) FROM stdin;
\.


--
-- Name: admin_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.admin_permissions_id_seq', 144, true);


--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.admin_permissions_role_lnk_id_seq', 204, true);


--
-- Name: admin_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.admin_roles_id_seq', 3, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.admin_users_roles_lnk_id_seq', 1, true);


--
-- Name: components_elements_footer_items_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_elements_footer_items_cmps_id_seq', 6, true);


--
-- Name: components_elements_footer_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_elements_footer_items_id_seq', 3, true);


--
-- Name: components_forms_contact_forms_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_forms_contact_forms_cmps_id_seq', 1, false);


--
-- Name: components_forms_contact_forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_forms_contact_forms_id_seq', 2, true);


--
-- Name: components_forms_newsletter_forms_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_forms_newsletter_forms_cmps_id_seq', 1, false);


--
-- Name: components_forms_newsletter_forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_forms_newsletter_forms_id_seq', 1, false);


--
-- Name: components_sections_animated_logo_rows_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_animated_logo_rows_cmps_id_seq', 8, true);


--
-- Name: components_sections_animated_logo_rows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_animated_logo_rows_id_seq', 2, true);


--
-- Name: components_sections_carousels_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_carousels_cmps_id_seq', 6, true);


--
-- Name: components_sections_carousels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_carousels_id_seq', 2, true);


--
-- Name: components_sections_faqs_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_faqs_cmps_id_seq', 8, true);


--
-- Name: components_sections_faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_faqs_id_seq', 2, true);


--
-- Name: components_sections_heading_with_cta_buttons_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_heading_with_cta_buttons_cmps_id_seq', 2, true);


--
-- Name: components_sections_heading_with_cta_buttons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_heading_with_cta_buttons_id_seq', 2, true);


--
-- Name: components_sections_heroes_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_heroes_cmps_id_seq', 6, true);


--
-- Name: components_sections_heroes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_heroes_id_seq', 2, true);


--
-- Name: components_sections_horizontal_images_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_horizontal_images_cmps_id_seq', 1, false);


--
-- Name: components_sections_horizontal_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_horizontal_images_id_seq', 1, false);


--
-- Name: components_sections_image_with_cta_buttons_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_image_with_cta_buttons_cmps_id_seq', 1, false);


--
-- Name: components_sections_image_with_cta_buttons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_sections_image_with_cta_buttons_id_seq', 1, false);


--
-- Name: components_seo_utilities_meta_socials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_meta_socials_id_seq', 1, false);


--
-- Name: components_seo_utilities_seo_ogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_seo_ogs_id_seq', 1, false);


--
-- Name: components_seo_utilities_seo_twitters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_seo_twitters_id_seq', 1, false);


--
-- Name: components_seo_utilities_seos_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_seos_cmps_id_seq', 1, false);


--
-- Name: components_seo_utilities_seos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_seos_id_seq', 1, false);


--
-- Name: components_seo_utilities_social_icons_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_social_icons_cmps_id_seq', 1, false);


--
-- Name: components_seo_utilities_social_icons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_seo_utilities_social_icons_id_seq', 1, false);


--
-- Name: components_utilities_accordions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_accordions_id_seq', 8, true);


--
-- Name: components_utilities_basic_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_basic_images_id_seq', 16, true);


--
-- Name: components_utilities_ck_editor_contents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_ck_editor_contents_id_seq', 2, true);


--
-- Name: components_utilities_image_with_links_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_image_with_links_cmps_id_seq', 12, true);


--
-- Name: components_utilities_image_with_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_image_with_links_id_seq', 10, true);


--
-- Name: components_utilities_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_links_id_seq', 27, true);


--
-- Name: components_utilities_links_with_titles_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_links_with_titles_cmps_id_seq', 1, false);


--
-- Name: components_utilities_links_with_titles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_links_with_titles_id_seq', 1, false);


--
-- Name: components_utilities_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.components_utilities_texts_id_seq', 1, false);


--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.files_folder_lnk_id_seq', 1, false);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.files_id_seq', 10, true);


--
-- Name: files_related_mph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.files_related_mph_id_seq', 16, true);


--
-- Name: footers_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.footers_cmps_id_seq', 8, true);


--
-- Name: footers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.footers_id_seq', 3, true);


--
-- Name: i18n_locale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.i18n_locale_id_seq', 6, true);


--
-- Name: navbars_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.navbars_cmps_id_seq', 8, true);


--
-- Name: navbars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.navbars_id_seq', 3, true);


--
-- Name: pages_cmps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.pages_cmps_id_seq', 14, true);


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.pages_id_seq', 6, true);


--
-- Name: pages_parent_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.pages_parent_lnk_id_seq', 4, true);


--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_api_token_permissions_id_seq', 1, false);


--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_api_token_permissions_token_lnk_id_seq', 1, false);


--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_api_tokens_id_seq', 2, true);


--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_core_store_settings_id_seq', 105, true);


--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_database_schema_id_seq', 22, true);


--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_history_versions_id_seq', 1, false);


--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_migrations_id_seq', 1, false);


--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_migrations_internal_id_seq', 6, true);


--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_release_actions_id_seq', 1, false);


--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_release_actions_release_lnk_id_seq', 1, false);


--
-- Name: strapi_releases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_releases_id_seq', 1, false);


--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_id_seq', 1, false);


--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_token_lnk_id_seq', 1, false);


--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_transfer_tokens_id_seq', 1, false);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_workflows_id_seq', 1, false);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_workflows_stage_required_to_publish_lnk_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_permissions_lnk_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_workflow_lnk_id_seq', 1, false);


--
-- Name: subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.subscribers_id_seq', 1, true);


--
-- Name: up_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.up_permissions_id_seq', 22, true);


--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.up_permissions_role_lnk_id_seq', 22, true);


--
-- Name: up_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.up_roles_id_seq', 4, true);


--
-- Name: up_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.up_users_id_seq', 1, true);


--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.up_users_role_lnk_id_seq', 1, true);


--
-- Name: upload_folders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.upload_folders_id_seq', 1, false);


--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: JOY
--

SELECT pg_catalog.setval('public.upload_folders_parent_lnk_id_seq', 1, false);


--
-- Name: admin_permissions admin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_uq UNIQUE (permission_id, role_id);


--
-- Name: admin_roles admin_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_pkey PRIMARY KEY (id);


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_uq UNIQUE (user_id, role_id);


--
-- Name: components_elements_footer_items_cmps components_elements_footer_items_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items_cmps
    ADD CONSTRAINT components_elements_footer_items_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_elements_footer_items components_elements_footer_items_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items
    ADD CONSTRAINT components_elements_footer_items_pkey PRIMARY KEY (id);


--
-- Name: components_elements_footer_items_cmps components_elements_footer_items_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items_cmps
    ADD CONSTRAINT components_elements_footer_items_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_forms_contact_forms_cmps components_forms_contact_forms_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms_cmps
    ADD CONSTRAINT components_forms_contact_forms_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_forms_contact_forms components_forms_contact_forms_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms
    ADD CONSTRAINT components_forms_contact_forms_pkey PRIMARY KEY (id);


--
-- Name: components_forms_contact_forms_cmps components_forms_contact_forms_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms_cmps
    ADD CONSTRAINT components_forms_contact_forms_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_forms_newsletter_forms_cmps components_forms_newsletter_forms_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms_cmps
    ADD CONSTRAINT components_forms_newsletter_forms_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_forms_newsletter_forms components_forms_newsletter_forms_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms
    ADD CONSTRAINT components_forms_newsletter_forms_pkey PRIMARY KEY (id);


--
-- Name: components_forms_newsletter_forms_cmps components_forms_newsletter_forms_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms_cmps
    ADD CONSTRAINT components_forms_newsletter_forms_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_animated_logo_rows_cmps components_sections_animated_logo_rows_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows_cmps
    ADD CONSTRAINT components_sections_animated_logo_rows_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_animated_logo_rows components_sections_animated_logo_rows_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows
    ADD CONSTRAINT components_sections_animated_logo_rows_pkey PRIMARY KEY (id);


--
-- Name: components_sections_animated_logo_rows_cmps components_sections_animated_logo_rows_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows_cmps
    ADD CONSTRAINT components_sections_animated_logo_rows_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_carousels_cmps components_sections_carousels_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels_cmps
    ADD CONSTRAINT components_sections_carousels_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_carousels components_sections_carousels_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels
    ADD CONSTRAINT components_sections_carousels_pkey PRIMARY KEY (id);


--
-- Name: components_sections_carousels_cmps components_sections_carousels_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels_cmps
    ADD CONSTRAINT components_sections_carousels_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_faqs_cmps components_sections_faqs_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs_cmps
    ADD CONSTRAINT components_sections_faqs_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_faqs components_sections_faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs
    ADD CONSTRAINT components_sections_faqs_pkey PRIMARY KEY (id);


--
-- Name: components_sections_faqs_cmps components_sections_faqs_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs_cmps
    ADD CONSTRAINT components_sections_faqs_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_heading_with_cta_buttons_cmps components_sections_heading_with_cta_buttons_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_heading_with_cta_buttons_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_heading_with_cta_buttons components_sections_heading_with_cta_buttons_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons
    ADD CONSTRAINT components_sections_heading_with_cta_buttons_pkey PRIMARY KEY (id);


--
-- Name: components_sections_heading_with_cta_buttons_cmps components_sections_heading_with_cta_buttons_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_heading_with_cta_buttons_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_heroes_cmps components_sections_heroes_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes_cmps
    ADD CONSTRAINT components_sections_heroes_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_heroes components_sections_heroes_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes
    ADD CONSTRAINT components_sections_heroes_pkey PRIMARY KEY (id);


--
-- Name: components_sections_heroes_cmps components_sections_heroes_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes_cmps
    ADD CONSTRAINT components_sections_heroes_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_horizontal_images_cmps components_sections_horizontal_images_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images_cmps
    ADD CONSTRAINT components_sections_horizontal_images_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_horizontal_images components_sections_horizontal_images_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images
    ADD CONSTRAINT components_sections_horizontal_images_pkey PRIMARY KEY (id);


--
-- Name: components_sections_horizontal_images_cmps components_sections_horizontal_images_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images_cmps
    ADD CONSTRAINT components_sections_horizontal_images_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_sections_image_with_cta_buttons_cmps components_sections_image_with_cta_buttons_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_image_with_cta_buttons_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_sections_image_with_cta_buttons components_sections_image_with_cta_buttons_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons
    ADD CONSTRAINT components_sections_image_with_cta_buttons_pkey PRIMARY KEY (id);


--
-- Name: components_sections_image_with_cta_buttons_cmps components_sections_image_with_cta_buttons_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_image_with_cta_buttons_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_seo_utilities_meta_socials components_seo_utilities_meta_socials_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_meta_socials
    ADD CONSTRAINT components_seo_utilities_meta_socials_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_seo_ogs components_seo_utilities_seo_ogs_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seo_ogs
    ADD CONSTRAINT components_seo_utilities_seo_ogs_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_seo_twitters components_seo_utilities_seo_twitters_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seo_twitters
    ADD CONSTRAINT components_seo_utilities_seo_twitters_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_seos_cmps components_seo_utilities_seos_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos_cmps
    ADD CONSTRAINT components_seo_utilities_seos_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_seos components_seo_utilities_seos_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos
    ADD CONSTRAINT components_seo_utilities_seos_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_seos_cmps components_seo_utilities_seos_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos_cmps
    ADD CONSTRAINT components_seo_utilities_seos_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_seo_utilities_social_icons_cmps components_seo_utilities_social_icons_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons_cmps
    ADD CONSTRAINT components_seo_utilities_social_icons_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_social_icons components_seo_utilities_social_icons_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons
    ADD CONSTRAINT components_seo_utilities_social_icons_pkey PRIMARY KEY (id);


--
-- Name: components_seo_utilities_social_icons_cmps components_seo_utilities_social_icons_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons_cmps
    ADD CONSTRAINT components_seo_utilities_social_icons_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_utilities_accordions components_utilities_accordions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_accordions
    ADD CONSTRAINT components_utilities_accordions_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_basic_images components_utilities_basic_images_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_basic_images
    ADD CONSTRAINT components_utilities_basic_images_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_ck_editor_contents components_utilities_ck_editor_contents_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_ck_editor_contents
    ADD CONSTRAINT components_utilities_ck_editor_contents_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_image_with_links_cmps components_utilities_image_with_links_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links_cmps
    ADD CONSTRAINT components_utilities_image_with_links_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_image_with_links components_utilities_image_with_links_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links
    ADD CONSTRAINT components_utilities_image_with_links_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_image_with_links_cmps components_utilities_image_with_links_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links_cmps
    ADD CONSTRAINT components_utilities_image_with_links_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_utilities_links components_utilities_links_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links
    ADD CONSTRAINT components_utilities_links_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_links_with_titles_cmps components_utilities_links_with_titles_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles_cmps
    ADD CONSTRAINT components_utilities_links_with_titles_cmps_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_links_with_titles components_utilities_links_with_titles_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles
    ADD CONSTRAINT components_utilities_links_with_titles_pkey PRIMARY KEY (id);


--
-- Name: components_utilities_links_with_titles_cmps components_utilities_links_with_titles_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles_cmps
    ADD CONSTRAINT components_utilities_links_with_titles_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: components_utilities_texts components_utilities_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_texts
    ADD CONSTRAINT components_utilities_texts_pkey PRIMARY KEY (id);


--
-- Name: files_folder_lnk files_folder_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_pkey PRIMARY KEY (id);


--
-- Name: files_folder_lnk files_folder_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_uq UNIQUE (file_id, folder_id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: files_related_mph files_related_mph_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_related_mph
    ADD CONSTRAINT files_related_mph_pkey PRIMARY KEY (id);


--
-- Name: footers_cmps footers_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers_cmps
    ADD CONSTRAINT footers_cmps_pkey PRIMARY KEY (id);


--
-- Name: footers footers_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers
    ADD CONSTRAINT footers_pkey PRIMARY KEY (id);


--
-- Name: footers_cmps footers_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers_cmps
    ADD CONSTRAINT footers_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: i18n_locale i18n_locale_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_pkey PRIMARY KEY (id);


--
-- Name: navbars_cmps navbars_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars_cmps
    ADD CONSTRAINT navbars_cmps_pkey PRIMARY KEY (id);


--
-- Name: navbars navbars_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars
    ADD CONSTRAINT navbars_pkey PRIMARY KEY (id);


--
-- Name: navbars_cmps navbars_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars_cmps
    ADD CONSTRAINT navbars_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: pages_cmps pages_cmps_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_cmps
    ADD CONSTRAINT pages_cmps_pkey PRIMARY KEY (id);


--
-- Name: pages_parent_lnk pages_parent_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_parent_lnk
    ADD CONSTRAINT pages_parent_lnk_pkey PRIMARY KEY (id);


--
-- Name: pages_parent_lnk pages_parent_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_parent_lnk
    ADD CONSTRAINT pages_parent_lnk_uq UNIQUE (page_id, inv_page_id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages_cmps pages_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_cmps
    ADD CONSTRAINT pages_uq UNIQUE (entity_id, cmp_id, field, component_type);


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_uq UNIQUE (api_token_permission_id, api_token_id);


--
-- Name: strapi_api_tokens strapi_api_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_pkey PRIMARY KEY (id);


--
-- Name: strapi_core_store_settings strapi_core_store_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_core_store_settings
    ADD CONSTRAINT strapi_core_store_settings_pkey PRIMARY KEY (id);


--
-- Name: strapi_database_schema strapi_database_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_database_schema
    ADD CONSTRAINT strapi_database_schema_pkey PRIMARY KEY (id);


--
-- Name: strapi_history_versions strapi_history_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_history_versions
    ADD CONSTRAINT strapi_history_versions_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations_internal strapi_migrations_internal_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_migrations_internal
    ADD CONSTRAINT strapi_migrations_internal_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations strapi_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_migrations
    ADD CONSTRAINT strapi_migrations_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions strapi_release_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_uq UNIQUE (release_action_id, release_id);


--
-- Name: strapi_releases strapi_releases_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_uq UNIQUE (transfer_token_permission_id, transfer_token_id);


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_pkey PRIMARY KEY (id);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows strapi_workflows_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_uq UNIQUE (workflow_id, workflow_stage_id);


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_uq UNIQUE (workflow_stage_id, permission_id);


--
-- Name: strapi_workflows_stages strapi_workflows_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_uq UNIQUE (workflow_stage_id, workflow_id);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: up_permissions up_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_pkey PRIMARY KEY (id);


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_uq UNIQUE (permission_id, role_id);


--
-- Name: up_roles up_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_pkey PRIMARY KEY (id);


--
-- Name: up_users up_users_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_pkey PRIMARY KEY (id);


--
-- Name: up_users_role_lnk up_users_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: up_users_role_lnk up_users_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_uq UNIQUE (user_id, role_id);


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_pkey PRIMARY KEY (id);


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_uq UNIQUE (folder_id, inv_folder_id);


--
-- Name: upload_folders upload_folders_path_id_index; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_id_index UNIQUE (path_id);


--
-- Name: upload_folders upload_folders_path_index; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_index UNIQUE (path);


--
-- Name: upload_folders upload_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_created_by_id_fk ON public.admin_permissions USING btree (created_by_id);


--
-- Name: admin_permissions_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_documents_idx ON public.admin_permissions USING btree (document_id, locale, published_at);


--
-- Name: admin_permissions_role_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_role_lnk_fk ON public.admin_permissions_role_lnk USING btree (permission_id);


--
-- Name: admin_permissions_role_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_role_lnk_ifk ON public.admin_permissions_role_lnk USING btree (role_id);


--
-- Name: admin_permissions_role_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_role_lnk_oifk ON public.admin_permissions_role_lnk USING btree (permission_ord);


--
-- Name: admin_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_permissions_updated_by_id_fk ON public.admin_permissions USING btree (updated_by_id);


--
-- Name: admin_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_roles_created_by_id_fk ON public.admin_roles USING btree (created_by_id);


--
-- Name: admin_roles_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_roles_documents_idx ON public.admin_roles USING btree (document_id, locale, published_at);


--
-- Name: admin_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_roles_updated_by_id_fk ON public.admin_roles USING btree (updated_by_id);


--
-- Name: admin_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_created_by_id_fk ON public.admin_users USING btree (created_by_id);


--
-- Name: admin_users_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_documents_idx ON public.admin_users USING btree (document_id, locale, published_at);


--
-- Name: admin_users_roles_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_roles_lnk_fk ON public.admin_users_roles_lnk USING btree (user_id);


--
-- Name: admin_users_roles_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_roles_lnk_ifk ON public.admin_users_roles_lnk USING btree (role_id);


--
-- Name: admin_users_roles_lnk_ofk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_roles_lnk_ofk ON public.admin_users_roles_lnk USING btree (role_ord);


--
-- Name: admin_users_roles_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_roles_lnk_oifk ON public.admin_users_roles_lnk USING btree (user_ord);


--
-- Name: admin_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX admin_users_updated_by_id_fk ON public.admin_users USING btree (updated_by_id);


--
-- Name: components_elements_footer_items_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_elements_footer_items_component_type_idx ON public.components_elements_footer_items_cmps USING btree (component_type);


--
-- Name: components_elements_footer_items_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_elements_footer_items_entity_fk ON public.components_elements_footer_items_cmps USING btree (entity_id);


--
-- Name: components_elements_footer_items_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_elements_footer_items_field_idx ON public.components_elements_footer_items_cmps USING btree (field);


--
-- Name: components_forms_contact_forms_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_contact_forms_component_type_idx ON public.components_forms_contact_forms_cmps USING btree (component_type);


--
-- Name: components_forms_contact_forms_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_contact_forms_entity_fk ON public.components_forms_contact_forms_cmps USING btree (entity_id);


--
-- Name: components_forms_contact_forms_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_contact_forms_field_idx ON public.components_forms_contact_forms_cmps USING btree (field);


--
-- Name: components_forms_newsletter_forms_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_newsletter_forms_component_type_idx ON public.components_forms_newsletter_forms_cmps USING btree (component_type);


--
-- Name: components_forms_newsletter_forms_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_newsletter_forms_entity_fk ON public.components_forms_newsletter_forms_cmps USING btree (entity_id);


--
-- Name: components_forms_newsletter_forms_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_forms_newsletter_forms_field_idx ON public.components_forms_newsletter_forms_cmps USING btree (field);


--
-- Name: components_sections_animated_lofcbcf_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_animated_lofcbcf_component_type_idx ON public.components_sections_animated_logo_rows_cmps USING btree (component_type);


--
-- Name: components_sections_animated_logo_rows_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_animated_logo_rows_entity_fk ON public.components_sections_animated_logo_rows_cmps USING btree (entity_id);


--
-- Name: components_sections_animated_logo_rows_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_animated_logo_rows_field_idx ON public.components_sections_animated_logo_rows_cmps USING btree (field);


--
-- Name: components_sections_carousels_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_carousels_component_type_idx ON public.components_sections_carousels_cmps USING btree (component_type);


--
-- Name: components_sections_carousels_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_carousels_entity_fk ON public.components_sections_carousels_cmps USING btree (entity_id);


--
-- Name: components_sections_carousels_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_carousels_field_idx ON public.components_sections_carousels_cmps USING btree (field);


--
-- Name: components_sections_faqs_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_faqs_component_type_idx ON public.components_sections_faqs_cmps USING btree (component_type);


--
-- Name: components_sections_faqs_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_faqs_entity_fk ON public.components_sections_faqs_cmps USING btree (entity_id);


--
-- Name: components_sections_faqs_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_faqs_field_idx ON public.components_sections_faqs_cmps USING btree (field);


--
-- Name: components_sections_heading_wit3fa0d_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heading_wit3fa0d_component_type_idx ON public.components_sections_heading_with_cta_buttons_cmps USING btree (component_type);


--
-- Name: components_sections_heading_with_cta_buttons_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heading_with_cta_buttons_entity_fk ON public.components_sections_heading_with_cta_buttons_cmps USING btree (entity_id);


--
-- Name: components_sections_heading_with_cta_buttons_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heading_with_cta_buttons_field_idx ON public.components_sections_heading_with_cta_buttons_cmps USING btree (field);


--
-- Name: components_sections_heroes_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heroes_component_type_idx ON public.components_sections_heroes_cmps USING btree (component_type);


--
-- Name: components_sections_heroes_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heroes_entity_fk ON public.components_sections_heroes_cmps USING btree (entity_id);


--
-- Name: components_sections_heroes_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_heroes_field_idx ON public.components_sections_heroes_cmps USING btree (field);


--
-- Name: components_sections_horizontal_1685d_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_horizontal_1685d_component_type_idx ON public.components_sections_horizontal_images_cmps USING btree (component_type);


--
-- Name: components_sections_horizontal_images_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_horizontal_images_entity_fk ON public.components_sections_horizontal_images_cmps USING btree (entity_id);


--
-- Name: components_sections_horizontal_images_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_horizontal_images_field_idx ON public.components_sections_horizontal_images_cmps USING btree (field);


--
-- Name: components_sections_image_with_7e8fc_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_image_with_7e8fc_component_type_idx ON public.components_sections_image_with_cta_buttons_cmps USING btree (component_type);


--
-- Name: components_sections_image_with_cta_buttons_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_image_with_cta_buttons_entity_fk ON public.components_sections_image_with_cta_buttons_cmps USING btree (entity_id);


--
-- Name: components_sections_image_with_cta_buttons_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_sections_image_with_cta_buttons_field_idx ON public.components_sections_image_with_cta_buttons_cmps USING btree (field);


--
-- Name: components_seo_utilities_seos_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_seos_component_type_idx ON public.components_seo_utilities_seos_cmps USING btree (component_type);


--
-- Name: components_seo_utilities_seos_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_seos_entity_fk ON public.components_seo_utilities_seos_cmps USING btree (entity_id);


--
-- Name: components_seo_utilities_seos_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_seos_field_idx ON public.components_seo_utilities_seos_cmps USING btree (field);


--
-- Name: components_seo_utilities_social_icons_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_social_icons_entity_fk ON public.components_seo_utilities_social_icons_cmps USING btree (entity_id);


--
-- Name: components_seo_utilities_social_icons_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_social_icons_field_idx ON public.components_seo_utilities_social_icons_cmps USING btree (field);


--
-- Name: components_seo_utilities_sociale6b11_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_seo_utilities_sociale6b11_component_type_idx ON public.components_seo_utilities_social_icons_cmps USING btree (component_type);


--
-- Name: components_utilities_image_with37a81_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_image_with37a81_component_type_idx ON public.components_utilities_image_with_links_cmps USING btree (component_type);


--
-- Name: components_utilities_image_with_links_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_image_with_links_entity_fk ON public.components_utilities_image_with_links_cmps USING btree (entity_id);


--
-- Name: components_utilities_image_with_links_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_image_with_links_field_idx ON public.components_utilities_image_with_links_cmps USING btree (field);


--
-- Name: components_utilities_links_with_titles_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_links_with_titles_entity_fk ON public.components_utilities_links_with_titles_cmps USING btree (entity_id);


--
-- Name: components_utilities_links_with_titles_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_links_with_titles_field_idx ON public.components_utilities_links_with_titles_cmps USING btree (field);


--
-- Name: components_utilities_links_withe4603_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX components_utilities_links_withe4603_component_type_idx ON public.components_utilities_links_with_titles_cmps USING btree (component_type);


--
-- Name: files_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_created_by_id_fk ON public.files USING btree (created_by_id);


--
-- Name: files_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_documents_idx ON public.files USING btree (document_id, locale, published_at);


--
-- Name: files_folder_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_folder_lnk_fk ON public.files_folder_lnk USING btree (file_id);


--
-- Name: files_folder_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_folder_lnk_ifk ON public.files_folder_lnk USING btree (folder_id);


--
-- Name: files_folder_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_folder_lnk_oifk ON public.files_folder_lnk USING btree (file_ord);


--
-- Name: files_related_mph_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_related_mph_fk ON public.files_related_mph USING btree (file_id);


--
-- Name: files_related_mph_idix; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_related_mph_idix ON public.files_related_mph USING btree (related_id);


--
-- Name: files_related_mph_oidx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_related_mph_oidx ON public.files_related_mph USING btree ("order");


--
-- Name: files_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX files_updated_by_id_fk ON public.files USING btree (updated_by_id);


--
-- Name: footers_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_component_type_idx ON public.footers_cmps USING btree (component_type);


--
-- Name: footers_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_created_by_id_fk ON public.footers USING btree (created_by_id);


--
-- Name: footers_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_documents_idx ON public.footers USING btree (document_id, locale, published_at);


--
-- Name: footers_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_entity_fk ON public.footers_cmps USING btree (entity_id);


--
-- Name: footers_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_field_idx ON public.footers_cmps USING btree (field);


--
-- Name: footers_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX footers_updated_by_id_fk ON public.footers USING btree (updated_by_id);


--
-- Name: i18n_locale_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX i18n_locale_created_by_id_fk ON public.i18n_locale USING btree (created_by_id);


--
-- Name: i18n_locale_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX i18n_locale_documents_idx ON public.i18n_locale USING btree (document_id, locale, published_at);


--
-- Name: i18n_locale_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX i18n_locale_updated_by_id_fk ON public.i18n_locale USING btree (updated_by_id);


--
-- Name: navbars_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_component_type_idx ON public.navbars_cmps USING btree (component_type);


--
-- Name: navbars_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_created_by_id_fk ON public.navbars USING btree (created_by_id);


--
-- Name: navbars_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_documents_idx ON public.navbars USING btree (document_id, locale, published_at);


--
-- Name: navbars_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_entity_fk ON public.navbars_cmps USING btree (entity_id);


--
-- Name: navbars_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_field_idx ON public.navbars_cmps USING btree (field);


--
-- Name: navbars_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX navbars_updated_by_id_fk ON public.navbars USING btree (updated_by_id);


--
-- Name: pages_component_type_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_component_type_idx ON public.pages_cmps USING btree (component_type);


--
-- Name: pages_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_created_by_id_fk ON public.pages USING btree (created_by_id);


--
-- Name: pages_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_documents_idx ON public.pages USING btree (document_id, locale, published_at);


--
-- Name: pages_entity_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_entity_fk ON public.pages_cmps USING btree (entity_id);


--
-- Name: pages_field_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_field_idx ON public.pages_cmps USING btree (field);


--
-- Name: pages_parent_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_parent_lnk_fk ON public.pages_parent_lnk USING btree (page_id);


--
-- Name: pages_parent_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_parent_lnk_ifk ON public.pages_parent_lnk USING btree (inv_page_id);


--
-- Name: pages_parent_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_parent_lnk_oifk ON public.pages_parent_lnk USING btree (page_ord);


--
-- Name: pages_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX pages_updated_by_id_fk ON public.pages USING btree (updated_by_id);


--
-- Name: strapi_api_token_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_created_by_id_fk ON public.strapi_api_token_permissions USING btree (created_by_id);


--
-- Name: strapi_api_token_permissions_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_documents_idx ON public.strapi_api_token_permissions USING btree (document_id, locale, published_at);


--
-- Name: strapi_api_token_permissions_token_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_token_lnk_fk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_permission_id);


--
-- Name: strapi_api_token_permissions_token_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_token_lnk_ifk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_id);


--
-- Name: strapi_api_token_permissions_token_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_token_lnk_oifk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_permission_ord);


--
-- Name: strapi_api_token_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_token_permissions_updated_by_id_fk ON public.strapi_api_token_permissions USING btree (updated_by_id);


--
-- Name: strapi_api_tokens_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_tokens_created_by_id_fk ON public.strapi_api_tokens USING btree (created_by_id);


--
-- Name: strapi_api_tokens_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_tokens_documents_idx ON public.strapi_api_tokens USING btree (document_id, locale, published_at);


--
-- Name: strapi_api_tokens_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_api_tokens_updated_by_id_fk ON public.strapi_api_tokens USING btree (updated_by_id);


--
-- Name: strapi_history_versions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_history_versions_created_by_id_fk ON public.strapi_history_versions USING btree (created_by_id);


--
-- Name: strapi_release_actions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_created_by_id_fk ON public.strapi_release_actions USING btree (created_by_id);


--
-- Name: strapi_release_actions_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_documents_idx ON public.strapi_release_actions USING btree (document_id, locale, published_at);


--
-- Name: strapi_release_actions_release_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_release_lnk_fk ON public.strapi_release_actions_release_lnk USING btree (release_action_id);


--
-- Name: strapi_release_actions_release_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_release_lnk_ifk ON public.strapi_release_actions_release_lnk USING btree (release_id);


--
-- Name: strapi_release_actions_release_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_release_lnk_oifk ON public.strapi_release_actions_release_lnk USING btree (release_action_ord);


--
-- Name: strapi_release_actions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_release_actions_updated_by_id_fk ON public.strapi_release_actions USING btree (updated_by_id);


--
-- Name: strapi_releases_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_releases_created_by_id_fk ON public.strapi_releases USING btree (created_by_id);


--
-- Name: strapi_releases_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_releases_documents_idx ON public.strapi_releases USING btree (document_id, locale, published_at);


--
-- Name: strapi_releases_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_releases_updated_by_id_fk ON public.strapi_releases USING btree (updated_by_id);


--
-- Name: strapi_transfer_token_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_created_by_id_fk ON public.strapi_transfer_token_permissions USING btree (created_by_id);


--
-- Name: strapi_transfer_token_permissions_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_documents_idx ON public.strapi_transfer_token_permissions USING btree (document_id, locale, published_at);


--
-- Name: strapi_transfer_token_permissions_token_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_fk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_permission_id);


--
-- Name: strapi_transfer_token_permissions_token_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_ifk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_id);


--
-- Name: strapi_transfer_token_permissions_token_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_oifk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_permission_ord);


--
-- Name: strapi_transfer_token_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_token_permissions_updated_by_id_fk ON public.strapi_transfer_token_permissions USING btree (updated_by_id);


--
-- Name: strapi_transfer_tokens_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_tokens_created_by_id_fk ON public.strapi_transfer_tokens USING btree (created_by_id);


--
-- Name: strapi_transfer_tokens_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_tokens_documents_idx ON public.strapi_transfer_tokens USING btree (document_id, locale, published_at);


--
-- Name: strapi_transfer_tokens_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_transfer_tokens_updated_by_id_fk ON public.strapi_transfer_tokens USING btree (updated_by_id);


--
-- Name: strapi_workflows_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_created_by_id_fk ON public.strapi_workflows USING btree (created_by_id);


--
-- Name: strapi_workflows_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_documents_idx ON public.strapi_workflows USING btree (document_id, locale, published_at);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stage_required_to_publish_lnk_fk ON public.strapi_workflows_stage_required_to_publish_lnk USING btree (workflow_id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stage_required_to_publish_lnk_ifk ON public.strapi_workflows_stage_required_to_publish_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_created_by_id_fk ON public.strapi_workflows_stages USING btree (created_by_id);


--
-- Name: strapi_workflows_stages_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_documents_idx ON public.strapi_workflows_stages USING btree (document_id, locale, published_at);


--
-- Name: strapi_workflows_stages_permissions_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_fk ON public.strapi_workflows_stages_permissions_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_permissions_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_ifk ON public.strapi_workflows_stages_permissions_lnk USING btree (permission_id);


--
-- Name: strapi_workflows_stages_permissions_lnk_ofk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_ofk ON public.strapi_workflows_stages_permissions_lnk USING btree (permission_ord);


--
-- Name: strapi_workflows_stages_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_updated_by_id_fk ON public.strapi_workflows_stages USING btree (updated_by_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_fk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_ifk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_oifk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_stage_ord);


--
-- Name: strapi_workflows_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX strapi_workflows_updated_by_id_fk ON public.strapi_workflows USING btree (updated_by_id);


--
-- Name: subscribers_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX subscribers_created_by_id_fk ON public.subscribers USING btree (created_by_id);


--
-- Name: subscribers_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX subscribers_documents_idx ON public.subscribers USING btree (document_id, locale, published_at);


--
-- Name: subscribers_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX subscribers_updated_by_id_fk ON public.subscribers USING btree (updated_by_id);


--
-- Name: up_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_created_by_id_fk ON public.up_permissions USING btree (created_by_id);


--
-- Name: up_permissions_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_documents_idx ON public.up_permissions USING btree (document_id, locale, published_at);


--
-- Name: up_permissions_role_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_role_lnk_fk ON public.up_permissions_role_lnk USING btree (permission_id);


--
-- Name: up_permissions_role_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_role_lnk_ifk ON public.up_permissions_role_lnk USING btree (role_id);


--
-- Name: up_permissions_role_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_role_lnk_oifk ON public.up_permissions_role_lnk USING btree (permission_ord);


--
-- Name: up_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_permissions_updated_by_id_fk ON public.up_permissions USING btree (updated_by_id);


--
-- Name: up_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_roles_created_by_id_fk ON public.up_roles USING btree (created_by_id);


--
-- Name: up_roles_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_roles_documents_idx ON public.up_roles USING btree (document_id, locale, published_at);


--
-- Name: up_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_roles_updated_by_id_fk ON public.up_roles USING btree (updated_by_id);


--
-- Name: up_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_created_by_id_fk ON public.up_users USING btree (created_by_id);


--
-- Name: up_users_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_documents_idx ON public.up_users USING btree (document_id, locale, published_at);


--
-- Name: up_users_role_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_role_lnk_fk ON public.up_users_role_lnk USING btree (user_id);


--
-- Name: up_users_role_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_role_lnk_ifk ON public.up_users_role_lnk USING btree (role_id);


--
-- Name: up_users_role_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_role_lnk_oifk ON public.up_users_role_lnk USING btree (user_ord);


--
-- Name: up_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX up_users_updated_by_id_fk ON public.up_users USING btree (updated_by_id);


--
-- Name: upload_files_created_at_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_created_at_index ON public.files USING btree (created_at);


--
-- Name: upload_files_ext_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_ext_index ON public.files USING btree (ext);


--
-- Name: upload_files_folder_path_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_folder_path_index ON public.files USING btree (folder_path);


--
-- Name: upload_files_name_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_name_index ON public.files USING btree (name);


--
-- Name: upload_files_size_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_size_index ON public.files USING btree (size);


--
-- Name: upload_files_updated_at_index; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_files_updated_at_index ON public.files USING btree (updated_at);


--
-- Name: upload_folders_created_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_created_by_id_fk ON public.upload_folders USING btree (created_by_id);


--
-- Name: upload_folders_documents_idx; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_documents_idx ON public.upload_folders USING btree (document_id, locale, published_at);


--
-- Name: upload_folders_parent_lnk_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_parent_lnk_fk ON public.upload_folders_parent_lnk USING btree (folder_id);


--
-- Name: upload_folders_parent_lnk_ifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_parent_lnk_ifk ON public.upload_folders_parent_lnk USING btree (inv_folder_id);


--
-- Name: upload_folders_parent_lnk_oifk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_parent_lnk_oifk ON public.upload_folders_parent_lnk USING btree (folder_ord);


--
-- Name: upload_folders_updated_by_id_fk; Type: INDEX; Schema: public; Owner: JOY
--

CREATE INDEX upload_folders_updated_by_id_fk ON public.upload_folders USING btree (updated_by_id);


--
-- Name: admin_permissions admin_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_fk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_permissions admin_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users admin_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_fk FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_users admin_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: components_elements_footer_items_cmps components_elements_footer_items_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_elements_footer_items_cmps
    ADD CONSTRAINT components_elements_footer_items_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_elements_footer_items(id) ON DELETE CASCADE;


--
-- Name: components_forms_contact_forms_cmps components_forms_contact_forms_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_contact_forms_cmps
    ADD CONSTRAINT components_forms_contact_forms_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_forms_contact_forms(id) ON DELETE CASCADE;


--
-- Name: components_forms_newsletter_forms_cmps components_forms_newsletter_forms_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_forms_newsletter_forms_cmps
    ADD CONSTRAINT components_forms_newsletter_forms_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_forms_newsletter_forms(id) ON DELETE CASCADE;


--
-- Name: components_sections_animated_logo_rows_cmps components_sections_animated_logo_rows_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_animated_logo_rows_cmps
    ADD CONSTRAINT components_sections_animated_logo_rows_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_animated_logo_rows(id) ON DELETE CASCADE;


--
-- Name: components_sections_carousels_cmps components_sections_carousels_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_carousels_cmps
    ADD CONSTRAINT components_sections_carousels_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_carousels(id) ON DELETE CASCADE;


--
-- Name: components_sections_faqs_cmps components_sections_faqs_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_faqs_cmps
    ADD CONSTRAINT components_sections_faqs_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_faqs(id) ON DELETE CASCADE;


--
-- Name: components_sections_heading_with_cta_buttons_cmps components_sections_heading_with_cta_buttons_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heading_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_heading_with_cta_buttons_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_heading_with_cta_buttons(id) ON DELETE CASCADE;


--
-- Name: components_sections_heroes_cmps components_sections_heroes_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_heroes_cmps
    ADD CONSTRAINT components_sections_heroes_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_heroes(id) ON DELETE CASCADE;


--
-- Name: components_sections_horizontal_images_cmps components_sections_horizontal_images_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_horizontal_images_cmps
    ADD CONSTRAINT components_sections_horizontal_images_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_horizontal_images(id) ON DELETE CASCADE;


--
-- Name: components_sections_image_with_cta_buttons_cmps components_sections_image_with_cta_buttons_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_sections_image_with_cta_buttons_cmps
    ADD CONSTRAINT components_sections_image_with_cta_buttons_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_sections_image_with_cta_buttons(id) ON DELETE CASCADE;


--
-- Name: components_seo_utilities_seos_cmps components_seo_utilities_seos_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_seos_cmps
    ADD CONSTRAINT components_seo_utilities_seos_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_seo_utilities_seos(id) ON DELETE CASCADE;


--
-- Name: components_seo_utilities_social_icons_cmps components_seo_utilities_social_icons_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_seo_utilities_social_icons_cmps
    ADD CONSTRAINT components_seo_utilities_social_icons_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_seo_utilities_social_icons(id) ON DELETE CASCADE;


--
-- Name: components_utilities_image_with_links_cmps components_utilities_image_with_links_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_image_with_links_cmps
    ADD CONSTRAINT components_utilities_image_with_links_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_utilities_image_with_links(id) ON DELETE CASCADE;


--
-- Name: components_utilities_links_with_titles_cmps components_utilities_links_with_titles_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.components_utilities_links_with_titles_cmps
    ADD CONSTRAINT components_utilities_links_with_titles_entity_fk FOREIGN KEY (entity_id) REFERENCES public.components_utilities_links_with_titles(id) ON DELETE CASCADE;


--
-- Name: files files_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: files_folder_lnk files_folder_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;


--
-- Name: files_folder_lnk files_folder_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_ifk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: files_related_mph files_related_mph_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files_related_mph
    ADD CONSTRAINT files_related_mph_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;


--
-- Name: files files_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: footers footers_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers
    ADD CONSTRAINT footers_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: footers_cmps footers_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers_cmps
    ADD CONSTRAINT footers_entity_fk FOREIGN KEY (entity_id) REFERENCES public.footers(id) ON DELETE CASCADE;


--
-- Name: footers footers_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.footers
    ADD CONSTRAINT footers_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: navbars navbars_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars
    ADD CONSTRAINT navbars_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: navbars_cmps navbars_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars_cmps
    ADD CONSTRAINT navbars_entity_fk FOREIGN KEY (entity_id) REFERENCES public.navbars(id) ON DELETE CASCADE;


--
-- Name: navbars navbars_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.navbars
    ADD CONSTRAINT navbars_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: pages pages_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: pages_cmps pages_entity_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_cmps
    ADD CONSTRAINT pages_entity_fk FOREIGN KEY (entity_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_parent_lnk pages_parent_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_parent_lnk
    ADD CONSTRAINT pages_parent_lnk_fk FOREIGN KEY (page_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_parent_lnk pages_parent_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages_parent_lnk
    ADD CONSTRAINT pages_parent_lnk_ifk FOREIGN KEY (inv_page_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages pages_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_fk FOREIGN KEY (api_token_permission_id) REFERENCES public.strapi_api_token_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_ifk FOREIGN KEY (api_token_id) REFERENCES public.strapi_api_tokens(id) ON DELETE CASCADE;


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_tokens strapi_api_tokens_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_tokens strapi_api_tokens_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_history_versions strapi_history_versions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_history_versions
    ADD CONSTRAINT strapi_history_versions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_release_actions strapi_release_actions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_fk FOREIGN KEY (release_action_id) REFERENCES public.strapi_release_actions(id) ON DELETE CASCADE;


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_ifk FOREIGN KEY (release_id) REFERENCES public.strapi_releases(id) ON DELETE CASCADE;


--
-- Name: strapi_release_actions strapi_release_actions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_releases strapi_releases_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_releases strapi_releases_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_fk FOREIGN KEY (transfer_token_permission_id) REFERENCES public.strapi_transfer_token_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_ifk FOREIGN KEY (transfer_token_id) REFERENCES public.strapi_transfer_tokens(id) ON DELETE CASCADE;


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows strapi_workflows_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_fk FOREIGN KEY (workflow_id) REFERENCES public.strapi_workflows(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_ifk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages strapi_workflows_stages_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_fk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_ifk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages strapi_workflows_stages_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_fk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_ifk FOREIGN KEY (workflow_id) REFERENCES public.strapi_workflows(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows strapi_workflows_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: subscribers subscribers_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: subscribers subscribers_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions up_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_fk FOREIGN KEY (permission_id) REFERENCES public.up_permissions(id) ON DELETE CASCADE;


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_permissions up_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users up_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users_role_lnk up_users_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: up_users_role_lnk up_users_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_users up_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: upload_folders upload_folders_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_fk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_ifk FOREIGN KEY (inv_folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: upload_folders upload_folders_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: JOY
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

