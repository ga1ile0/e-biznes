package scopes

import (
	"gorm.io/gorm"
)

func WithCartItems(db *gorm.DB) *gorm.DB {
	return db.Preload("Items")
}

func WithFullCartDetails(db *gorm.DB) *gorm.DB {
	return db.Preload("Items").Preload("Items.Product").Preload("Items.Product.Category")
}

func NonEmptyCarts(db *gorm.DB) *gorm.DB {
	return db.Where("id IN (SELECT DISTINCT cart_id FROM cart_items)")
}
