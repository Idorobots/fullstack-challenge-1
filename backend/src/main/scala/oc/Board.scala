package oc

import enumeratum._

sealed abstract class FieldType(override val entryName: String) extends EnumEntry

object FieldType extends Enum[FieldType] {
  val values = findValues

  case object Empty extends FieldType("empty")
  case object Start extends FieldType("start")
  case object End extends FieldType("end")
  case object Gravel extends FieldType("gravel")
  case object Boulder extends FieldType("boulder")
  case object WHEntrance extends FieldType("wh_entrance")
  case object WHExit extends FieldType("wh_exit")
}

final case class Field(`type`: FieldType, weight: Float);

final case class Dim(x: Int, y: Int);

final case class Coords(x: Int, y: Int);

final case class Board(boardDim: Dim, board: Array[Field]);
