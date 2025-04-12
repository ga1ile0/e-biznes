package com.ebiznes.service

import com.ebiznes.model.Category
import org.slf4j.LoggerFactory

class CategoryService {
    private val logger = LoggerFactory.getLogger(CategoryService::class.java)
    
    private val categories = mutableListOf(
        Category(1, "Electronics", "Electronic devices and gadgets"),
        Category(2, "Books", "Books and educational materials"),
        Category(3, "Clothing", "Apparel and fashion items"),
        Category(4, "Home & Garden", "Items for home and garden")
    )
    
    fun getAllCategories(): List<Category> {
        logger.info("Fetching all categories, found ${categories.size}")
        return categories.toList()
    }
    
    fun getCategory(id: Int): Category? {
        logger.info("Looking for category with id: $id")
        return categories.find { it.id == id }
    }
}