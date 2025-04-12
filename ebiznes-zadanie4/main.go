package main

import (
    "ebiznes-zadanie4/controllers"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "net/http"
)

func main() {
    e := echo.New()

    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Welcome to the Echo API!")
    })

    e.GET("/products", controllers.GetProducts)
    e.GET("/products/:id", controllers.GetProduct)
    e.POST("/products", controllers.CreateProduct)
    e.PUT("/products/:id", controllers.UpdateProduct)
    e.DELETE("/products/:id", controllers.DeleteProduct)

    e.Logger.Fatal(e.Start(":8080"))
}