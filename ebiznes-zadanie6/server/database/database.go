package database

import (
	"ebiznes-zadanie5/server/models"
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	var err error

	DB, err = gorm.Open(sqlite.Open("store.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	fmt.Println("Database connection established")

	err = DB.AutoMigrate(&models.Product{}, &models.Payment{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	var productCount int64
	DB.Model(&models.Product{}).Count(&productCount)

	if productCount == 0 {
		products := []models.Product{
			{Name: "Laptop", Description: "High-performance laptop", Price: 1299.99, ImageURL: "https://via.placeholder.com/150"},
			{Name: "Smartphone", Description: "Latest smartphone model", Price: 799.99, ImageURL: "https://via.placeholder.com/150"},
			{Name: "Headphones", Description: "Noise-canceling headphones", Price: 199.99, ImageURL: "https://via.placeholder.com/150"},
		}

		for _, product := range products {
			DB.Create(&product)
		}

		fmt.Println("Database seeded with products")
	}
}
