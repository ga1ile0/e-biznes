// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sat Jun 14 10:51:47 PM CEST 2025

package models

import (
    "time"

    "golang.org/x/crypto/bcrypt"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Username    string `json:"username" gorm:"unique"`
    Email       string `json:"email" gorm:"unique"`
    Password    string `json:"-"`
    GoogleID    string `json:"google_id" gorm:"unique"`
    Picture     string `json:"picture"`
    LastLogin   time.Time
    OAuthTokens []OAuthToken `gorm:"foreignKey:UserID"`
}

type OAuthToken struct {
    gorm.Model
    UserID         uint
    Provider       string
    AccessToken    string
    RefreshToken   string
    TokenType      string
    Expiry         time.Time
}

type LoginRequest struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

type RegisterRequest struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    Token string `json:"token"`
    User  User   `json:"user"`
}

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}