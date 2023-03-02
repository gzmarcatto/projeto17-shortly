--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

-- Started on 2023-03-02 17:17:35 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 209 (class 1259 OID 24957)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE sessions OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24963)
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL,
    "viewCount" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE urls OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24969)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 3358 (class 0 OID 24957)
-- Dependencies: 209
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sessions (id, "userId", token, "createdAt") FROM stdin;
\.


--
-- TOC entry 3359 (class 0 OID 24963)
-- Dependencies: 210
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY urls (id, "shortUrl", url, "userId", "viewCount", "createdAt") FROM stdin;
\.


--
-- TOC entry 3360 (class 0 OID 24969)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, name, email, password, "createdAt") FROM stdin;
\.


-- Completed on 2023-03-02 17:17:35 -03

--
-- PostgreSQL database dump complete
--

