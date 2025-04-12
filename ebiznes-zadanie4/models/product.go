package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name        string   `json:"name" gorm:"size:200;not null"`
	Description string   `json:"description" gorm:"type:text"`
	Price       float64  `json:"price" gorm:"not null"`
	CategoryID  *uint    `json:"category_id"`
	Category    Category `json:"category,omitempty" gorm:"foreignKey:CategoryID"`
}
