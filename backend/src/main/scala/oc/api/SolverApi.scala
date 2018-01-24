package oc.api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import oc.{Board, Dim, Field, FieldType, Solver}

import scala.util.{Failure, Success}

final case class Config(boardDim: Dim, availableFields: Seq[Field])

class SolverApi(solver: Solver) extends JsonSupport {
  def routes: Route =
    (path("solve") & post) {
      entity(as[Board]) { board =>
        onComplete(solver.solve(board)) {
          case Success(Some(path)) => complete(Response.OK(path))
          case Success(None) => complete(Response.NotFound)
          case Failure(ex) => complete(Response.InternalServerError(ex))
        }
      }
    } ~ (path("config") & get) {
      complete(Response.OK(Config(
        Dim(20, 15),
        List(
          Field(FieldType.Empty, 1),
          Field(FieldType.Start, 1),
          Field(FieldType.End, 1),
          Field(FieldType.Gravel, 5),
          Field(FieldType.Boulder, 0),
          Field(FieldType.WHEntrance, 1),
          Field(FieldType.WHExit, 1)
        )
      )))
    }

}

object SolverApi {
  def apply(solver: Solver): SolverApi =
    new SolverApi(solver)
}
