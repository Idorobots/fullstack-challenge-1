package oc

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.{ExceptionHandler, RejectionHandler, Route}
import akka.stream.ActorMaterializer
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import oc.api.{Response, SolverApi}

import scala.concurrent.ExecutionContext

object Main {

  implicit def rejectionHandler: RejectionHandler =
    RejectionHandler.newBuilder().handleNotFound {
      complete(Response.NotFound)
    }.result()

  implicit def exceptionHandler: ExceptionHandler =
    ExceptionHandler {
      case e: Throwable => ctx => ctx.complete(Response.InternalServerError(e))
    }

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem("obstacle-course")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val executionContext: ExecutionContext = system.dispatcher
    val solver = Solver()

    val _ = Http().bindAndHandle(routes(solver), Config.Rest.host, Config.Rest.port).map { _ =>
      system.log.info(s"Obstacle-course backend started successfully on ${Config.Rest.host}:${Config.Rest.port}!")
    }
  }

  def miscRoutes: Route =
    (path("status") & get) {
      complete(Response.OK("App works!"))
    }

  def routes(solver: Solver): Route =
    (cors() & pathPrefix("api")) {
      miscRoutes ~ SolverApi(solver).routes
    }

}
