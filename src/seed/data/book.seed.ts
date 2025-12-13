import { Book } from 'src/books/entities/book.entity';

export const BOOK_SEED: Partial<Book>[] = [
    {
        id: 1,
        title: 'Cien años de soledad',
        synopsis: 'La historia de la familia Buendía en el pueblo ficticio de Macondo.',
        cover_image_url: 'https://www.espacioforestal.cl/cdn/shop/files/cienanosdesoledaddebolsillotd_1024x1024.png?v=1742224894',
    },
    {
        id: 2,
        title: 'La casa de los espíritus',
        synopsis: 'Una saga familiar que sigue la vida de la familia Trueba.',
        cover_image_url: 'https://dojiw2m9tvv09.cloudfront.net/82626/product/captura-de-pantalla-2025-09-11-1222425951.png',
    },
    {
        id: 3,
        title: 'Harry Potter y la piedra filosofal',
        synopsis: 'Un joven mago descubre su herencia mágica al asistir a una escuela de hechicería.',
        cover_image_url: 'https://www.espacioforestal.cl/cdn/shop/files/harrypotterylapiedrafilosofalsalamandra_1024x1024.png?v=1720889108',
    },
    {
        id: 4,
        title: '1984',
        synopsis: 'Una novela distópica sobre un futuro totalitario donde el "Gran Hermano" todo lo ve.',
        cover_image_url: 'https://www.tiendacopec.cl/cdn/shop/files/714978.png?v=1712204513',
    },
    {
        id: 5,
        title: 'El amor en los tiempos del cólera',
        synopsis: 'La historia de amor de Florentino Ariza y Fermina Daza.',
        cover_image_url: 'https://www.tiendacopec.cl/cdn/shop/files/193302.png?v=1764784396&width=533',
    },
];