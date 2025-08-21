#!/bin/bash

kubectl apply -f ./k8s/postgresql-persistent-volume.yaml
kubectl apply -f ./k8s/postgresql-persistent-volume-claim.yaml
kubectl apply -f ./k8s/postgresql-init-script.yaml
kubectl apply -f ./k8s/config.yaml
kubectl apply -f ./k8s/secrets.yaml
kubectl apply -f ./k8s/postgresql-service.yaml
kubectl apply -f ./k8s/postgresql-deployment.yaml

kubectl apply -f ./k8s/backend-service.yaml
kubectl apply -f ./k8s/backend-deployment.yaml