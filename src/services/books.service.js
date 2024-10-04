// const id = require('faker/lib/locales/id_ID');
const knex = require('../database/knex');
const Paginator = require('./paginator');


function makeBookService (){
    function getInformation(payload) {
        const information = {
            name: payload.name,
            author: payload.author,
            abstract: payload.abstract,
            typeid: payload.typeid,
            image: payload.image,
        };
        console.log(information);
        Object.keys(information).forEach(
            (key) => information[key] === undefined && delete information[key]
        );
        // show we can connect to database successfully 
        knex.select('*').from('books')
            .then(rows => {
                console.log('Connected to the database successfully');
            })
            .catch(error => {
                console.error('Error connecting to the database:', error);
            });


        return information;
    }


    // define a function to get all type books

    

    // define function to add new book 
    async function addBook(payload) {
        const book  = getInformation(payload);
        console.log(book);
        const [id] = await knex('books').insert(book);
        return {id, ...book};
    }

    //define function to get many books by filter 
    async function getManyBooks(query) {
        const { name, author, typeid, id, type, page = 1, limit = 10 } = query;
        const paginator = new Paginator(page, limit);

        let queryBuilder = knex('BOOKS')
            .select(
            knex.raw('count(BOOKS.id) OVER() AS recordsCount'),
            'BOOKS.id',
            'BOOKS.name',
            'BOOKS.author',
            'BOOKS.abstract',
            'TYPE.name as typename',
            'BOOKS.image'
            )
            .from('BOOKS')
            .join('TYPE', 'BOOKS.typeid', 'TYPE.type_id')
            .where((builder) => {
                if (name) {
                    builder.where('BOOKS.name', 'like', `%${name}%`);
                }
                if (author) {
                    builder.where('BOOKS.author', 'like', `%${author}%`);
                }
                if (typeid) {
                    builder.where('BOOKS.typeid', typeid);
                }
                if (id) {
                    builder.where('BOOKS.id', id);
                }
                if(type){
                    builder.where('TYPE.name','like',  `%${type}%`);
                }

            });
        
        if(Object.keys(query).length!==0&&!name) {
            queryBuilder = queryBuilder.limit(paginator.limit).offset(paginator.offset);
        }

        const results = await queryBuilder;

        let totalRecords = 0;
        results.forEach((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
        });

        return {
            metadata: paginator.getMetadata(totalRecords),
            books: results,
        };
    }




    // define function to get book by id 
    async function getBookById(id) {
        const book = await knex('books').where('id', id).select("*").first();
        return book;
    }

    // define function to update book 
    async function updateBook(id, payload) {
        const update = getInformation(payload);
        return knex('books').where('id', id).update(update);
    }

    // define function to delete book
    async function deleteBook(id) {
        return knex('books').where('id', id).del();
    }
    // define function to delete all books
    async function deleteAllBooks() {
        return knex('books').del();
    }
    // delete all books 



    


    /////////////////////////////////////
    return {
        addBook,
        getManyBooks,
        getBookById,
        updateBook,     
        deleteBook,
        deleteAllBooks,
        getBookById,
    }

}

module.exports = makeBookService;