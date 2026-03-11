LOCAL_UID ?= $(shell id -u)
LOCAL_GID ?= $(shell id -g)

.PHONY: all up upd down clean install dev-shell build preview help

all: help

up: ## Start dev server in foreground
	docker compose up app-dev

upd: ## Start dev server in background
	docker compose up app-dev -d

down: ## Stop all containers
	docker compose down --remove-orphans

clean: ## Stop containers and remove volumes
	docker compose down --remove-orphans --volumes

install: ## Install dependencies
	docker compose run --rm --no-deps -e npm_config_cache=/tmp/npm-cache app-dev npm install

dev-shell: ## Enter dev container shell as current user
	docker compose run -u $(LOCAL_UID):$(LOCAL_GID) --rm -ti app-dev sh

root-shell: ## Enter dev container shell as root
	docker compose run --rm -ti app-dev sh

build: ## Build production Docker image
	docker build -t my-app .

preview: ## Preview production build locally
	docker compose up app

help: ## Show available commands
	@echo ""
	@echo "Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*##' Makefile | awk 'BEGIN {FS = ":.*##"}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
