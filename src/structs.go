package main

import ("regexp");

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