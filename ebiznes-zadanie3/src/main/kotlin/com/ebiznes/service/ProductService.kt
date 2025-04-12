package com.ebiznes.service

import com.ebiznes.model.Product
import org.slf4j.LoggerFactory

class ProductService(private val categoryService: CategoryService) {
    private val logger = LoggerFactory.getLogger(ProductService::class.java)
    
    private val products = mutableListOf(
        Product(1, "Smartphone", "Latest smartphone with high-end features", 699.99, 1),
        Product(2, "Laptop", "Powerful laptop for professionals", 1299.99, 1),
        Product(3, "Headphones", "Noise cancelling wireless headphones", 199.99, 1),
        
        Product(4, "Programming Guide", "Learn programming the right way", 39.99, 2),
        Product(5, "Science Fiction Novel", "Bestselling sci-fi book", 12.99, 2),
        Product(6, "Cookbook", "Recipes from around the world", 24.99, 2),
        
        Product(7, "T-shirt", "Cotton t-shirt in various colors", 19.99, 3),
        Product(8, "Jeans", "Durable denim jeans", 49.99, 3),
        Product(9, "Jacket", "Waterproof jacket for outdoor activities", 89.99, 3),
        
        Product(10, "Plant Pot", "Decorative pot for indoor plants", 15.99, 4),
        Product(11, "Garden Tools Set", "Essential tools for gardening", 45.99, 4),
        Product(12, "Table Lamp", "Modern design lamp for your home", 34.99, 4)
    )
    
    fun getAllProducts(): List<Product> {
        logger.info("Fetching all products, found ${products.size}")
        return products.toList()
    }
    
    fun getProductsByCategory(categoryId: Int): List<Product> {
        val categoryProducts = products.filter { it.categoryId == categoryId }
        logger.info("Fetching products for category $categoryId, found ${categoryProducts.size}")
        
        if (categoryService.getCategory(categoryId) == null) {
            logger.warn("Attempt to find products for non-existent category ID: $categoryId")
        }
        
        return categoryProducts
    }
    
    fun getProduct(id: Int): Product? {
        logger.info("Looking for product with id: $id")
        return products.find { it.id == id }
    }
}