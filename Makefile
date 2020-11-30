prometheus-container:

	docker run --name prometheus --rm -d -p 9000:9000 prom/prometheus
