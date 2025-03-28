// Exercise 1
// Books
POST    /api/books // Create API
GET     /api/books // List API
GET     /api/books/:id // Get API
PUT     /api/books/:id // Update
DELETE  /api/books/:id // Delete

// Authors
POST    /api/authors // Create API
GET     /api/authors // List API
GET     /api/authors/:id // Get API
PUT     /api/authors/:id // Update
DELETE  /api/authors/:id // Delete

// Categories
POST    /api/categories // Create API
GET     /api/categories // List API
GET     /api/categories/:id // Get API
PUT     /api/categories/:id // Update
DELETE  /api/categories/:id // Delete

// Reviews

POST    /api/reviews // Create API
POST    /api/reviews?book_id=:id
POST    /api/books/:id/reviews


GET     /api/reviews // List API
GET     /api/reviews/:id // Get API
PUT     /api/reviews/:id // Update
DELETE  /api/reviews/:id // Delete
 

// Exercise 2

// Products
POST    /api/products // Create API
GET     /api/products // List API
GET     /api/products/:id // Get API
PUT     /api/products/:id // Update
DELETE  /api/products/:id // Delete

GET     /api/products?categoryId=123 // Filter by category (e.g., ?categoryId=123)
GET     /api/products?search=shirt // Search by name (e.g., ?search=shirt)
GET     /api/products?sort=price_asc // Sort by price (e.g., ?sort=price_asc or ?sort=price_desc)
GET     /api/products?page=2&limit=25 // Pagination (e.g., ?page=2&limit=10)

// Categories
POST    /api/product_categories // Create API
GET     /api/product_categories // List API
GET     /api/product_categories/:id // Get API
PUT     /api/product_categories/:id // Update
DELETE  /api/product_categories/:id // Delete

// Customers
POST    /api/customers // Create API
GET     /api/customers // List API
GET     /api/customers/:id // Get API
PUT     /api/customers/:id // Update
DELETE  /api/customers/:id // Delete

// Orders
POST    /api/orders // Create API
GET     /api/orders // List API
GET     /api/orders/:id // Get API

PUT     /api/orders/:id // Update
DELETE  /api/orders/:id // Delete

// Reviews
POST    /api/reviews // Create API
GET     /api/reviews // List API
GET     /api/reviews/:id // Get API
PUT     /api/reviews/:id // Update
DELETE  /api/reviews/:id // Delete

GET     /api/reviews?product_id=:pid // Filter by product ID (e.g., ?productId=789)
GET     /api/reviews?sort=rating_desc // Sort by rating (e.g., ?sort=rating_desc)
GET     /api/reviews?page=1&limit=10 // Pagination (e.g., ?page=1&limit=10)

