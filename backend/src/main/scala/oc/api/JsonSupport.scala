package oc.api

import de.heikoseeberger.akkahttpjson4s.Json4sSupport
import org.json4s.native.Serialization
import org.json4s.{Formats, NoTypeHints, Serialization}

trait JsonSupport extends Json4sSupport {

  implicit val serialization: Serialization = Serialization

  implicit val formats: Formats = (
    Serialization.formats(NoTypeHints)
      ++ org.json4s.ext.JavaTypesSerializers.all
  )

}
