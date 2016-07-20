#!/usr/bin/env bash

npm outdated --parseable | \
	cut -d : -f 2- | \
	grep -vE '(@.*):.*\1' | \
	sed 's/:.*@/\//' | \
	awk '{print } END { exit NR }'

[ $? -ne 0 ] && cat << EOF
====================================
WARNING: There are outdated packages
====================================
EOF

exit 0;
