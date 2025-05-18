package main

import (
	"ebiznes-zadanie5/server/controllers"
	"ebiznes-zadanie5/server/database"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	database.InitDB()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome to the Store API!")
	})

	e.GET("/api/products", controllers.GetProducts)
	e.GET("/api/products/:id", controllers.GetProduct)

	e.POST("/api/payments", controllers.ProcessPayment)

	e.Logger.Fatal(e.Start(":8080"))
}
