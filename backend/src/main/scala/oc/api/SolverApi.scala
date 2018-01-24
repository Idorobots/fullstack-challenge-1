package oc.api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import oc.{Board, Solver}

import scala.util.{Failure, Success}

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
    }
}

object SolverApi {
  def apply(solver: Solver): SolverApi =
    new SolverApi(solver)
}
