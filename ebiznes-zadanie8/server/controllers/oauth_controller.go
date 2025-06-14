// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sat Jun 14 10:51:47 PM CEST 2025

package controllers

import (
    "crypto/rand"
    "encoding/base64"
    "fmt"
    "net/http"
    "net/url"
    "time"

    "ebiznes-zadanie8/server/config"
    "ebiznes-zadanie8/server/database"
    "ebiznes-zadanie8/server/models"

    "github.com/labstack/echo/v4"
    "golang.org/x/oauth2"
)

var stateStorage = map[string]time.Time{}

func GenerateState() string {
    b := make([]byte, 32)
    rand.Read(b)
    s := base64.StdEncoding.EncodeToString(b)
    stateStorage[s] = time.Now().Add(10 * time.Minute)
    return s
}

func VerifyState(st string) bool {
    exp, ok := stateStorage[st]
    if !ok || time.Now().After(exp) {
        delete(stateStorage, st)
        return false
    }
    delete(stateStorage, st)
    return true
}

func GoogleLogin(c echo.Context) error {
    st := GenerateState()
    return c.Redirect(http.StatusTemporaryRedirect, config.GoogleOAuthConfig.AuthCodeURL(st))
}

func GoogleCallback(c echo.Context) error {
    if !VerifyState(c.QueryParam("state")) {
        return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/login?error=state")
    }

    tok, err := config.GoogleOAuthConfig.Exchange(oauth2.NoContext, c.QueryParam("code"))
    if err != nil {
        return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/login?error=exchange")
    }

    googleUser, err := config.GetGoogleUserInfo(tok)
    if err != nil {
        return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/login?error=userinfo")
    }

    var u models.User
    if database.DB.Where("google_id = ?", googleUser.ID).First(&u).Error != nil {
        u = models.User{
            Username:  googleUser.Name,
            Email:     googleUser.Email,
            GoogleID:  googleUser.ID,
            Picture:   googleUser.Picture,
            LastLogin: time.Now(),
        }
        database.DB.Create(&u)
    }

    database.DB.Create(&models.OAuthToken{
        UserID:       u.ID,
        Provider:     "google",
        AccessToken:  tok.AccessToken,
        RefreshToken: tok.RefreshToken,
        TokenType:    tok.TokenType,
        Expiry:       tok.Expiry,
    })

    jwtTok, _ := GenerateToken(u.ID)
    enc := url.QueryEscape(jwtTok)
    fmt.Println("redirect token:", enc)
    return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:3000/oauth/callback?token="+enc)
}