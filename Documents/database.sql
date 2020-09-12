drop table if EXISTS roles cascade;
drop table if EXISTS users cascade;
drop table if EXISTS institutions_categories cascade;
drop table if EXISTS institutions cascade;
drop table if EXISTS session cascade;

create table roles (
	role_id  BIGSERIAL PRIMARY KEY,
	rolename VARCHAR (200) NOT NULL UNIQUE
);

create table users (
	user_id BIGSERIAL PRIMARY KEY,
	role_id int NOT NULL references roles(role_id),
	username VARCHAR (200) NOT NULL,
	email VARCHAR (200) UNIQUE NOT NULL,
	password VARCHAR (200) NOT NULL,
    password_temp VARCHAR (200) default null,
	cellphone VARCHAR (30) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted boolean not null DEFAULT false
);

create table institutions_categories (
	institution_category_id BIGSERIAL PRIMARY KEY,
	institution_category_name VARCHAR (200) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted boolean not null DEFAULT false
);

create table institutions (
	institution_id BIGSERIAL PRIMARY KEY,
	institution_category_id int NOT NULL references institutions_categories(institution_category_id),
	institution_name VARCHAR (200) NOT NULL,
	endereco VARCHAR (200) NOT NULL,
	bairro VARCHAR (200) NOT NULL,
	cep VARCHAR (200) NOT NULL,
    cidade VARCHAR (200) default null,
	telefone VARCHAR (30) NOT NULL,
	email VARCHAR (200) UNIQUE NOT NULL,
	cnpj VARCHAR (14) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted boolean not null DEFAULT false
);

insert into roles (role_id, rolename) values (0, 'Adminstrador');
insert into roles (role_id, rolename) values (1, 'Usuario');

insert into users (role_id, username, email, password, cellphone) values (0, 'Adminstrador', 'teste@gmail.com', '$2b$10$hbiTjICrsPzXnsMTducHzOzvrm0L1LorrSjO3QHs32Xax0q1O8lPa','(53) 99999-9999');

insert into institutions_categories (institution_category_name) values ( 'Animais' );
insert into institutions_categories (institution_category_name) values ( 'Crianças' );
insert into institutions_categories (institution_category_name) values ( 'Idosos' );
insert into institutions_categories (institution_category_name) values ( 'Saúde' );
insert into institutions_categories (institution_category_name) values ( 'Alimentos' );
insert into institutions_categories (institution_category_name) values ( 'Outras' );
-- insert into institutions_categories (institution_category_name) values ( 'Apoio à mulheres' );
-- insert into institutions_categories (institution_category_name) values ( 'Direitos Humanos' );
-- insert into institutions_categories (institution_category_name) values ( 'Étnico Racial' );
-- insert into institutions_categories (institution_category_name) values ( 'LGBT' );
-- insert into institutions_categories (institution_category_name) values ( 'Reciclagem' );
-- insert into institutions_categories (institution_category_name) values ( 'Educação' );
-- insert into institutions_categories (institution_category_name) values ( 'Meio Ambiente' );
-- insert into institutions_categories (institution_category_name) values ( 'Moradia' );
-- insert into institutions_categories (institution_category_name) values ( 'Voluntariado' );

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
