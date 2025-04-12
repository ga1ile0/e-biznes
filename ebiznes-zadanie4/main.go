package main

import (
	"ebiznes-zadanie4/controllers"
	"ebiznes-zadanie4/database"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	database.InitDB()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome to the Echo API with GORM!")
	})

	e.GET("/products", controllers.GetProducts)
	e.GET("/products/:id", controllers.GetProduct)
	e.POST("/products", controllers.CreateProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)
	e.GET("/products/category/:categoryId", controllers.GetProductsByCategory)

	e.POST("/carts", controllers.CreateCart)
	e.GET("/carts/:id", controllers.GetCart)
	e.POST("/carts/:id/items", controllers.AddItemToCart)
	e.PUT("/carts/:cartId/items/:itemId", controllers.UpdateCartItem)
	e.DELETE("/carts/:cartId/items/:itemId", controllers.RemoveItemFromCart)
	e.DELETE("/carts/:id", controllers.DeleteCart)

	e.GET("/categories", controllers.GetCategories)
	e.GET("/categories/:id", controllers.GetCategory)
	e.GET("/categories/:id/products", controllers.GetCategoryWithProducts)
	e.POST("/categories", controllers.CreateCategory)
	e.PUT("/categories/:id", controllers.UpdateCategory)
	e.DELETE("/categories/:id", controllers.DeleteCategory)

	e.Logger.Fatal(e.Start(":8080"))
}
