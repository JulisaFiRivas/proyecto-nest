import { Book } from 'src/books/entities/book.entity';

export const BOOK_SEED: Partial<Book>[] = [
    {
        id: 1,
        title: 'Cien años de soledad',
        synopsis: 'La historia de la familia Buendía en el pueblo ficticio de Macondo.',
        cover_image_url: 'https://images.example.com/cien_anos.png',
    },
    {
        id: 2,
        title: 'La casa de los espíritus',
        synopsis: 'Una saga familiar que sigue la vida de la familia Trueba.',
        cover_image_url: 'https://images.example.com/la_casa.png',
    },
    {
        id: 3,
        title: 'Harry Potter y la piedra filosofal',
        synopsis: 'Un joven mago descubre su herencia mágica al asistir a una escuela de hechicería.',
        cover_image_url: 'https://images.example.com/hp1.png',
    },
    {
        id: 4,
        title: '1984',
        synopsis: 'Una novela distópica sobre un futuro totalitario donde el "Gran Hermano" todo lo ve.',
        cover_image_url: 'https://images.example.com/1984.png',
    },
    {
        id: 5,
        title: 'El amor en los tiempos del cólera',
        synopsis: 'La historia de amor de Florentino Ariza y Fermina Daza.',
        cover_image_url: 'https://images.example.com/el_amor.png',
    },
];