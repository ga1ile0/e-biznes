// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sat Jun 14 10:51:47 PM CEST 2025

package controllers

import (
    "fmt"
    "net/http"
    "os"
    "strings"
    "time"

    "ebiznes-zadanie8/server/database"
    "ebiznes-zadanie8/server/models"

    "github.com/golang-jwt/jwt/v4"
    "github.com/labstack/echo/v4"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func init() {
    if len(jwtSecret) == 0 {
        fmt.Println("WARNING: JWT_SECRET not set; using default")
        jwtSecret = []byte("ebiznes2025_super_secret_key")
    }
}

func GenerateToken(userID uint) (string, error) {
    claims := jwt.MapClaims{
        "sub": userID,
        "exp": time.Now().Add(72 * time.Hour).Unix(),
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    s, err := token.SignedString(jwtSecret)
    if err != nil {
        return "", err
    }
    fmt.Printf("Generated token (first 10 chars): %s...\n", s[:10])
    return s, nil
}

func GetJWTSecret() []byte {
    return jwtSecret
}

func ParseJWT(c echo.Context, auth string) (interface{}, error) {
    tokenString := strings.TrimPrefix(auth, "Bearer ")
    return jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
        if t.Method.Alg() != "HS256" {
            return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
        }
        return jwtSecret, nil
    })
}

func Login(c echo.Context) error {
    req := new(models.LoginRequest)
    if err := c.Bind(req); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
    }

    var u models.User
    if err := database.DB.Where("username = ?", req.Username).First(&u).Error; err != nil {
        return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
    }
    if !models.CheckPasswordHash(req.Password, u.Password) {
        return c.JSON(http.StatusUnauthorized, map[string]string{"error": "invalid credentials"})
    }

    tok, err := GenerateToken(u.ID)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "could not sign token"})
    }

    return c.JSON(http.StatusOK, models.LoginResponse{Token: tok, User: u})
}

func Register(c echo.Context) error {
    req := new(models.RegisterRequest)
    if err := c.Bind(req); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid request"})
    }
    if req.Username == "" || req.Email == "" || req.Password == "" {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "all fields required"})
    }
    var exists models.User
    if database.DB.Where("username = ?", req.Username).First(&exists).Error == nil {
        return c.JSON(http.StatusConflict, map[string]string{"error": "username taken"})
    }
    if database.DB.Where("email = ?", req.Email).First(&exists).Error == nil {
        return c.JSON(http.StatusConflict, map[string]string{"error": "email taken"})
    }

    hash, _ := models.HashPassword(req.Password)
    u := models.User{Username: req.Username, Email: req.Email, Password: hash}
    database.DB.Create(&u)

    tok, err := GenerateToken(u.ID)
    if err != nil {
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "could not sign token"})
    }
    return c.JSON(http.StatusCreated, models.LoginResponse{Token: tok, User: u})
}

func GetCurrentUser(c echo.Context) error {
    t := c.Get("user").(*jwt.Token)
    claims := t.Claims.(jwt.MapClaims)
    id := uint(claims["sub"].(float64))

    var u models.User
    if err := database.DB.First(&u, id).Error; err != nil {
        return c.JSON(http.StatusNotFound, map[string]string{"error": "user not found"})
    }
    u.Password = ""
    return c.JSON(http.StatusOK, u)
}