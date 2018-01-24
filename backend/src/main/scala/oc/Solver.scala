package oc

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


  // FIXME Add cats.Eq instance for FieldType
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
    precompute(board).map { precomputed =>
      // TODO Solve for shortest path.
      precomputed.holes.map(_.coords)
    }
  }
}

object Solver {
  def apply()(implicit ectx: ExecutionContext): Solver =
    new Solver()(ectx)
}
