CREATE DATABASE vinyl_store
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

    -- Crear tabla de USUARIOS
CREATE TABLE USUARIOS (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    mail VARCHAR(100),
    contraseña TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol VARCHAR(50),
    foto_perfil TEXT,
    ubicacion VARCHAR(255)
);

-- Crear tabla de CATEGORIAS
CREATE TABLE CATEGORIAS (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Crear tabla de PRODUCTOS
CREATE TABLE PRODUCTOS (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
    precio NUMERIC,
    categoria_id INT REFERENCES CATEGORIAS(id),
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vendedor_id INT REFERENCES USUARIOS(id),
    estado VARCHAR(50),
    artista VARCHAR(255),
    ano INT,
    formato VARCHAR(50),
    condicion VARCHAR(50),
    imagen_url VARCHAR(255)
);

-- Crear tabla de COMPRAS
CREATE TABLE COMPRAS (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES PRODUCTOS(id),
    comprador_id INT REFERENCES USUARIOS(id),
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto_pagado NUMERIC
);

-- Crear tabla de RESEÑAS
CREATE TABLE RESEÑAS (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES PRODUCTOS(id),
    comprador_id INT REFERENCES USUARIOS(id),
    comentario TEXT,
    calificacion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba en USUARIOS
INSERT INTO USUARIOS (nombre, mail, contraseña, rol, foto_perfil, ubicacion) VALUES 
('Juan Pérez', 'juan.perez@gmail.com', 'password123', 'admin', 'perfil1.png', 'Santiago'),
('María López', 'maria.lopez@gmail.com', 'password123', 'comprador', 'perfil2.png', 'Valparaíso'),
('Carlos Díaz', 'carlos.diaz@gmail.com', 'password123', 'vendedor', 'perfil3.png', 'Concepción'),
('Ana Torres', 'ana.torres@gmail.com', 'password123', 'comprador', 'perfil4.png', 'La Serena'),
('Jorge Vidal', 'jorge.vidal@gmail.com', 'password123', 'admin', 'perfil5.png', 'Antofagasta'),
('Lucía Rojas', 'lucia.rojas@gmail.com', 'password123', 'comprador', 'perfil6.png', 'Osorno'),
('Tomás Vega', 'tomas.vega@gmail.com', 'password123', 'vendedor', 'perfil7.png', 'Temuco'),
('Isabel Soto', 'isabel.soto@gmail.com', 'password123', 'comprador', 'perfil8.png', 'Rancagua'),
('Miguel Mena', 'miguel.mena@gmail.com', 'password123', 'vendedor', 'perfil9.png', 'Puerto Montt'),
('Laura Peña', 'laura.pena@gmail.com', 'password123', 'admin', 'perfil10.png', 'Punta Arenas');

-- Insertar datos de prueba en CATEGORIAS
INSERT INTO CATEGORIAS (nombre, descripcion) VALUES 
('Rock', 'Música Rock'),
('Pop', 'Música Pop'),
('Jazz', 'Música Jazz'),
('Clásica', 'Música Clásica'),
('Reggae', 'Música Reggae');

-- Insertar datos de prueba en PRODUCTOS
INSERT INTO PRODUCTOS (titulo, descripcion, precio, categoria_id, vendedor_id, estado, artista, ano, formato, condicion) VALUES
('Vinilo de Rock Clásico', 'Vinilo de colección en perfecto estado', 20000, 1, 1, 'nuevo', 'The Beatles', 1967, 'Vinilo', 'Perfecto'),
('Vinilo Pop 80s', 'Edición limitada de vinilo pop', 15000, 2, 3, 'usado', 'Michael Jackson', 1982, 'Vinilo', 'Bueno'),
('Vinilo de Jazz Moderno', 'Excelente vinilo de jazz', 25000, 3, 5, 'nuevo', 'Miles Davis', 1970, 'Vinilo', 'Perfecto'),
('Vinilo Clásico Beethoven', 'Música clásica de Beethoven', 30000, 4, 7, 'usado', 'Beethoven', 1824, 'Vinilo', 'Muy Bueno'),
('Vinilo Reggae Legend', 'Clásico vinilo de reggae', 12000, 5, 9, 'usado', 'Bob Marley', 1984, 'Vinilo', 'Bueno');

-- Insertar datos de prueba en COMPRAS
INSERT INTO COMPRAS (producto_id, comprador_id, monto_pagado) VALUES
(1, 2, 20000),
(2, 4, 15000),
(3, 6, 25000),
(4, 8, 30000),
(5, 10, 12000);

-- Insertar datos de prueba en RESEÑAS
INSERT INTO RESEÑAS (producto_id, comprador_id, comentario, calificacion) VALUES
(1, 2, 'Excelente compra, el producto llegó en perfectas condiciones.', 5),
(2, 4, 'El vinilo estaba bien, pero la entrega demoró mucho.', 3),
(3, 6, 'Buena calidad del vinilo, recomendable.', 4),
(4, 8, 'Música excelente, pero el vinilo estaba un poco rayado.', 3),
(5, 10, 'Todo perfecto, muy satisfecho con la compra.', 5);
