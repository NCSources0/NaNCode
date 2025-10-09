package main

import (
	"fmt"
	"regexp"
);

var keywords = []any{"null", "NaN", "#", "true", "false", "undefined", "if", "else", "function", "return", "try", "catch", "finally", "new"};
var functions = []any{"print", "!"};
var operators = []any{"==", ">=", "<=", ">", "<"};
var variables = map[any]any{};
var regex = map[any]*regexp.Regexp{
  "var": regexp.MustCompile(`\s*(.*?)\s*=\s*(.*)`),
  "string0": regexp.MustCompile(`"(.*?)"`),
  "string1": regexp.MustCompile(`'(.*?)'`),
  "array": regexp.MustCompile(`^\[.*]$`),
  "object": regexp.MustCompile(`^{.*}$`),
  "number": regexp.MustCompile(`^\d+$`),
};

func main() {
  fmt.Println("NaNCode | By Dominic Kolp and NCSources");
  fmt.Println("For documentation, visit https://GitHub.com/NCSources0/NaNCode/docs");
  fmt.Println(regex["var"].FindStringSubmatch(" a = 5 ")[2]);
  fmt.Println(regex["number"].FindStringSubmatch(" 42 ")[0]);
  fmt.Println(regex["string0"].FindStringSubmatch(" \"hello\" ")[1]);
  fmt.Println(regex["string1"].FindStringSubmatch(" 'hello' ")[1]);
  fmt.Println(regex["array"].FindStringSubmatch(" [1, 2, 3] ")[1]);
  fmt.Println(regex["object"].FindStringSubmatch(" {key: value} ")[1]);
}