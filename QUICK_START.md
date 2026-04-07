# Quick Start Guide

## 🚀 Get Started in 30 Minutes

This guide will help you get your development environment set up and understand the first steps.

---

## ✅ Prerequisites Checklist

Before you begin, ensure you have:

- [ ] **Azure Account**
  - Student account with $100 credit activated
  - Subscription ID noted
  - Access to Azure Portal
  
- [ ] **Domain Name**
  - Registered on Cloudflare (paid)
  - Access to Cloudflare dashboard
  - API token created

- [ ] **GitHub Account**
  - Repository created: `portfolio-devops-project`
  - Personal Access Token (PAT) with `write:packages` scope
  
- [ ] **Azure DevOps Account**
  - Free account created
  - Organization set up
  - Service connection to Azure configured
  
- [ ] **Local Development Machine**
  - macOS/Linux/Windows with WSL2
  - 8GB+ RAM
  - 20GB+ free disk space

---

## 📋 Phase 1: Local Setup (Day 1)

### **Step 1: Install Local Tools**

**macOS:**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install essential tools
brew install git docker kubectl helm k9s terraform azure-cli node python@3.11

# Verify installations
git --version
docker --version
kubectl version --client
helm version
node --version
python3 --version
```

**Linux (Ubuntu/Debian):**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.11
sudo apt install python3.11 python3.11-venv python3-pip
```

### **Step 2: Set Up GitHub Repository**

```bash
# Create project directory
mkdir -p ~/projects/portfolio-devops-project
cd ~/projects/portfolio-devops-project

# Initialize Git
git init
git branch -M main

# Create initial structure
mkdir -p apps/{portfolio-frontend,detection-backend,chrome-extension}
mkdir -p infrastructure/{kubernetes,helm,argocd,terraform}
mkdir -p scripts docs tests

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Build outputs
dist/
build/
*.egg-info/

# Environment files
.env
.env.local
*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Kubernetes
kubeconfig
*.kubeconfig

# Secrets
secrets/
*.pem
*.key
*.crt

# Terraform
.terraform/
*.tfstate
*.tfstate.backup
EOF

# Create README
cat > README.md << 'EOF'
# DevOps Portfolio Project

A production-grade DevOps portfolio showcasing Kubernetes, CI/CD, monitoring, and ML deployment.

## Features
- 🌐 Modern portfolio website (React + TailwindCSS)
- 🧠 Depression detection ML service (FastAPI + HuggingFace)
- 🔌 Chrome extension for social media protection
- ☸️ Kubernetes deployment with Helm
- 🚀 Complete CI/CD pipeline (GitHub Actions + ArgoCD)
- 📊 Full observability stack (Prometheus + Grafana + Loki)
- 🔐 Security best practices (Trivy, Snyk, sealed secrets)

## Tech Stack
- **Infrastructure**: K3s, Helm, ArgoCD
- **Frontend**: React, Vite, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, HuggingFace Transformers, Redis
- **Monitoring**: Prometheus, Grafana, Loki
- **Security**: Trivy, Snyk, cert-manager
- **Cloud**: Cloudflare (DNS/CDN)

## Quick Start
See [QUICK_START.md](./QUICK_START.md)

## Documentation
- [Architecture](./PROJECT_ARCHITECTURE.md)
- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)
- [AI Development Guide](./AI_DEVELOPMENT_GUIDE.md)
- [Tools & Resources](./TOOLS_AND_RESOURCES.md)
EOF

# Initial commit
git add .
git commit -m "Initial project structure"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-devops-project.git
git push -u origin main
```

### **Step 3: Configure GitHub Secrets**

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

1. **AZURE_CREDENTIALS**
   - Service principal credentials (JSON format)
   - See Azure setup section below

2. **ACR_USERNAME** and **ACR_PASSWORD**
   - Azure Container Registry credentials
   - Will be created after Terraform provisioning

3. **CLOUDFLARE_API_TOKEN**
   - Create at: Cloudflare Dashboard → My Profile → API Tokens
   - Template: "Edit zone DNS"

### **Step 4: Set Up Local Development Environment**

```bash
# Install VS Code extensions
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension ms-azuretools.vscode-docker
code --install-extension redhat.vscode-yaml
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode

# Or open VS Code and install manually
```

---

## 📋 Phase 2: Azure Setup (Day 2-3)

### **Step 1: Set Up Azure Account**

```bash
# Install Azure CLI (if not already installed)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify student subscription
az account list --output table

# Set the subscription
az account set --subscription "Azure for Students"

# Verify
az account show

# Check available credits
az consumption budget list
```

### **Step 2: Create Service Principal for Terraform**

