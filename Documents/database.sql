drop table if EXISTS roles cascade;
drop table if EXISTS users cascade;
drop table if EXISTS institutions_categories cascade;
drop table if EXISTS institutions cascade;
drop table if EXISTS users_donations cascade;
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
	image VARCHAR (200),
    user_id int NOT NULL references users(user_id),
	institution_name VARCHAR (200) NOT NULL,
	endereco VARCHAR (200) NOT NULL,
	bairro VARCHAR (200) NOT NULL,
	cep VARCHAR (200) NOT NULL,
    cidade VARCHAR (200) default null,
	telefone VARCHAR (30) NOT NULL,
	email VARCHAR (200),
	cnpj VARCHAR (14),
	descricao VARCHAR(1000),
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
	approved boolean not null DEFAULT true,
    deleted boolean not null DEFAULT false
);

create table users_donations (
	user_donation_id BIGSERIAL PRIMARY KEY,
	user_id int NOT NULL references users(user_id),
    image VARCHAR (200),
	title VARCHAR (80) NOT NULL,
	description VARCHAR (500) NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted boolean not null DEFAULT false
);

insert into roles (role_id, rolename) values (0, 'Administrador');
insert into roles (role_id, rolename) values (1, 'Doador');
insert into roles (role_id, rolename) values (2, 'Administrador Instituição');

insert into users (role_id, username, email, password, cellphone) values (0, 'Administrador', 'admin@gmail.com', '$2b$10$hbiTjICrsPzXnsMTducHzOzvrm0L1LorrSjO3QHs32Xax0q1O8lPa','(53) 99999-9999');
insert into users (role_id, username, email, password, cellphone) values (1, 'Usuario', 'usuario@gmail.com', '$2b$10$I4gONxdYyfIoXXTsjX3KBOHHh/JO09eK9Mnwac6kz9wJ4TTjQ5LGe','(53) 99999-9999');
insert into users (role_id, username, email, password, cellphone) values (2, 'Instituicao', 'instituicao@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');

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

