#!/bin/bash

kubectl delete -f ./k8s/postgresql-deployment.yaml
kubectl delete -f ./k8s/postgresql-service.yaml
kubectl delete -f ./k8s/postgresql-init-script.yaml
kubectl delete -f ./k8s/secrets.yaml
kubectl delete -f ./k8s/config.yaml
kubectl delete -f ./k8s/postgresql-persistent-volume-claim.yaml
kubectl delete -f ./k8s/postgresql-persistent-volume.yaml

kubectl delete -f ./k8s/backend-deployment.yaml
kubectl delete -f ./k8s/backend-service.yaml
