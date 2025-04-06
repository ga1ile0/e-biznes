package controllers

import models.{Cart, CartItem}
import play.api.libs.json.{JsError, Json}
import play.api.mvc._
import javax.inject._

import scala.collection.mutable

@Singleton
class CartController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val carts = mutable.ListBuffer[Cart]()
  private var nextId = 1

  def create(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val newCart = Cart(nextId, Seq.empty)
    carts += newCart
    nextId += 1
    Created(Json.toJson(newCart))
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    carts.find(_.id == id) match {
      case Some(cart) => Ok(Json.toJson(cart))
      case None => NotFound(Json.obj("message" -> s"Cart with ID: $id not found"))
    }
  }

  def addItem(cartId: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    carts.find(_.id == cartId) match {
      case Some(cart) =>
        request.body.asJson.map { json =>
          json.validate[CartItem].fold(
            errors => BadRequest(Json.obj("message" -> "Validation error", "errors" -> JsError.toJson(errors))),
            itemToAdd => {
              val updatedItems = cart.items :+ itemToAdd
              val updatedCart = cart.copy(items = updatedItems)
              val index = carts.indexWhere(_.id == cartId)
              carts.update(index, updatedCart)
              Ok(Json.toJson(updatedCart))
            }
          )
        }.getOrElse {
          BadRequest(Json.obj("message" -> "Expecting body as JSON"))
        }
      case None => NotFound(Json.obj("message" -> s"Cart with ID: $cartId not found"))
    }
  }

  def removeItem(cartId: Int, itemId: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    carts.find(_.id == cartId) match {
      case Some(cart) =>
        val initialSize = cart.items.size
        val updatedItems = cart.items.filterNot(_.productId == itemId)
        if (updatedItems.size < initialSize) {
          val updatedCart = cart.copy(items = updatedItems)
          val index = carts.indexWhere(_.id == cartId)
          carts.update(index, updatedCart)
          NoContent
        } else {
          NotFound(Json.obj("message" -> s"Item with ID: $itemId not found in cart with ID: $cartId"))
        }
      case None => NotFound(Json.obj("message" -> s"Cart with ID: $cartId not found"))
    }
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    carts.find(_.id == id) match {
      case Some(existingCart) =>
        request.body.asJson.map { json =>
          json.validate[Cart].fold(
            errors => BadRequest(Json.obj("message" -> "Validation error", "errors" -> JsError.toJson(errors))),
            updatedCart => {
              if (updatedCart.id == id) {
                val index = carts.indexWhere(_.id == id)
                carts.update(index, updatedCart)
                Ok(Json.toJson(updatedCart))
              } else {
                BadRequest(Json.obj("message" -> s"ID in body does not match ID in path: $id"))
              }
            }
          )
        }.getOrElse {
          BadRequest(Json.obj("message" -> "Expecting body as JSON"))
        }
      case None => NotFound(Json.obj("message" -> s"Cart with ID: $id not found"))
    }
  }
  
  def updateItem(cartId: Int, itemId: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    carts.find(_.id == cartId) match {
      case Some(cart) =>
        request.body.asJson.map { json =>
          json.validate[CartItem].fold(
            errors => BadRequest(Json.obj("message" -> "Validation error", "errors" -> JsError.toJson(errors))),
            updatedItem => {
              val index = cart.items.indexWhere(_.productId == itemId)
              if (index != -1) {
                val updatedItems = cart.items.updated(index, updatedItem.copy(productId = itemId))
                val updatedCart = cart.copy(items = updatedItems)
                val cartIndex = carts.indexWhere(_.id == cartId)
                carts.update(cartIndex, updatedCart)
                Ok(Json.toJson(updatedCart))
              } else {
                NotFound(Json.obj("message" -> s"Item with ID: $itemId not found in cart with ID: $cartId"))
              }
            }
          )
        }.getOrElse {
          BadRequest(Json.obj("message" -> "Expecting body as JSON"))
        }
      case None => NotFound(Json.obj("message" -> s"Cart with ID: $cartId not found"))
    }
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val initialSize = carts.size
    carts.filterInPlace(_.id != id)
    if (carts.size < initialSize) {
      NoContent
    } else {
      NotFound(Json.obj("message" -> s"Cart with ID: $id not found"))
    }
  }
}