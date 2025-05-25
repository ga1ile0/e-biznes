// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package controllers

import (
	"ebiznes-zadanie8/server/database"
	"ebiznes-zadanie8/server/models"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

var jwtSecret = []byte("your-secret-key-here")

func Login(c echo.Context) error {
	loginRequest := new(models.LoginRequest)
	if err := c.Bind(loginRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request format"})
	}

	var user models.User
	result := database.DB.Where("username = ?", loginRequest.Username).First(&user)
	if result.Error != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid username or password"})
	}

	if !models.CheckPasswordHash(loginRequest.Password, user.Password) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid username or password"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
	}

	return c.JSON(http.StatusOK, models.LoginResponse{
		Token: tokenString,
		User: models.User{
			Model:    user.Model,
			Username: user.Username,
			Email:    user.Email,
		},
	})
}

func Register(c echo.Context) error {
	registerRequest := new(models.RegisterRequest)
	if err := c.Bind(registerRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request format"})
	}

	if registerRequest.Username == "" || registerRequest.Email == "" || registerRequest.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Username, email, and password are required"})
	}

	var existingUser models.User
	result := database.DB.Where("username = ?", registerRequest.Username).First(&existingUser)
	if result.Error == nil {
		return c.JSON(http.StatusConflict, map[string]string{"error": "Username already taken"})
	}

	result = database.DB.Where("email = ?", registerRequest.Email).First(&existingUser)
	if result.Error == nil {
		return c.JSON(http.StatusConflict, map[string]string{"error": "Email already registered"})
	}

	hashedPassword, err := models.HashPassword(registerRequest.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to process registration"})
	}

	user := models.User{
		Username: registerRequest.Username,
		Email:    registerRequest.Email,
		Password: hashedPassword,
	}

	result = database.DB.Create(&user)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to register user"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate token"})
	}

	return c.JSON(http.StatusCreated, models.LoginResponse{
		Token: tokenString,
		User: models.User{
			Model:    user.Model,
			Username: user.Username,
			Email:    user.Email,
		},
	})
}
