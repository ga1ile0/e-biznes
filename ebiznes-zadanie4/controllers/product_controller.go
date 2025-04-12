package controllers

import (
	"ebiznes-zadanie4/database"
	"ebiznes-zadanie4/models"
	"ebiznes-zadanie4/scopes"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetProducts(c echo.Context) error {
	var products []models.Product
	db := database.DB

	minPrice := c.QueryParam("min_price")
	maxPrice := c.QueryParam("max_price")
	categoryID := c.QueryParam("category_id")
	sortBy := c.QueryParam("sort")
	name := c.QueryParam("name")

	db = db.Scopes(scopes.WithCategory)

	if minPrice != "" {
		if min, err := strconv.ParseFloat(minPrice, 64); err == nil {
			db = db.Scopes(scopes.PriceGreaterThan(min))
		}
	}

	if maxPrice != "" {
		if max, err := strconv.ParseFloat(maxPrice, 64); err == nil {
			db = db.Scopes(scopes.PriceLessThan(max))
		}
	}

	if categoryID != "" {
		if catID, err := strconv.ParseUint(categoryID, 10, 32); err == nil {
			db = db.Scopes(scopes.InCategory(uint(catID)))
		}
	}

	if name != "" {
		db = db.Scopes(scopes.NameContains(name))
	}

	switch sortBy {
	case "price_asc":
		db = db.Scopes(scopes.OrderByPriceAsc)
	case "price_desc":
		db = db.Scopes(scopes.OrderByPriceDesc)
	}

	// Execute query
	result := db.Find(&products)

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
	categoryID, err := strconv.ParseUint(c.Param("categoryId"), 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid category ID format"})
	}

	var category models.Category
	result := database.DB.First(&category, categoryID)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	var products []models.Product
	result = database.DB.
		Scopes(
			scopes.InCategory(uint(categoryID)),
			scopes.WithCategory,
			scopes.OrderByPriceAsc,
		).
		Find(&products)

	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error fetching products"})
	}

	return c.JSON(http.StatusOK, products)
}
