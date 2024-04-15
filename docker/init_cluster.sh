#!/bin/bash
# chmod +x /path/to/yourscript.sh
# Start Minikube with a single node
minikube start --nodes=1

# Build Docker image
docker build -t my-python-app:latest .

# Apply Kubernetes Deployment
kubectl apply -f deployment.yaml

# Apply Kubernetes Service
kubectl apply -f service.yaml

# Check status of Deployment and Pods
kubectl get deployment myapp-deployment
kubectl get pods

# Check status of Service
kubectl get service myapp-service

# Open the application in default browser (Minikube)
minikube service myapp-service
