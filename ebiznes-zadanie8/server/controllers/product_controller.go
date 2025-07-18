// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package controllers

import (
	"ebiznes-zadanie8/server/database"
	"ebiznes-zadanie8/server/models"
	"net/http"

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
