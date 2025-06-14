// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sat Jun 14 10:51:47 PM CEST 2025

package main

import (
    "ebiznes-zadanie8/server/config"
    "ebiznes-zadanie8/server/controllers"
    "ebiznes-zadanie8/server/database"
    "fmt"
    "net/http"
    "os"

    "github.com/joho/godotenv"
    echojwt "github.com/labstack/echo-jwt/v4"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func main() {
    _ = godotenv.Load()

    fmt.Println("JWT_SECRET length:", len(os.Getenv("JWT_SECRET")))

    database.InitDB()
    config.InitGoogleOAuth()

    e := echo.New()
    e.Use(middleware.Logger(), middleware.Recover())

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
        AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
        ExposeHeaders:    []string{"Authorization"},
        AllowCredentials: true,
    }))

    jwtSecret := controllers.GetJWTSecret()
    fmt.Printf("Using JWT secret (%d bytes)\n", len(jwtSecret))

    jwtConfig := echojwt.Config{
        SigningKey:    jwtSecret,
        TokenLookup:   "header:Authorization",
        SigningMethod: "HS256",
        ParseTokenFunc: func(c echo.Context, auth string) (interface{}, error) {
            return controllers.ParseJWT(c, auth)
        },
    }
    restricted := e.Group("/api")
    restricted.Use(echojwt.WithConfig(jwtConfig))
    restricted.GET("/user/me", controllers.GetCurrentUser)

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Welcome to the Store API!")
    })
    e.POST("/api/login", controllers.Login)
    e.POST("/api/register", controllers.Register)
    e.GET("/api/auth/google", controllers.GoogleLogin)
    e.GET("/api/auth/google/callback", controllers.GoogleCallback)
    e.GET("/api/products", controllers.GetProducts)
    e.GET("/api/products/:id", controllers.GetProduct)
    e.POST("/api/payments", controllers.ProcessPayment)

    e.Logger.Fatal(e.Start(":8080"))
}