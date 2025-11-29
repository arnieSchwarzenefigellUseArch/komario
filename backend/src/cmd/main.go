package main

import (
	Handlers "komario/backend/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	api := r.Group("/api")
	{
		api.GET("/", Handlers.Catalog)
		api.GET("/history", Handlers.History)
		api.GET("/about", Handlers.AboutHandler)
		api.GET("/catalog", Handlers.HomeHandler)
	}

	// r.LoadHTMLGlob("templates/*")
	// r.GET("/", Handlers.HomeHandler)
	// r.GET("/about", Handlers.AboutHandler)
	// r.GET("/catalog", Handlers.Catalog)
	// r.GET("/history", Handlers.History)
	// r.Static("/css", "/home/roman/.projects/komario/backend/styles/css")
	// r.Static("/assets", "/home/roman/.projects/komario/backend/assets")
	// r.Static("/js", "/home/roman/.projects/komario/backend/js")
	// r.StaticFile("/favicon.ico", "/home/roman/.projects/komario/backend/favicon.ico")
	// r.Run("0.0.0.0:8080")
}
