package controllers

import models.Category
import play.api.libs.json.{JsError, Json}
import play.api.mvc._
import javax.inject._

import scala.collection.mutable

@Singleton
class CategoryController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val categories = mutable.ListBuffer[Category]()
  private var nextId = 1

  def create(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    request.body.asJson.map { json =>
      json.validate[Category](Category.categoryReads).fold(
        errors => BadRequest(Json.obj("message" -> "Validation error", "errors" -> JsError.toJson(errors))),
        category => {
          val newCategory = category.copy(id = nextId)
          categories += newCategory
          nextId += 1
          Created(Json.toJson(newCategory))
        }
      )
    }.getOrElse {
      BadRequest(Json.obj("message" -> "Expecting body as JSON"))
    }
  }

  def list(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(categories.toList))
  }

  def get(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    categories.find(_.id == id) match {
      case Some(category) => Ok(Json.toJson(category))
      case None => NotFound(Json.obj("message" -> s"Category with ID: $id not found"))
    }
  }

  def update(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    request.body.asJson.map { json =>
      json.validate[Category].fold(
        errors => BadRequest(Json.obj("message" -> "Validation error", "errors" -> JsError.toJson(errors))),
        updatedCategory => {
          val index = categories.indexWhere(_.id == id)
          if (index != -1) {
            val categoryWithId = updatedCategory.copy(id = id)
            categories.update(index, categoryWithId)
            Ok(Json.toJson(categoryWithId))
          } else {
            NotFound(Json.obj("message" -> s"Category with ID: $id not found"))
          }
        }
      )
    }.getOrElse {
      BadRequest(Json.obj("message" -> "Expecting body as JSON"))
    }
  }

  def delete(id: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    val initialSize = categories.size
    categories.filterInPlace(_.id != id)
    if (categories.size < initialSize) {
      NoContent
    } else {
      NotFound(Json.obj("message" -> s"Category with ID: $id not found"))
    }
  }
}