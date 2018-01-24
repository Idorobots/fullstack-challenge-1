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

  // FIXME Add cats.Eq instance for FieldType & PrecomputedField
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

  // NOTE Plain distance heuristic. It's not addmisible in this case though.
  def estimate(field: PrecomputedField, goal: PrecomputedField): Double =
    sqrt(pow((goal.coords.x - field.coords.x).toDouble, 2) + pow((goal.coords.y - goal.coords.y).toDouble, 2))

  // FIXME Imperative style sux.
  @SuppressWarnings(Array(
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
      })

      while (!open.isEmpty) {
        val curr = open.dequeue()

        if (curr == board.end) {
          return Some(recoverPath(board.end))
        }

        closed += curr

        // TODO Actually find the path.

      }
    return None
  }
}

object Solver {
  def apply()(implicit ectx: ExecutionContext): Solver =
    new Solver()(ectx)
}
