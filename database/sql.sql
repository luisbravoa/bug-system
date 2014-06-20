CREATE TABLE applications
(
    id int PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL
)

CREATE TABLE "environments"
(
    id int PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
)

CREATE TABLE bugs
(
  id INTEGER PRIMARY KEY,
  application_id int NOT NULL,
  environment_id int NOT NULL,
  country TEXT NOT NULL,
  language TEXT NOT NULL,
  os TEXT,
  os_version TEXT,
  application_version TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  steps TEXT,
  booking_id int,
  user_id int,
  driver_id int,
  browser TEXT,
  browser_version TEXT
)

CREATE TABLE files
(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  bug_id int NOT NULL
)

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT,
  created TEXT,
  token TEXT NULL,
  role TEXT NULL,
  name TEXT NULL
)


--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
--SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: luisbravoa; Tablespace:
--

CREATE TABLE applications (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(10) NOT NULL
);


ALTER TABLE public.applications OWNER TO luisbravoa;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: luisbravoa
--

CREATE SEQUENCE applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applications_id_seq OWNER TO luisbravoa;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luisbravoa
--

ALTER SEQUENCE applications_id_seq OWNED BY applications.id;


--
-- Name: bugs; Type: TABLE; Schema: public; Owner: luisbravoa; Tablespace:
--
CREATE TABLE bugs (
    id integer NOT NULL,
    application_id integer NOT NULL,
    environment_id integer NOT NULL,
    country character varying,
    language character varying,
    os character varying,
    os_version character varying,
    application_version character varying,
    title character varying(255),
    description text,
    steps text,
    booking_id integer,
    user_id integer,
    driver_id integer,
    browser character varying,
    browser_version character varying,
    created timestamp without time zone
    modified timestamp without time zone
);


ALTER TABLE public.bugs OWNER TO luisbravoa;

--
-- Name: bugs_id_seq; Type: SEQUENCE; Schema: public; Owner: luisbravoa
--

CREATE SEQUENCE bugs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bugs_id_seq OWNER TO luisbravoa;

--
-- Name: bugs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luisbravoa
--

ALTER SEQUENCE bugs_id_seq OWNED BY bugs.id;


--
-- Name: environments; Type: TABLE; Schema: public; Owner: luisbravoa; Tablespace:
--

CREATE TABLE environments (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.environments OWNER TO luisbravoa;

--
-- Name: environments_id_seq; Type: SEQUENCE; Schema: public; Owner: luisbravoa
--

CREATE SEQUENCE environments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.environments_id_seq OWNER TO luisbravoa;

--
-- Name: environments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luisbravoa
--

ALTER SEQUENCE environments_id_seq OWNED BY environments.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: luisbravoa; Tablespace:
--

CREATE TABLE files (
    id integer NOT NULL,
    name character varying NOT NULL,
    bug_id integer NOT NULL
);


ALTER TABLE public.files OWNER TO luisbravoa;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: luisbravoa
--

CREATE SEQUENCE files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO luisbravoa;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luisbravoa
--

ALTER SEQUENCE files_id_seq OWNED BY files.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: luisbravoa
--

ALTER TABLE ONLY applications ALTER COLUMN id SET DEFAULT nextval('applications_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: luisbravoa
--

ALTER TABLE ONLY bugs ALTER COLUMN id SET DEFAULT nextval('bugs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: luisbravoa
--

ALTER TABLE ONLY environments ALTER COLUMN id SET DEFAULT nextval('environments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: luisbravoa
--

ALTER TABLE ONLY files ALTER COLUMN id SET DEFAULT nextval('files_id_seq'::regclass);


--
-- Name: applications_pkey; Type: CONSTRAINT; Schema: public; Owner: luisbravoa; Tablespace:
--

ALTER TABLE ONLY applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: bugs_pkey; Type: CONSTRAINT; Schema: public; Owner: luisbravoa; Tablespace:
--

ALTER TABLE ONLY bugs
    ADD CONSTRAINT bugs_pkey PRIMARY KEY (id);


--
-- Name: environments_pkey; Type: CONSTRAINT; Schema: public; Owner: luisbravoa; Tablespace:
--

ALTER TABLE ONLY environments
    ADD CONSTRAINT environments_pkey PRIMARY KEY (id);


--
-- Name: files_pkey; Type: CONSTRAINT; Schema: public; Owner: luisbravoa; Tablespace:
--

ALTER TABLE ONLY files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--
--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: luisbravoa; Tablespace:
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying NOT NULL,
    name character varying(255) NOT NULL,
    password character varying NOT NULL,
    token character varying,
    role character(10),
    created timestamp without time zone,
    modified timestamp without time zone
);


ALTER TABLE public.users OWNER TO luisbravoa;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: luisbravoa
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO luisbravoa;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: luisbravoa
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: luisbravoa
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: luisbravoa; Tablespace:
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
