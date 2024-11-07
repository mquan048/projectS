.PHONY: db view_db down log clean_db dev rebuild

db:
	docker run -p5432:5432 --name dev_postgres -d \
		-e POSTGRES_PASSWORD=postgres \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_DB=postgres \
		postgres:13

view_db:
	docker exec -it dev_postgres psql -U postgres -d postgres

clean_db:
	docker stop dev_postgres
	docker rm -f dev_postgres

log:
	docker logs -f dev_postgres

down: clean_db

dev:
	@echo "Starting node server"
	npm run dev

rebuild: down dev
