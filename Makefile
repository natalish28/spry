.PHONY: run stop lint deploy-frontend deploy-backend

run:
	docker compose up --build

stop:
	docker compose down

lint:
	ruff check backend/
	cd frontend && npm run build

deploy-frontend:
	cd frontend && npm run build
	@echo "Static bundle ready for deployment."

deploy-backend:
	docker build -t spry-backend backend/
	@echo "Backend image built successfully."
