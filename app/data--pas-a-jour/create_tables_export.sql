

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
-- Name: game_players; Type: TABLE; Schema: public; Owner: fbfadmin
--

CREATE TABLE public.game_players (
    id integer NOT NULL,
    game_id integer NOT NULL,
    name character varying(255) NOT NULL,
    preferred_theme character varying(255),
    score integer DEFAULT 0
);


ALTER TABLE public.game_players OWNER TO fbfadmin;

--
-- Name: game_players_id_seq; Type: SEQUENCE; Schema: public; Owner: fbfadmin
--

CREATE SEQUENCE public.game_players_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.game_players_id_seq OWNER TO fbfadmin;

--
-- Name: game_players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbfadmin
--

ALTER SEQUENCE public.game_players_id_seq OWNED BY public.game_players.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: fbfadmin
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    archived boolean DEFAULT false
);


ALTER TABLE public.games OWNER TO fbfadmin;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: fbfadmin
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.games_id_seq OWNER TO fbfadmin;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbfadmin
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: played_cards; Type: TABLE; Schema: public; Owner: fbfadmin
--

CREATE TABLE public.played_cards (
    id integer NOT NULL,
    game_id integer NOT NULL,
    question_id integer NOT NULL,
    player_id integer,
    points integer DEFAULT 0,
    played_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.played_cards OWNER TO fbfadmin;

--
-- Name: played_cards_id_seq; Type: SEQUENCE; Schema: public; Owner: fbfadmin
--

CREATE SEQUENCE public.played_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.played_cards_id_seq OWNER TO fbfadmin;

--
-- Name: played_cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbfadmin
--

ALTER SEQUENCE public.played_cards_id_seq OWNED BY public.played_cards.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: fbfadmin
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    theme integer NOT NULL,
    question text NOT NULL,
    response text NOT NULL,
    question_image character varying(255),
    archived boolean DEFAULT false,
    youtube_url character varying(255),
    youtube_start integer,
    youtube_end integer,
    response_image character varying(255)
);


ALTER TABLE public.questions OWNER TO fbfadmin;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: fbfadmin
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO fbfadmin;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbfadmin
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: themes; Type: TABLE; Schema: public; Owner: fbfadmin
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    theme_name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    color character varying(20) NOT NULL,
    theme_image character varying(255),
    archived boolean DEFAULT false
);


ALTER TABLE public.themes OWNER TO fbfadmin;

--
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: fbfadmin
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.themes_id_seq OWNER TO fbfadmin;

--
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fbfadmin
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- Name: game_players id; Type: DEFAULT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.game_players ALTER COLUMN id SET DEFAULT nextval('public.game_players_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: played_cards id; Type: DEFAULT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.played_cards ALTER COLUMN id SET DEFAULT nextval('public.played_cards_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- Name: game_players game_players_pkey; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: played_cards played_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.played_cards
    ADD CONSTRAINT played_cards_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: themes themes_color_key; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_color_key UNIQUE (color);


--
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- Name: themes themes_slug_key; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_slug_key UNIQUE (slug);


--
-- Name: themes themes_theme_name_key; Type: CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_theme_name_key UNIQUE (theme_name);


--
-- Name: game_players game_players_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.game_players
    ADD CONSTRAINT game_players_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE CASCADE;


--
-- Name: played_cards played_cards_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.played_cards
    ADD CONSTRAINT played_cards_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE CASCADE;


--
-- Name: questions questions_theme_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fbfadmin
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_theme_fkey FOREIGN KEY (theme) REFERENCES public.themes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

