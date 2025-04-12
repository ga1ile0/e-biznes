package controllers

import (
	"ebiznes-zadanie4/database"
	"ebiznes-zadanie4/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetProducts(c echo.Context) error {
	var products []models.Product
	result := database.DB.Find(&products)

	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error fetching products"})
	}

	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")

	var product models.Product
	result := database.DB.First(&product, id)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	result := database.DB.Create(&product)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating product"})
	}

	return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID format"})
	}

	var product models.Product
	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	updatedProduct := new(models.Product)
	if err := c.Bind(updatedProduct); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	product.Name = updatedProduct.Name
	product.Description = updatedProduct.Description
	product.Price = updatedProduct.Price

	database.DB.Save(&product)

	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")

	var product models.Product
	result := database.DB.First(&product, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	database.DB.Delete(&product)

	return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted successfully"})
}

func GetProductsByCategory(c echo.Context) error {
	categoryID := c.Param("categoryId")

	var category models.Category
	result := database.DB.First(&category, categoryID)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	var products []models.Product
	result = database.DB.Where("category_id = ?", categoryID).Find(&products)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error fetching products"})
	}

	return c.JSON(http.StatusOK, products)
}