```bash
# Create service principal
az ad sp create-for-rbac \
  --name "terraform-portfolio" \
  --role="Contributor" \
  --scopes="/subscriptions/YOUR_SUBSCRIPTION_ID" \
  --sdk-auth > azure-credentials.json

# Save the output - you'll need it for GitHub Secrets
cat azure-credentials.json

# The output will look like:
# {
#   "clientId": "...",
#   "clientSecret": "...",
#   "subscriptionId": "...",
#   "tenantId": "..."
# }

# Set environment variables for Terraform
export ARM_CLIENT_ID="<clientId>"
export ARM_CLIENT_SECRET="<clientSecret>"
export ARM_SUBSCRIPTION_ID="<subscriptionId>"
export ARM_TENANT_ID="<tenantId>"

# Add to ~/.bashrc or ~/.zshrc for persistence
echo 'export ARM_CLIENT_ID="<clientId>"' >> ~/.zshrc
echo 'export ARM_CLIENT_SECRET="<clientSecret>"' >> ~/.zshrc
echo 'export ARM_SUBSCRIPTION_ID="<subscriptionId>"' >> ~/.zshrc
echo 'export ARM_TENANT_ID="<tenantId>"' >> ~/.zshrc
```

### **Step 3: Initialize Terraform**

```bash
# Navigate to terraform directory
cd infrastructure/terraform

# Create backend storage for Terraform state
az group create --name tfstate-rg --location eastus

az storage account create \
  --name tfstateportfolio \
  --resource-group tfstate-rg \
  --location eastus \
  --sku Standard_LRS

az storage container create \
  --name tfstate \
  --account-name tfstateportfolio

# Get storage account key
az storage account keys list \
  --resource-group tfstate-rg \
  --account-name tfstateportfolio \
  --query '[0].value' -o tsv

# Set environment variable
export ARM_ACCESS_KEY="<storage-account-key>"
```

### **Step 4: Provision Azure Infrastructure with Terraform**

```bash
# Navigate to production environment
cd environments/production

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit variables
vim terraform.tfvars
# Update:
# - location = "East US"
# - owner_email = "your-email@example.com"
# - project_name = "portfolio"

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive

# Create execution plan
terraform plan -out=tfplan

# Review the plan carefully
# Check estimated costs (should be ~$95/month)

# Apply the plan
terraform apply tfplan

# This will create:
# - Resource Group
# - AKS Cluster (2 system nodes + 1 GPU spot node)
# - Azure Container Registry
# - Azure Cache for Redis
# - Azure Key Vault
# - Virtual Network
# - Public IP
# - Log Analytics Workspace

# Save outputs
terraform output -json > outputs.json

# Get important values
terraform output aks_cluster_name
terraform output acr_login_server
terraform output public_ip
```

### **Step 5: Configure kubectl for AKS**

```bash
# Get AKS credentials
az aks get-credentials \
  --resource-group rg-portfolio-production \
  --name aks-portfolio-production

# Verify connection
kubectl get nodes

# You should see:
# - 2 system nodes (Standard_B2s)
# - 1 gpu node (Standard_NC4as_T4_v3 - spot instance)

# Check GPU node
kubectl get nodes -l workload=gpu

# Verify GPU is available
kubectl describe node -l workload=gpu | grep -i gpu

# Install k9s for cluster management
curl -sS https://webinstall.dev/k9s | bash

# Launch k9s
k9s
```

### **Step 6: Configure ACR Access**

```bash
# Get ACR credentials
ACR_NAME=$(terraform output -raw acr_login_server | cut -d'.' -f1)

# Login to ACR
az acr login --name $ACR_NAME

# Get ACR credentials for GitHub Actions
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username -o tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value -o tsv)

# Save these for GitHub Secrets
echo "ACR_USERNAME: $ACR_USERNAME"
echo "ACR_PASSWORD: $ACR_PASSWORD"

# Verify AKS can pull from ACR
kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_NAME.azurecr.io \
  --docker-username=$ACR_USERNAME \
  --docker-password=$ACR_PASSWORD \
  --namespace=default
```

---

## 📋 Phase 3: Kubernetes Core Infrastructure (Day 3-4)

### **Step 1: Install cert-manager**

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Verify
kubectl get pods -n cert-manager

# Wait for all pods to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=cert-manager -n cert-manager --timeout=300s
```

### **Step 2: Install Sealed Secrets**

```bash
# Install Sealed Secrets controller
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Install kubeseal CLI (local machine)
# macOS
brew install kubeseal

# Linux
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/kubeseal-0.24.0-linux-amd64.tar.gz
tar xfz kubeseal-0.24.0-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/kubeseal

# Verify
kubectl get pods -n kube-system | grep sealed-secrets
```

### **Step 3: Install Metrics Server**

```bash
# AKS comes with metrics-server pre-installed
# Verify it's running
kubectl get deployment metrics-server -n kube-system

