# DevOps Portfolio Project - Complete Architecture

## 🎯 Project Overview

A production-grade DevOps portfolio showcasing:
1. **Portfolio Website** - Modern React-based personal website
2. **Depression Detection Service** - Real-time text analysis using ML
3. **Chrome Extension** - Browser integration for social media protection
4. **Full DevOps Pipeline** - Complete CI/CD, monitoring, security scanning

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare (DNS/CDN/WAF)                      │
│                      yourname.com (Paid)                         │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS (Let's Encrypt)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Azure Cloud ($100 Credit)                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           Azure Kubernetes Service (AKS)                   │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │  │
│  │  │   Ingress    │  │   ArgoCD     │  │  cert-manager   │ │  │
│  │  │   (Nginx)    │  │   (GitOps)   │  │ (Certificates)  │ │  │
│  │  └──────┬───────┘  └──────────────┘  └─────────────────┘ │  │
│  │         │                                                  │  │
│  │  ┌──────▼──────────────────────────────────────────────┐  │  │
│  │  │              Application Namespace                   │  │  │
│  │  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │  │  │
│  │  │  │ Portfolio  │  │  Detection   │  │   Redis     │  │  │  │
│  │  │  │  Frontend  │  │   Backend    │  │   Cache     │  │  │  │
│  │  │  │  (React)   │  │  (FastAPI)   │  │  (Azure)    │  │  │  │
│  │  │  └────────────┘  └──────┬───────┘  └─────────────┘  │  │  │
│  │  │                          │                            │  │  │
│  │  │                          ▼                            │  │  │
│  │  │                  ┌──────────────┐                     │  │  │
│  │  │                  │ HuggingFace  │                     │  │  │
│  │  │                  │  Inference   │                     │  │  │
│  │  │                  │   (GPU)      │                     │  │  │
│  │  │                  └──────────────┘                     │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐  │  │
│  │  │           Monitoring Namespace                        │  │  │
│  │  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │  │  │
│  │  │  │ Prometheus │  │   Grafana    │  │    Loki     │  │  │  │
│  │  │  └────────────┘  └──────────────┘  └─────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Azure Supporting Services                     │  │
│  │  • Azure Container Registry (ACR)                          │  │
│  │  • Azure Cache for Redis                                   │  │
│  │  • Azure Monitor & Log Analytics                           │  │
│  │  • Azure Key Vault (Secrets)                               │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         ▲
                         │ CI/CD Pipeline
                         │
┌────────────────────────┴─────────────────────────────────────────┐
│                    GitHub + Azure DevOps                          │
│  • GitHub Actions (CI)                                            │
│  • Azure DevOps Pipelines (CD)                                    │
│  • Terraform (Infrastructure as Code)                             │
└───────────────────────────────────────────────────────────────────┘
```

## 📦 Repository Structure

```
portfolio-devops-project/
├── .github/
│   └── workflows/
│       ├── frontend-ci.yml          # React app CI/CD
│       ├── backend-ci.yml           # FastAPI CI/CD
│       ├── extension-ci.yml         # Chrome extension CI/CD
│       ├── security-scan.yml        # Trivy, SAST scanning
│       ├── helm-lint.yml            # Helm chart validation
│       └── deploy-staging.yml       # Staging deployment
│
├── apps/
│   ├── portfolio-frontend/          # React portfolio website
│   │   ├── src/
│   │   ├── public/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── nginx.conf
│   │
│   ├── detection-backend/           # FastAPI ML service
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── models/
│   │   │   ├── routers/
│   │   │   └── services/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── tests/
│   │
│   └── chrome-extension/            # Browser extension
│       ├── manifest.json
│       ├── src/
│       ├── background.js
│       └── content.js
│
├── infrastructure/
│   ├── kubernetes/
│   │   ├── base/                    # Kustomize base
│   │   ├── overlays/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   └── namespaces/
│   │
│   ├── helm/
│   │   ├── portfolio-app/           # Main application chart
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml
│   │   │   ├── values-staging.yaml
│   │   │   ├── values-prod.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── ingress.yaml
│   │   │       ├── hpa.yaml
│   │   │       └── configmap.yaml
│   │   │
│   │   └── monitoring-stack/        # Prometheus/Grafana chart
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       └── templates/
│   │
│   ├── terraform/                   # VM provisioning (optional)
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   │
│   └── argocd/
│       ├── applications/
│       │   ├── portfolio-app.yaml
│       │   └── monitoring.yaml
│       └── projects/
│
├── scripts/
│   ├── setup-vm.sh                  # Initial VM setup
│   ├── install-k3s.sh               # K3s installation
│   ├── setup-argocd.sh              # ArgoCD setup
│   ├── configure-cloudflare.sh      # DNS automation
│   └── backup.sh                    # Backup scripts
│
├── docs/
│   ├── SETUP.md                     # Complete setup guide
│   ├── DEPLOYMENT.md                # Deployment procedures
│   ├── MONITORING.md                # Monitoring guide
│   ├── TROUBLESHOOTING.md           # Common issues
│   └── AI_DEVELOPMENT_GUIDE.md      # How to use AI agents
│
├── tests/
│   ├── integration/
│   ├── e2e/
│   └── load/
│
├── docker-compose.yml               # Local development
├── Makefile                         # Common commands
├── README.md
└── .gitignore
```

## 🔧 Technology Stack Details

### **Infrastructure Layer**
- **Azure Kubernetes Service (AKS)**: Managed Kubernetes cluster
- **Terraform**: Infrastructure as Code for Azure resources
- **Azure Container Registry (ACR)**: Private container registry
- **Azure Cache for Redis**: Managed Redis service
- **Azure Key Vault**: Secrets and certificate management
- **Nginx Ingress**: Ingress controller for AKS
- **cert-manager**: Automatic SSL certificates

### **Application Layer**
- **Frontend**: React 18 + Vite + TailwindCSS + shadcn/ui
- **Backend**: FastAPI + Uvicorn + Pydantic
- **ML Model**: HuggingFace `distilbert-base-uncased-finetuned-sst-2-english` or `mental-health-detection` models
- **Cache**: Redis for rate limiting and caching
- **Database**: PostgreSQL (optional, for analytics)

### **DevOps Tools**
- **CI/CD**: GitHub Actions + Azure DevOps Pipelines
- **GitOps**: ArgoCD
- **IaC**: Terraform (Azure provider)
- **Container Registry**: Azure Container Registry (ACR)
- **Security Scanning**: 
  - Trivy (container vulnerabilities)
  - Snyk (dependency scanning)
  - Azure Defender for Containers
  - SonarCloud (SAST)
- **Secrets**: Azure Key Vault + External Secrets Operator
- **Monitoring**: Prometheus + Grafana + Azure Monitor
- **Logging**: Loki + Promtail + Azure Log Analytics
- **Tracing**: Jaeger (optional) or Azure Application Insights
- **Service Mesh**: Istio (optional, for advanced scenarios)

### **Quality & Testing**
- **Unit Tests**: pytest (backend), Jest (frontend)
- **Integration Tests**: pytest + TestContainers
- **E2E Tests**: Playwright
- **Load Testing**: k6 or Locust
- **Code Quality**: ESLint, Prettier, Black, Ruff

## 🔐 Security Best Practices

1. **Container Security**
   - Multi-stage Docker builds
   - Non-root users
   - Distroless base images
   - Regular vulnerability scanning

2. **Kubernetes Security**
   - Network policies
   - Pod security policies/standards
   - RBAC (Role-Based Access Control)
   - Resource quotas and limits
   - Secrets encryption at rest

3. **Application Security**
   - HTTPS everywhere
   - CORS configuration
   - Rate limiting
   - Input validation
   - Security headers

4. **CI/CD Security**
   - Signed commits
   - Branch protection
   - Secret scanning
   - SBOM generation
   - Image signing (Cosign)

## 🚀 Deployment Strategy

### **GitOps Workflow**
```
Developer Push → GitHub → GitHub Actions → Build & Test → 
Push to ACR → Update Helm Values → ArgoCD Sync → AKS Deploy

Infrastructure Changes → Terraform → Azure DevOps → 
Terraform Plan/Apply → Azure Resources Provisioned
```

### **Environments**
- **Local**: Docker Compose
- **Staging**: K8s namespace `staging`
- **Production**: K8s namespace `production`

### **Deployment Patterns**
- Rolling updates
- Blue-green deployments (for major releases)
- Canary deployments (using Istio)
- Automatic rollback on health check failures

## 📊 Monitoring & Observability

### **Metrics** (Prometheus)
- Application metrics (request rate, latency, errors)
- ML inference metrics (prediction time, model accuracy)
- Kubernetes metrics (pod health, resource usage)
- Custom business metrics

### **Dashboards** (Grafana)
- Application performance
- Infrastructure health
- ML model performance
- User analytics
- Cost monitoring

### **Alerts**
- High error rates
- Service downtime
- Resource exhaustion
- Certificate expiration
- Anomalous traffic patterns

### **Logging** (Loki)
- Centralized log aggregation
- Structured logging
- Log retention policies
- Search and filtering

## 🌐 Cloudflare Integration

1. **DNS Management**
   - A record: `yourname.com` → Azure Load Balancer IP
   - CNAME: `www.yourname.com` → `yourname.com`
   - CNAME: `api.yourname.com` → `yourname.com`

2. **CDN & Caching**
   - Static asset caching
   - Page rules for optimization
   - Minification

3. **Security**
   - DDoS protection
   - WAF rules
   - SSL/TLS encryption (Full Strict)
   - Bot protection

4. **Performance**
   - Auto minify (JS, CSS, HTML)
   - Brotli compression
   - HTTP/3 support

## 🧠 ML Model Integration

### **Depression Detection Models** (Free Options)

1. **HuggingFace Inference API** (Free tier)
   - Model: `mrm8488/distilroberta-base-finetuned-sentiment-mental-health`
   - Or: `mental/mental-bert-base-uncased`
   
2. **Local Inference** (On VM GPU)
   - Download model from HuggingFace
   - Run with Transformers library
   - Use GPU acceleration

3. **API Alternatives**
   - Perspective API (Google) - toxicity detection
   - Combine multiple models for better accuracy

### **Real-time Detection Flow**
```
User Types → Chrome Extension → WebSocket → Backend API → 
ML Model Inference → Response (Safe/Warning) → UI Update
```

## 🔄 CI/CD Pipeline Details

### **Frontend Pipeline**
```yaml
Trigger: Push to main/develop
├── Checkout code
├── Setup Node.js
├── Install dependencies
├── Lint (ESLint)
├── Format check (Prettier)
├── Unit tests (Jest)
├── Build production bundle
├── Security scan (npm audit)
├── Build Docker image
├── Scan image (Trivy)
├── Push to GHCR
├── Update Helm values
└── Trigger ArgoCD sync
```

### **Backend Pipeline**
```yaml
Trigger: Push to main/develop
├── Checkout code
├── Setup Python
├── Install dependencies
├── Lint (Ruff)
├── Format check (Black)
├── Type check (mypy)
├── Unit tests (pytest)
├── Coverage report
├── Security scan (Bandit, Safety)
├── Build Docker image
├── Scan image (Trivy)
├── Push to GHCR
├── Update Helm values
└── Trigger ArgoCD sync
```

### **Security Scanning Pipeline**
```yaml
Schedule: Daily
├── Container vulnerability scan (Trivy)
├── Dependency scan (Snyk)
├── SAST (SonarCloud)
├── Secret scanning (Gitleaks)
├── License compliance
└── Generate security report
```

## 📱 Chrome Extension Features

1. **Real-time Text Analysis**
   - Monitor text inputs on social media sites
   - Debounced API calls
   - Local caching

2. **User Intervention**
   - Warning modal for concerning content
   - Positive affirmations
   - Resource links (crisis hotlines, mental health resources)
   - Optional joke/meme to lighten mood

3. **Privacy**
   - No data storage
   - Opt-in analytics
   - Clear privacy policy

4. **Supported Platforms**
   - Twitter/X
   - Facebook
   - Reddit
   - LinkedIn
   - Generic text areas

## 🎓 Learning Resources & AI Usage

This project is designed to teach you:
- Kubernetes orchestration
- Helm chart development
- CI/CD pipeline design
- Security best practices
- Monitoring and observability
- GitOps methodology
- Container optimization
- ML model deployment

## 📈 Success Metrics

- **Uptime**: >99.9% (monitored by Azure Monitor)
- **Response Time**: <200ms (p95)
- **ML Inference**: <500ms
- **Security Score**: A+ on SSL Labs
- **Lighthouse Score**: >90
- **Test Coverage**: >80%
- **Infrastructure Cost**: <$100/month (within Azure credit)

## 🔮 Future Enhancements

- Multi-language support
- Mobile app (React Native)
- Advanced ML models (fine-tuned)
- User accounts and history (Azure AD B2C)
- Analytics dashboard (Azure Application Insights)
- A/B testing framework
- Cost optimization with Azure Cost Management
- Multi-region deployment
- Azure Front Door for global CDN
