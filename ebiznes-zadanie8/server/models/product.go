// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string  `json:"name" gorm:"size:200;not null"`
	Description string  `json:"description" gorm:"type:text"`
	Price       float64 `json:"price" gorm:"not null"`
	ImageURL    string  `json:"image_url" gorm:"size:500"`
}
