package oc

import scala.concurrent.{Future, ExecutionContext}

class Solver(implicit ectx: ExecutionContext) {
  type Path = List[Coords];

  def solve(board: Board): Future[Path] = Future {
    List(Coords(board.boardDim.x-1, board.boardDim.y-1))
  }
}

object Solver {
  def apply()(implicit ectx: ExecutionContext): Solver =
    new Solver()(ectx)
}
