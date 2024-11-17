.PHONY: dev down logs clean view-db clean-all restart ps

up-dev:
	docker compose --profile dev up -d --build

down-dev:
	docker compose --profile dev down

logs:
	docker compose --profile dev logs -f

clean:
	docker compose --profile dev down -v
	docker volume rm postgres_data || true

view-db:
	docker exec -it $$(docker ps -qf "name=db") psql -U postgres -d dev_spss

clean-all: down
	rm -rf node_modules

restart:
	docker compose --profile dev restart

ps:
	docker compose --profile dev ps

dev: down-dev up-dev
	@echo "Server is starting...";\
	npm run dev
