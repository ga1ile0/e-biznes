package database

import (
	"ebiznes-zadanie4/models"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	var err error

	DB, err = gorm.Open(sqlite.Open("products.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	fmt.Println("Database connection established")

	err = DB.AutoMigrate(&models.Product{}, &models.Cart{}, &models.CartItem{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	var count int64
	DB.Model(&models.Product{}).Count(&count)

	if count == 0 {
		DB.Create(&models.Product{
			Name:        "Laptop",
			Description: "High-performance laptop",
			Price:       1299.99,
		})

		DB.Create(&models.Product{
			Name:        "Smartphone",
			Description: "Latest smartphone model",
			Price:       799.99,
		})

		DB.Create(&models.Product{
			Name:        "Headphones",
			Description: "Noise-canceling headphones",
			Price:       199.99,
		})

		fmt.Println("Database seeded with products")
	}
}
