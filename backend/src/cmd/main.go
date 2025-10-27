package main

import (
	"fmt"
	Handlers "komario/backend/internal/handlers"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", Handlers.HomeHandler)
	http.HandleFunc("/about", Handlers.AboutHandler)
	http.HandleFunc("/catalog", Handlers.Catalog)

	log.Println("Server started on 8080 BITCH!")
	fmt.Println("Why the fuck did I even put fmt here?")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
