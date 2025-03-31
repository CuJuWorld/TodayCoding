// Products
const products = [
  { id: 1, name: 'Product 1', categoryId: 101, price: 20 },
  { id: 2, name: 'Product 2', categoryId: 102, price: 30 },
];
const productDatabase = {
  'prod1': { name: 'iPhone 16e', USD: 499, quantity: 15 },
  'prod2': { name: 'iPhone 16 Plus', USD: 699, quantity: 5 },
  'prod3': { name: 'iPhone 16 Pro Max', USD: 899, quantity: 10 },
  'prod4': { name: 'Mac Air 15', USD: 999, quantity: 20 },
  'prod5': { name: 'Mac Pro 14', USD: 1099, quantity: 12 },
  'prod6': { name: 'Mac Pro 16', USD: 1199, quantity: 8 }
};
// Create a new product
function createProduct(product) {
  // Implementation here
}

// Create a new product (async)
async function createProduct(product) {
  // Implementation here: API POST request to productsApiUrl
  console.log('Creating product', product);
}

// Retrieve all products
function getAllProducts(query) {
  // Implementation here
}

// Retrieve a specific product by ID
function getProductById(id) {
  // Implementation here
}

// Update an existing product by ID
function updateProduct(id, updates) {
  // Implementation here
}

// Delete a product by ID
function deleteProduct(id) {
  // Implementation here
}

// Categories
const categories = [
  { id: 101, name: 'Category 1' },
  { id: 102, name: 'Category 2' },
];

// Create a new category
function createCategory(category) {
  // Implementation here
}

// Retrieve all categories
function getAllCategories() {
  // Implementation here
}

// Retrieve a specific category by ID
function getCategoryById(id) {
  // Implementation here
}

// Update an existing category by ID
function updateCategory(id, updates) {
  // Implementation here
}

// Delete a category by ID
function deleteCategory(id) {
  // Implementation here
}

// Customers
const customers = [
  { id: 201, name: 'Customer 1' },
  { id: 202, name: 'Customer 2' },
];

// Create a new customer
function createCustomer(customer) {
  // Implementation here
}

// Retrieve all customers
function getAllCustomers() {
  // Implementation here
}

// Retrieve a specific customer by ID
function getCustomerById(id) {
  // Implementation here
}

// Update an existing customer by ID
function updateCustomer(id, updates) {
  // Implementation here
}

// Delete a customer by ID
function deleteCustomer(id) {
  // Implementation here
}

// Orders
const orders = [
  { id: 301, customerId: 201, status: 'pending' },
  { id: 302, customerId: 202, status: 'shipped' },
];

// Create a new order
function createOrder(order) {
  // Implementation here
}

// Retrieve all orders
function getAllOrders(query) {
  // Implementation here
}

// Retrieve a specific order by ID
function getOrderById(id) {
  // Implementation here
}

// Update an existing order by ID
function updateOrder(id, updates) {
  // Implementation here
}

// Delete an order by ID
function deleteOrder(id) {
  // Implementation here
}

// Reviews
const reviews = [
  { id: 401, productId: 1, rating: 5 },
  { id: 402, productId: 2, rating: 4 },
];

// Create a new review for a product
function createReview(review) {
  // Implementation here
}

// Retrieve all reviews for a specific product
function getAllReviews(query) {
  // Implementation here
}

// Retrieve a specific review by ID
function getReviewById(id) {
  // Implementation here
}

// Update an existing review by ID
function updateReview(id, updates) {
  // Implementation here
}

// Delete a review by ID
function deleteReview(id) {
  // Implementation here
}

// Products
const productsApiUrl = '/api/products'; // Placeholder URL

// Retrieve all products
async function getAllProducts(query) {
  // Implementation here: API GET request to productsApiUrl with query parameters
  console.log('Retrieving all products with query', query);
}

// Retrieve a specific product by ID
async function getProductById(id) {
  // Implementation here: API GET request to productsApiUrl/{id}
  console.log('Retrieving product by ID', id);
}

