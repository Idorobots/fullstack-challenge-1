package oc

import scala.math._
import scala.concurrent.{Future, ExecutionContext}

final case class PrecomputedField(field: Field, coords: Coords)

final case class PrecomputedBoard(
  dims: Dim,
  fields: Seq[PrecomputedField],
  start: PrecomputedField,
  end: PrecomputedField,
  holes: Seq[PrecomputedField]
)

class Solver(implicit ectx: ExecutionContext) {
  type Path = Seq[Coords];

  def indexToCoords(dims: Dim, index: Int): Coords =
    Coords(index % dims.x, index / dims.x)

  // FIXME Add cats.Eq instance for FieldType.
  @SuppressWarnings(Array("org.wartremover.warts.Equals"))
  def precompute(board: Board): Option[PrecomputedBoard] = {
    val fields = board.board.zipWithIndex.map {
      case (f, i) => PrecomputedField(f, indexToCoords(board.boardDim, i))
    }
    for {
      start <- fields.find(_.field.`type` == FieldType.Start)
      end <- fields.find(_.field.`type` == FieldType.End)
    } yield PrecomputedBoard(
      board.boardDim,
      fields,
      start,
      end,
      fields.filter(_.field.`type` == FieldType.WHExit)
    )
  }

  def solve(board: Board): Future[Option[Path]] = Future {
    for {
      precomputed <- precompute(board)
      path <- aStar(precomputed)
    } yield path
  }

  private def getNeighbour(board: PrecomputedBoard, x: Long, y: Long): Option[PrecomputedField] =
    if (x < 0 || y < 0 || x >= board.dims.x || y >= board.dims.y) {
      None
    } else {
      Some(board.fields((y * board.dims.x + x).toInt))
    }

  // FIXME Add cats.Eq instance for FieldType.
  @SuppressWarnings(Array("org.wartremover.warts.Equals"))
  private def getNeighbours(board: PrecomputedBoard, coords: Seq[Coords]): Seq[PrecomputedField] =
    coords.map(coord => getNeighbour(board, coord.x, coord.y))
      .map(_.toList)
      .flatten
      .filter(_.field.`type` != FieldType.Boulder)

  // NOTE Simple 8-way neighbourhood with wormholes.
  def neighbours(board: PrecomputedBoard, field: PrecomputedField): Seq[PrecomputedField] = {
    val defaultNeighbours = getNeighbours(board, Seq(
        Coords(field.coords.x-1, field.coords.y-1),
        Coords(field.coords.x, field.coords.y-1),
        Coords(field.coords.x+1, field.coords.y-1),
        Coords(field.coords.x-1, field.coords.y),
        Coords(field.coords.x+1, field.coords.y),
        Coords(field.coords.x-1, field.coords.y+1),
        Coords(field.coords.x, field.coords.y+1),
        Coords(field.coords.x+1, field.coords.y+1)
    ))

    field.field.`type` match {
      case FieldType.WHEntrance => board.holes ++ defaultNeighbours
      case _ => defaultNeighbours
    }
  }

  // NOTE Plain distance heuristic. It's not addmisible in this case though.
  def estimate(field: PrecomputedField, goal: PrecomputedField): Double =
    sqrt(pow((goal.coords.x - field.coords.x).toDouble, 2) + pow((goal.coords.y - field.coords.y).toDouble, 2))

  // FIXME Imperative style sux.
  @SuppressWarnings(Array(
    "org.wartremover.warts.Any",
    "org.wartremover.warts.Equals",
    "org.wartremover.warts.MutableDataStructures",
    "org.wartremover.warts.NonUnitStatements",
    "org.wartremover.warts.Return",
    "org.wartremover.warts.While"
  ))
  private def aStar(board: PrecomputedBoard): Option[Path] = {
      val cameFrom = scala.collection.mutable.Map.empty[PrecomputedField, PrecomputedField]

      def recoverPath(current: PrecomputedField): Path =
        if (cameFrom.contains(current)) {
          List(current.coords) ++ recoverPath(cameFrom(current))
        } else {
          List(current.coords)
        }

      val gScore = scala.collection.mutable.Map[PrecomputedField, Double]().withDefaultValue(Double.PositiveInfinity)
      gScore += (board.start -> 0)

      val fScore = scala.collection.mutable.Map[PrecomputedField, Double]().withDefaultValue(Double.PositiveInfinity)
      fScore += (board.start -> estimate(board.start, board.end))

      val closed = scala.collection.mutable.Set.empty[PrecomputedField]
      val open = scala.collection.mutable.PriorityQueue(board.start)(Ordering.by {
        field => fScore(field)
      }).reverse

      while (!open.isEmpty) {
        val curr = open.dequeue()

        if (curr == board.end) {
          return Some(recoverPath(board.end))
        }

        closed += curr

        neighbours(board, curr).foreach { neighbour =>
          if (!closed.contains(neighbour)) {
            if (!open.find(_ == neighbour).isDefined) {
              open += neighbour
            }

            val score = gScore(curr) + neighbour.field.weight

            if (score < gScore(neighbour)) {
              cameFrom += (neighbour -> curr)
              gScore += (neighbour -> score)
              fScore += (neighbour -> (score + estimate(neighbour, board.end)))
            }
          }
        }
      }
    return None
  }
}

object Solver {
  def apply()(implicit ectx: ExecutionContext): Solver =
    new Solver()(ectx)
}
