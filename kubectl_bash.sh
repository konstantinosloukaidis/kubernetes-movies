#!/bin/bash

kubectl apply -f postgresql-persistent-volume.yaml
kubectl apply -f postgresql-persistent-volume-claim.yaml
kubectl apply -f config.yaml
kubectl apply -f secrets.yaml
kubectl apply -f postgresql-init-script.yaml
kubectl apply -f postgresql-service.yaml
kubectl apply -f postgresql-deployment.yaml

