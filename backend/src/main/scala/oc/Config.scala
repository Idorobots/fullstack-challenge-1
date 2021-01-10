package oc

import com.typesafe.config.ConfigFactory

object Config {

  private val config = ConfigFactory.load()

  object Rest {
    val host: String = config.getString("oc.rest.host")
    val port: Int = config.getInt("oc.rest.port")
  }

  val heuristic: String = config.getString("oc.heuristic")

}
