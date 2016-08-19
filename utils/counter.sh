#!/usr/bin/env bash

# -------------------------------------------
# Производит подсчет общего количества тестов
# -------------------------------------------

dynamic_tests=`git grep -E 'describe\([[:alpha:]]' | grep cases | wc -l`
unique_dynamic_tests=`git grep -E 'describe\([[:alpha:]]' | grep cases | wc -l`

inline_tests=`git grep "describe('TEST" | grep cases | wc -l`
unique_inline_tests=`git grep --name-only "describe('TEST" | grep cases | wc -l`

total_tests=`git ls | grep TEST | wc -l`

echo "total $((total_tests + dynamic_tests + inline_tests - unique_dynamic_tests - unique_inline_tests))"
