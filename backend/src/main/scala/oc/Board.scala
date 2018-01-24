package oc

final case class Field(`type`: String, weight: Float);

final case class Dim(x: Int, y: Int);

final case class Coords(x: Int, y: Int);

final case class Board(boardDim: Dim, board: Array[Field]);
