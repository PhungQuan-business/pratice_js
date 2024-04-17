#!/bin/bash
# chmod +x /path/to/yourscript.sh
# Update package list
sudo apt update

# Install required dependencies
sudo apt install -y curl

# Download and install Minikube binary
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verify Minikube installation
minikube version
