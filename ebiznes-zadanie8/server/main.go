// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package main

import (
	"ebiznes-zadanie8/server/controllers"
	"ebiznes-zadanie8/server/database"
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
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome to the Store API!")
	})

	e.POST("/api/login", controllers.Login)
	e.GET("/api/products", controllers.GetProducts)
	e.GET("/api/products/:id", controllers.GetProduct)
	e.POST("/api/payments", controllers.ProcessPayment)

	e.Logger.Fatal(e.Start(":8080"))
}
