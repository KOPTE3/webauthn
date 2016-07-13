#!/usr/bin/env bash

files=$(find tests -d -3 -name config.js)

for file in $files;
	do cp -vn "$file" "$(dirname $file)/config.local.js";
done;

exit 0;
