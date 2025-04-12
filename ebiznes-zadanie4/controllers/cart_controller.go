package controllers

import (
	"ebiznes-zadanie4/database"
	"ebiznes-zadanie4/models"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func CreateCart(c echo.Context) error {
	cart := models.Cart{}

	result := database.DB.Create(&cart)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error creating cart"})
	}

	return c.JSON(http.StatusCreated, cart)
}

func GetCart(c echo.Context) error {
	id := c.Param("id")

	var cart models.Cart
	result := database.DB.Preload("Items.Product").First(&cart, id)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart not found"})
	}

	return c.JSON(http.StatusOK, cart)
}

func AddItemToCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID format"})
	}

	var cart models.Cart
	if result := database.DB.First(&cart, cartID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart not found"})
	}

	cartItem := new(models.CartItem)
	if err := c.Bind(cartItem); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	cartItem.CartID = uint(cartID)

	var product models.Product
	if result := database.DB.First(&product, cartItem.ProductID); result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
	}

	var existingItem models.CartItem
	result := database.DB.Where("cart_id = ? AND product_id = ?", cartID, cartItem.ProductID).First(&existingItem)

	if result.Error == nil {
		existingItem.Quantity += cartItem.Quantity
		database.DB.Save(&existingItem)
		return c.JSON(http.StatusOK, existingItem)
	}

	result = database.DB.Create(&cartItem)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error adding item to cart"})
	}

	return c.JSON(http.StatusCreated, cartItem)
}

func RemoveItemFromCart(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cartId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID format"})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid item ID format"})
	}

	result := database.DB.Where("cart_id = ? AND id = ?", cartID, itemID).Delete(&models.CartItem{})

	if result.RowsAffected == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart item not found"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Item removed from cart successfully"})
}

func UpdateCartItem(c echo.Context) error {
	cartID, err := strconv.Atoi(c.Param("cartId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid cart ID format"})
	}

	itemID, err := strconv.Atoi(c.Param("itemId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid item ID format"})
	}

	var cartItem models.CartItem
	result := database.DB.Where("cart_id = ? AND id = ?", cartID, itemID).First(&cartItem)

	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart item not found"})
	}

	updatedItem := new(models.CartItem)
	if err := c.Bind(updatedItem); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	cartItem.Quantity = updatedItem.Quantity

	database.DB.Save(&cartItem)

	return c.JSON(http.StatusOK, cartItem)
}

func DeleteCart(c echo.Context) error {
	id := c.Param("id")

	var cart models.Cart
	result := database.DB.First(&cart, id)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cart not found"})
	}

	database.DB.Where("cart_id = ?", id).Delete(&models.CartItem{})

	database.DB.Delete(&cart)

	return c.JSON(http.StatusOK, map[string]string{"message": "Cart deleted successfully"})
}
