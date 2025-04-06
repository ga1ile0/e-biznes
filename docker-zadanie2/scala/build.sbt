name := """play-scala-seed"""
organization := "com.example"

version := "1.0-SNAPSHOT"
lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "3.6.4"
libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test

Universal / javaOptions ++= Seq(
  "-Dpidfile.path=/dev/null"
)