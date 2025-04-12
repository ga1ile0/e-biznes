package controllers

import (
	"ebiznes-zadanie4/database"
	"ebiznes-zadanie4/models"
	"ebiznes-zadanie4/scopes"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetCategories(c echo.Context) error {
	db := database.DB
	name := c.QueryParam("name")
	withProducts := c.QueryParam("with_products")

	if name != "" {
		db = db.Scopes(scopes.CategoryNameContains(name))
	}

	if withProducts == "true" {
		db = db.Scopes(scopes.HasProducts)
	}

	db = db.Scopes(scopes.OrderByNameAsc)

	var categories []models.Category
	result := db.Find(&categories)

	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error fetching categories"})
	}

	return c.JSON(http.StatusOK, categories)
}

func GetCategory(c echo.Context) error {
	id := c.Param("id")

	var category models.Category
	result := database.DB.First(&category, id)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	return c.JSON(http.StatusOK, category)
}

func GetCategoryWithProducts(c echo.Context) error {
	id := c.Param("id")

	var category models.Category
	result := database.DB.
		Scopes(scopes.WithProducts).
		First(&category, id)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	return c.JSON(http.StatusOK, category)
}

func CreateCategory(c echo.Context) error {
	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	result := database.DB.Create(&category)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating category"})
	}

	return c.JSON(http.StatusCreated, category)
}

func UpdateCategory(c echo.Context) error {
	id := c.Param("id")

	var category models.Category
	result := database.DB.First(&category, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	updatedCategory := new(models.Category)
	if err := c.Bind(updatedCategory); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	category.Name = updatedCategory.Name
	category.Description = updatedCategory.Description

	database.DB.Save(&category)

	return c.JSON(http.StatusOK, category)
}

func DeleteCategory(c echo.Context) error {
	id := c.Param("id")

	var category models.Category
	result := database.DB.First(&category, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Category not found"})
	}

	var count int64
	database.DB.Model(&models.Product{}).Where("category_id = ?", id).Count(&count)
	if count > 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Cannot delete category with products"})
	}

	database.DB.Delete(&category)

	return c.JSON(http.StatusOK, map[string]string{"message": "Category deleted successfully"})
}