# Test metrics
kubectl top nodes
kubectl top pods -A
```

### **Step 4: Install ArgoCD**

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for pods
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
# Save this password!

# Port-forward to access UI (from local machine)
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Access at: https://localhost:8080
# Username: admin
# Password: (from above command)

# Install ArgoCD CLI (optional)
# macOS
brew install argocd

# Linux
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64
```

---

## 📋 Phase 4: First Application (Day 4-5)

### **Step 1: Create a Simple Test Deployment**

```bash
# Create test namespace
kubectl create namespace test-app

# Create a simple deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-test
  namespace: test-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-test
  namespace: test-app
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
EOF

# Verify
kubectl get pods -n test-app
kubectl get svc -n test-app

# Test (from within cluster)
kubectl run -it --rm debug --image=alpine --restart=Never -- sh
# Inside the pod:
apk add curl
curl http://nginx-test.test-app.svc.cluster.local
exit
```

### **Step 2: Set Up Cloudflare DNS**

```bash
# Get the public IP from Terraform
PUBLIC_IP=$(terraform output -raw public_ip)
echo "Public IP: $PUBLIC_IP"
```

1. Log in to Cloudflare Dashboard
2. Select your domain (yourname.com)
3. Go to DNS → Records
4. Add A record:
   - **Type**: A
   - **Name**: @ (root domain)
   - **IPv4 address**: $PUBLIC_IP (from above)
   - **Proxy status**: Proxied (orange cloud)
   - **TTL**: Auto
5. Add CNAME records:
   - **www** → @ (proxied)
   - **api** → @ (proxied)
   - **grafana** → @ (proxied)
   - **argocd** → @ (proxied)

### **Step 3: Configure Let's Encrypt**

```bash
# Create ClusterIssuer for Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com  # CHANGE THIS
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

# Verify
kubectl get clusterissuer
```

---

## 📋 Next Steps

You now have:
- ✅ Local development environment set up
- ✅ VM provisioned and configured
- ✅ K3s cluster running
- ✅ Core infrastructure installed (cert-manager, ArgoCD, etc.)
- ✅ DNS configured
- ✅ SSL certificates ready

**What's Next?**

1. **Start Building Applications** (Week 2)
   - Follow [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) Phase 2
   - Use [AI_DEVELOPMENT_GUIDE.md](./AI_DEVELOPMENT_GUIDE.md) for AI assistance

2. **Set Up Monitoring** (Week 3)
   - Install Prometheus & Grafana
   - Configure dashboards

3. **Implement CI/CD** (Week 4)
   - Create GitHub Actions workflows
   - Configure ArgoCD applications

4. **Deploy Production** (Week 5-6)
   - Deploy portfolio website
   - Deploy ML service
   - Deploy Chrome extension

---

## 🆘 Troubleshooting

### **Can't connect to AKS cluster**
```bash
# Re-get credentials
az aks get-credentials \
  --resource-group rg-portfolio-production \
  --name aks-portfolio-production \
  --overwrite-existing

# Check cluster status
az aks show \
  --resource-group rg-portfolio-production \
  --name aks-portfolio-production \
  --query provisioningState

# Verify kubeconfig
kubectl config view
```

### **Pods not starting**
```bash
# Check pod status
kubectl describe pod POD_NAME -n NAMESPACE

# Check logs
kubectl logs POD_NAME -n NAMESPACE

# Check events
kubectl get events -n NAMESPACE --sort-by='.lastTimestamp'
```

### **DNS not resolving**
- Check Cloudflare DNS propagation: https://dnschecker.org/
- Verify A record points to correct IP
- Wait up to 24 hours for full propagation

### **SSL certificate not issuing**
```bash
# Check cert-manager logs
kubectl logs -n cert-manager deployment/cert-manager

# Check certificate status
kubectl describe certificate CERT_NAME -n NAMESPACE

# Check challenge
kubectl get challenges -A
```

---

## 📚 Resources

- [Full Architecture](./PROJECT_ARCHITECTURE.md)
- [Detailed Roadmap](./IMPLEMENTATION_ROADMAP.md)
- [AI Development Guide](./AI_DEVELOPMENT_GUIDE.md)
- [Tools & Resources](./TOOLS_AND_RESOURCES.md)

---

## 🎯 Success Checklist

After completing this quick start, you should have:

- [ ] Local development tools installed
- [ ] Azure account set up with student credit
- [ ] GitHub repository created and configured
- [ ] Terraform infrastructure provisioned
- [ ] AKS cluster running (2 system + 1 GPU node)
- [ ] kubectl access configured
- [ ] ACR created and accessible
- [ ] cert-manager installed
- [ ] ArgoCD installed
- [ ] Cloudflare DNS configured
- [ ] Test deployment successful

**Congratulations!** You're ready to start building your DevOps portfolio project! 🎉

Continue with [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) Phase 2.
