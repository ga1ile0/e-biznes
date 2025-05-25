// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	CardNumber     string  `json:"card_number" gorm:"size:16"`
	CardHolderName string  `json:"card_holder_name" gorm:"size:100"`
	ExpiryDate     string  `json:"expiry_date" gorm:"size:5"`
	CVV            string  `json:"cvv" gorm:"size:3"`
	Amount         float64 `json:"amount" gorm:"not null"`
}

type PaymentRequest struct {
	CardNumber     string  `json:"card_number"`
	CardHolderName string  `json:"card_holder_name"`
	ExpiryDate     string  `json:"expiry_date"`
	CVV            string  `json:"cvv"`
	Amount         float64 `json:"amount"`
}
