// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package database

import (
	"ebiznes-zadanie8/server/models"
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

	err = DB.AutoMigrate(&models.Product{}, &models.Payment{}, &models.User{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	var userCount int64
	DB.Model(&models.User{}).Count(&userCount)

	if userCount == 0 {
		defaultPass, _ := models.HashPassword("password123")
		defaultUser := models.User{
			Username: "admin",
			Password: defaultPass,
			Email:    "admin@example.com",
		}

		DB.Create(&defaultUser)
		fmt.Println("Default user created")
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
