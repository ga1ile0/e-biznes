// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sat Jun 14 10:51:47 PM CEST 2025

package config

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"

    "golang.org/x/oauth2"
    "golang.org/x/oauth2/google"
)

var GoogleOAuthConfig *oauth2.Config

func InitGoogleOAuth() {
    cid := os.Getenv("GOOGLE_CLIENT_ID")
    cs := os.Getenv("GOOGLE_CLIENT_SECRET")
    if cid == "" || cs == "" {
        fmt.Println("warning: missing GOOGLE_CLIENT_ID/SECRET")
    }
    GoogleOAuthConfig = &oauth2.Config{
        ClientID:     cid,
        ClientSecret: cs,
        RedirectURL:  "http://localhost:8080/api/auth/google/callback",
        Scopes:       []string{"email", "profile"},
        Endpoint:     google.Endpoint,
    }
}

type GoogleUserInfo struct {
    ID            string `json:"id"`
    Email         string `json:"email"`
    VerifiedEmail bool   `json:"verified_email"`
    Name          string `json:"name"`
    Picture       string `json:"picture"`
}

func GetGoogleUserInfo(tok *oauth2.Token) (*GoogleUserInfo, error) {
    client := GoogleOAuthConfig.Client(oauth2.NoContext, tok)
    resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("status %s", resp.Status)
    }
    b, _ := ioutil.ReadAll(resp.Body)
    fmt.Println("Google user JSON:", string(b))
    var u GoogleUserInfo
    if err := json.Unmarshal(b, &u); err != nil {
        return nil, err
    }
    return &u, nil
}