insert into users (role_id, username, email, password, cellphone) values (2, 'SOS Animais', 'instituicao1@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (1, 4, 'SOS Animais','Rua Santos Dumont, 574', 'Centro', '96020380', 'Pelotas', '53981557095', 'sosanimaispelotas@gmail.com', null,'SOS Animais Pelotas é uma ong que possui o objetivo de diminuir a população de animais de rua de Pelotas de maneira ética através da castração. Realizamos mutirões de atendimento veterinário em vilas carentes da cidade de Pelotas. Realizamos eventos (chás, brechós), pedágios e vendemos produtos (camisetas, moletons, adesivos) para arrecadação de verba para as nossas atividades. Castramos mensalmente, no mínimo, 60 fêmeas.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Casa do carinho', 'instituicao2@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (2, 5, 'Casa do carinho','Rua Gago Coutinho, 272', 'Areal', '96080120', 'Pelotas', '53991044951', null, null, 'Promoção de ações socioeducativas complementares para a criança e o adolescente em cumprimento de medidas protetivas de acolhimento institucional e familiar de modo a atender 34 crianças, na faixa etária de 0 a 18 anos, afastados do convívio familiar por meio de medida protetiva de acolhimento, em função de abandono ou cujas famílias ou responsáveis encontrem-se temporariamente impossibilitados de cumprir sua função de cuidado e proteção, até que seja viabilizado o retorno ao convívio com a família de origem ou, na sua impossibilidade, encaminhamento para família extensa ou substituta.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Asilo de Mendigos de Pelota', 'instituicao3@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (3, 6, 'Asilo de Mendigos de Pelotas', 'Parque Dom Antônio Zattera, 338', 'Centro', '96015180', 'Pelotas', '5332224762', 'asilomenpelotas@brturbo.com', '92239383000173', 'É uma Organização da Sociedade Civil, sem fins lucrativos, que promove a inclusão da pessoa com Deficiência Intelectual, produzindo e difundindo conhecimento, está em Formosa há 45 anos e atende mais de 160 alunos. Promover o diagnóstico, prevenção e a inclusão da pessoa com Deficiência Intelectual produzindo e difundindo conhecimento.Manter-se como referência no diagnóstico, prevenção e inclusão da pessoa com Deficiência Intelectual e tornar-se referência na geração e difusão de conhecimento sobre a Deficiência Intelectual.');
insert into users (role_id, username, email, password, cellphone) values (2, 'ABELUPE - Associação Beneficente Luterana de Pelotas', 'instituicao4@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (4, 7, 'ABELUPE - Associação Beneficente Luterana de Pelotas', 'Rua Luciano Gallet, 600', 'Santos Dumont', '96060500', 'Pelotas', '5332232307', 'abelupe@ig.com.br', '89877500000110', 'Entidade que busca atender as pessoas carentes em suas necessidades espirituais, educacionais e na área da saúde. Temos uma entidade voltada para a promoção de uma vida de qualidade para todos os que procuram seu trabalho de assistência integral.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Associação De Pais E Amigos Dos Excepcionais de Pelotas', 'instituicao5@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (4, 8, 'Associação De Pais E Amigos Dos Excepcionais de Pelotas', 'Rua Olga Eiffler, 220', 'Cohab Tablada', '96055670', 'Pelotas', '5332232306', 'apaepel@terra.com.br', '89875090000178', 'A Associação de Pais e Amigos dos Excepcionais é uma associação em que, além de pais e amigos dos excepcionais, toda a comunidade se une para prevenir e tratar a deficiência e promover o bem estar e desenvolvimento da pessoa com deficiência.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Hospital Espirita de Pelotas', 'instituicao6@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (4, 9, 'Hospital Espirita de Pelotas', 'Av. Domingos José de Almeida, 2969', 'Areal', '96085470', 'Pelotas', '32281288', 'hepel@terra.com.br', '92202498000193', 'Entidade filantrópica, sem fins econômicos, fundada pela Liga Espírita Pelotense em 1948. Atua na área de saúde mental sob uma visão holística, biopsíquica, sociológica, espiritual.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Banco de Alimentos de Pelotas', 'instituicao7@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (5, 10, 'Banco de Alimentos de Pelotas', 'Av. Bento Gonçalves, 4825A', 'Centro', '96015140', 'Pelotas', '5321238055', 'bancodealimentospelotas@gmail.com', '8101556000186', 'Banco de Alimentos surgiu da união da Diocese de Pelotas com o Mutirão para a Superação da Fome e da Miséria. O trabalho do Banco é organizar a coleta e a distribuição de alimentos na cidade de Pelotas.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Sociedade Pelotense de Assistência e Cultura', 'instituicao8@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (6, 11, 'Sociedade Pelotense de Assistência e Cultura', 'Rua Felix da Cunha, 412', 'Centro', '96010000', 'Pelotas', '5321288244', 'tianefr@gmail.com', '92238914000103', ' ONG de Assistência Social, ONG de Educação e ONG de Saúde.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Fundação de Apoio Universitári', 'instituicao9@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (6, 12, 'Fundação de Apoio Universitário', 'Rua Professor Araújo, 538', 'Centro', '96020360', 'Pelotas', '5332844900', 'direcao@fau.com.br', '89876114000103', 'ONG de Assistência Social Proteção Social e ONG de Ensino Superior.');
insert into users (role_id, username, email, password, cellphone) values (2, 'Instituição Comunitária de Crédito da Região Sul', 'instituicao10@gmail.com', '$2b$10$o/q0Ouxa99iqaDXPAVXUsuNOJfNC38rcJwZeqOlGYCBRhkj8mFalu','(53) 99999-9999');
insert into institutions (institution_category_id, user_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao) values (6, 13, 'Instituição Comunitária de Crédito da Região Sul', 'Lobo  da Costa, 1274, Piso 1', 'Centro', '96010150', 'Pelotas', '5332278279', 'iccsul@uol.com.br', '5087411000180', 'Desenvolvimento Comunitário e Social, Preservação e Proteção da Vida Selvagem, Produção Eco-Sustentável e Promoção da Participação Social e Política.');

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
