package models

import play.api.libs.json.{Format, Json}

case class CartItem(productId: Int, quantity: Int)

object CartItem {
  implicit val cartItemFormat: Format[CartItem] = Json.format[CartItem]
}

case class Cart(id: Int, items: Seq[CartItem])

object Cart {
  implicit val cartFormat: Format[Cart] = Json.format[Cart]
}