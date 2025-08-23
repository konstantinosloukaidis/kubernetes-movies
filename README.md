# Movie DB Kubernetes Setup (Minikube)

This is a simple local project, experimenting with ***Kubernetes***. The project consists of a front-end utilizing **React.js**, a back-end utilizing **FastApi**, and for the database I use **PostgreSQL** with initial data (no migrations). Everything is runs inside **Minikube** and is available using **Ingress** locally. All Docker images are already published to Docker Hub, so no local build or push is required. 

---

## Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed  
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed  
- Docker installed (for Minikube driver)  

---

## 1️⃣ Start Minikube

```bash
minikube start --driver=docker
```

Verify Minikube is running:

```bash
minikube status
kubectl get nodes
```

---

## 2️⃣ Deploy Project

We provide a single script to delete any existing resources and deploy everything fresh:

```bash
# Delete existing resources
kubectl delete -f k8s/ --ignore-not-found

# Apply new resources
kubectl apply -f k8s/
```

> `k8s/` folder contains the Deployments, Services, ConfigMaps, and Ingress YAMLs for frontend, backend, and PostgreSQL.

---

## 3️⃣ Expose Services via Ingress

On Windows, run:

```bash
minikube tunnel
```

- This allows the Ingress controller to expose services to your host machine.  
- Keep this terminal open while using the app, else it will hang.

---

## 4️⃣ Access the Application

- **Frontend:** `http://localhost/`  
- **Backend API:** `http://localhost/api/movies`

> Axios in the frontend is configured to use relative paths (`/api`), so all requests are routed automatically through the ingress.

---

## 5️⃣ Notes

- Docker images are pulled from Docker Hub:  
  - Frontend: `konstantinosal/kubernetes-movies-frontend-service:latest`  
  - Backend: `konstantinosal/kubernetes-movies-backend-service:latest`  
- No local Docker builds or pushes are required.  
- PostgreSQL is deployed via your own Deployment in `k8s/`.  
- This setup uses **Ingress**, so no NodePorts are needed.
- Users for testing:
  - john_doe - password123
  - jane_smith - supersecure
  - alice_jones - alicepw

