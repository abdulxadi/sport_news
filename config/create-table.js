const pool = require("./db")

const tables = [`
    CREATE TABLE IF NOT EXISTS languages(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255)
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS tags(
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS category(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    parent_id BIGINT
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS news_with_lang(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255),
    summary_news VARCHAR(255),
    lang_id BIGINT
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS news(
    id SERIAL PRIMARY KEY,
    news_id BIGINT,
    category_id BIGINT,
    author_id BIGINT,
    status VARCHAR(50),
    published_at DATE,
    source VARCHAR(100),
    lang_id BIGINT
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50),
    is_active BOOLEAN,
    created_at DATE,
    interests BIGINT, 
    bookmarks BIGINT
    )
    `
]

module.exports =  (req, res)=>{
    tables.forEach(async (item)=>{
        await pool.query(item)
    })
}