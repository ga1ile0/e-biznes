package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Category(id: Int, name: String, description: String)

object Category {
  implicit val categoryWrites: Writes[Category] = Json.writes[Category]

  implicit val categoryReads: Reads[Category] = (
    (JsPath \ "name").read[String] ~
    (JsPath \ "description").read[String]
  )(Category(0, _, _))

  implicit val categoryFormat: Format[Category] = Format(categoryReads, categoryWrites)
}