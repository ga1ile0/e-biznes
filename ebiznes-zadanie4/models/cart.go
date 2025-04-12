package models

import (
	"gorm.io/gorm"
)

type CartItem struct {
	gorm.Model
	CartID    uint    `json:"cart_id" gorm:"not null"`
	ProductID uint    `json:"product_id" gorm:"not null"`
	Quantity  int     `json:"quantity" gorm:"not null;default:1"`
	Product   Product `json:"product" gorm:"foreignKey:ProductID"`
}

type Cart struct {
	gorm.Model
	Items []CartItem `json:"items" gorm:"foreignKey:CartID"`
}
