package com.ebiznes.model

data class Product(
    val id: Int,
    val name: String,
    val description: String,
    val price: Double,
    val categoryId: Int
)