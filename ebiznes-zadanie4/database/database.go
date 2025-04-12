package database

import (
	"ebiznes-zadanie4/models"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func uintPtr(i uint) *uint {
	return &i
}

func InitDB() {
	var err error

	DB, err = gorm.Open(sqlite.Open("products.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	fmt.Println("Database connection established")

	err = DB.AutoMigrate(&models.Category{}, &models.Product{}, &models.Cart{}, &models.CartItem{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	var categoryCount int64
	DB.Model(&models.Category{}).Count(&categoryCount)

	if categoryCount == 0 {
		categories := []models.Category{
			{Name: "Electronics", Description: "Electronic devices and gadgets"},
			{Name: "Books", Description: "Books and educational materials"},
			{Name: "Clothing", Description: "Apparel and fashion items"},
			{Name: "Home & Garden", Description: "Items for home and garden"},
		}

		for _, category := range categories {
			DB.Create(&category)
		}

		fmt.Println("Database seeded with categories")
	}

	var productCount int64
	DB.Model(&models.Product{}).Count(&productCount)

	if productCount == 0 {
		products := []models.Product{
			{Name: "Laptop", Description: "High-performance laptop", Price: 1299.99, CategoryID: uintPtr(1)},
			{Name: "Smartphone", Description: "Latest smartphone model", Price: 799.99, CategoryID: uintPtr(1)},
			{Name: "Headphones", Description: "Noise-canceling headphones", Price: 199.99, CategoryID: uintPtr(1)},

			{Name: "Programming Guide", Description: "Learn programming the right way", Price: 39.99, CategoryID: uintPtr(2)},
			{Name: "Science Fiction Novel", Description: "Bestselling sci-fi book", Price: 12.99, CategoryID: uintPtr(2)},
			{Name: "Cookbook", Description: "Recipes from around the world", Price: 24.99, CategoryID: uintPtr(2)},

			{Name: "T-shirt", Description: "Cotton t-shirt in various colors", Price: 19.99, CategoryID: uintPtr(3)},
			{Name: "Jeans", Description: "Durable denim jeans", Price: 49.99, CategoryID: uintPtr(3)},
			{Name: "Jacket", Description: "Waterproof jacket for outdoor activities", Price: 89.99, CategoryID: uintPtr(3)},

			{Name: "Plant Pot", Description: "Decorative pot for indoor plants", Price: 15.99, CategoryID: uintPtr(4)},
			{Name: "Garden Tools Set", Description: "Essential tools for gardening", Price: 45.99, CategoryID: uintPtr(4)},
			{Name: "Table Lamp", Description: "Modern design lamp for your home", Price: 34.99, CategoryID: uintPtr(4)},
		}

		for _, product := range products {
			DB.Create(&product)
		}

		fmt.Println("Database seeded with products")
	}
}