// Update an existing product by ID
async function updateProduct(id, updates) {
  // Implementation here: API PUT request to productsApiUrl/{id} with updates
  console.log('Updating product', id, updates);
}

// Delete a product by ID
async function deleteProduct(id) {
  // Implementation here: API DELETE request to productsApiUrl/{id}
  console.log('Deleting product', id);
}

// Categories
const categoriesApiUrl = '/api/categories'; // Placeholder URL

// Create a new category
async function createCategory(category) {
  // Implementation here: API POST request to categoriesApiUrl
  console.log('Creating category', category);
}

// Retrieve all categories
async function getAllCategories() {
  // Implementation here: API GET request to categoriesApiUrl
  console.log('Retrieving all categories');
}

// Retrieve a specific category by ID
async function getCategoryById(id) {
  // Implementation here: API GET request to categoriesApiUrl/{id}
  console.log('Retrieving category by ID', id);
}

// Update an existing category by ID
async function updateCategory(id, updates) {
  // Implementation here: API PUT request to categoriesApiUrl/{id} with updates
  console.log('Updating category', id, updates);
}

// Delete a category by ID
async function deleteCategory(id) {
  // Implementation here: API DELETE request to categoriesApiUrl/{id}
  console.log('Deleting category', id);
}

// Customers
const customersApiUrl = '/api/customers'; // Placeholder URL

// Create a new customer
async function createCustomer(customer) {
  // Implementation here: API POST request to customersApiUrl
  console.log('Creating customer', customer);
}

// Retrieve all customers
async function getAllCustomers() {
  // Implementation here: API GET request to customersApiUrl
  console.log('Retrieving all customers');
}

// Retrieve a specific customer by ID
async function getCustomerById(id) {
  // Implementation here: API GET request to customersApiUrl/{id}
  console.log('Retrieving customer by ID', id);
}

// Update an existing customer by ID
async function updateCustomer(id, updates) {
  // Implementation here: API PUT request to customersApiUrl/{id} with updates
  console.log('Updating customer', id, updates);
}

// Delete a customer by ID
async function deleteCustomer(id) {
  // Implementation here: API DELETE request to customersApiUrl/{id}
  console.log('Deleting customer', id);
}

// Orders
const ordersApiUrl = '/api/orders'; // Placeholder URL

// Create a new order
async function createOrder(order) {
  // Implementation here: API POST request to ordersApiUrl
  console.log('Creating order', order);
}

// Retrieve all orders
async function getAllOrders(query) {
  // Implementation here: API GET request to ordersApiUrl with query parameters
  console.log('Retrieving all orders with query', query);
}

// Retrieve a specific order by ID
async function getOrderById(id) {
  // Implementation here: API GET request to ordersApiUrl/{id}
  console.log('Retrieving order by ID', id);
}

// Update an existing order by ID
async function updateOrder(id, updates) {
  // Implementation here: API PUT request to ordersApiUrl/{id} with updates
  console.log('Updating order', id, updates);
}

// Delete an order by ID
async function deleteOrder(id) {
  // Implementation here: API DELETE request to ordersApiUrl/{id}
  console.log('Deleting order', id);
}

// Reviews
const reviewsApiUrl = '/api/reviews'; // Placeholder URL

// Create a new review for a product
async function createReview(review) {
  // Implementation here: API POST request to reviewsApiUrl
  console.log('Creating review', review);
}

// Retrieve all reviews for a specific product
async function getAllReviews(query) {
  // Implementation here: API GET request to reviewsApiUrl with query parameters
  console.log('Retrieving all reviews with query', query);
}

// Retrieve a specific review by ID
async function getReviewById(id) {
  // Implementation here: API GET request to reviewsApiUrl/{id}
  console.log('Retrieving review by ID', id);
}

// Update an existing review by ID
async function updateReview(id, updates) {
  // Implementation here: API PUT request to reviewsApiUrl/{id} with updates
  console.log('Updating review', id, updates);
}

// Delete a review by ID
async function deleteReview(id) {
  // Implementation here: API DELETE request to reviewsApiUrl/{id}
  console.log('Deleting review', id);
}
