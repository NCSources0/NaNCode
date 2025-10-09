// THIS FILE CONTAINS THE "MAIN" KNOWLEDGE
// FOR THIS INTERPRETER.

package main

import (
	"fmt"
	"os"
)

var docsLink = "https://GitHub.com/NCSources0/NaNCode/docs"

func main() {
	fmt.Println("NaNCode | By Dominic Kolp and NCSources")
	fmt.Printf("Documentation can be found here: %s \n", docsLink)
	fmt.Printf("=====================\n")
	if len(os.Args) > 1 {
		if os.Args[1] == "build" {
			build(os.Args[2])
		}
	} else {
		fmt.Println("Expected arguments. Read documentation for more info.")
	}
}

func build(filePath string) {
	var file, err = os.ReadFile(filePath)
	if err != nil {
		fmt.Printf("File '%s' not found \n", filePath)
		fmt.Printf("Try checking if you wrote the name correctly. \n")
	} else {
		
	}
}
