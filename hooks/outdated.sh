#!/usr/bin/env bash

# ----------------------------------
# Проверяет устаревшие пакеты
# ----------------------------------

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
