#!/usr/bin/env bash

# -----------------------------------------
# Подготовка проекта для запуска тестов
#
# $CI_DEPLOY_ENVIRONMENT принимает название проекта (репозитория),
# который должен распологаться в соседней директории
# -----------------------------------------

if [ -z $CI_DEPLOY_ENVIRONMENT ]
	then
		. ./hooks/config.sh
		. ./hooks/outdated.sh
		npm run server install
	else
		. ./hooks/branches.sh $CI_DEPLOY_ENVIRONMENT
fi

exit 0;
