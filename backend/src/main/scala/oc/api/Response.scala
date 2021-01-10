package oc.api

import akka.http.scaladsl.model.MediaTypes.`application/json`
import akka.http.scaladsl.model.{HttpEntity, HttpResponse, StatusCodes}
import org.json4s.native.Serialization.write

object Response extends JsonSupport {
  def InternalServerError(e: Throwable): HttpResponse =
    HttpResponse(StatusCodes.InternalServerError, entity = HttpEntity(e.getMessage))

  def OK(body: AnyRef): HttpResponse =
    HttpResponse(StatusCodes.OK, entity = HttpEntity(`application/json`, write(body)))

  val NotFound: HttpResponse = HttpResponse(StatusCodes.NotFound)
}
