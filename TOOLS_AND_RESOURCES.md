# DevOps Tools & Resources Guide

## 🛠️ Complete Tool Stack

This document lists all tools, services, and resources you'll use in this project, organized by category.

---

## 🏗️ Infrastructure & Orchestration

### **Kubernetes Distribution**
- **K3s** (Lightweight Kubernetes)
  - Website: https://k3s.io/
  - Docs: https://docs.k3s.io/
  - Why: Perfect for single-node, low resource usage, includes Traefik
  - Installation: `curl -sfL https://get.k3s.io | sh -`

### **Kubernetes Management**
- **kubectl** (CLI tool)
  - Docs: https://kubernetes.io/docs/reference/kubectl/
  - Install: https://kubernetes.io/docs/tasks/tools/
  
- **k9s** (Terminal UI)
  - GitHub: https://github.com/derailed/k9s
  - Why: Best way to manage K8s clusters interactively
  - Install: `brew install k9s` or download binary

- **Helm** (Package Manager)
  - Website: https://helm.sh/
  - Docs: https://helm.sh/docs/
  - Why: Templating and package management for K8s
  - Install: `curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`

- **Lens** (Desktop GUI - Optional)
  - Website: https://k8slens.dev/
  - Why: Visual cluster management
  - Free tier available

---

## 🚀 CI/CD & GitOps

### **GitHub Actions**
- **Free tier**: 2,000 minutes/month for private repos
- Docs: https://docs.github.com/en/actions
- Marketplace: https://github.com/marketplace?type=actions

### **ArgoCD** (GitOps)
- Website: https://argo-cd.readthedocs.io/
- Why: Declarative GitOps continuous delivery
- Install: `kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`

### **Flux** (Alternative to ArgoCD)
- Website: https://fluxcd.io/
- Why: Lightweight GitOps operator
- Use if: You prefer a more Kubernetes-native approach

---

## 📦 Container & Registry

### **Docker**
- Website: https://www.docker.com/
- Docs: https://docs.docker.com/
- Install: https://docs.docker.com/get-docker/

### **GitHub Container Registry (GHCR)**
- **Free**: Unlimited public images
- Docs: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
- URL format: `ghcr.io/username/image:tag`

### **Docker Compose** (Local Development)
- Docs: https://docs.docker.com/compose/
- Why: Multi-container local development

---

## 🔐 Security & Secrets

### **Trivy** (Vulnerability Scanner)
- GitHub: https://github.com/aquasecurity/trivy
- Why: Comprehensive vulnerability scanner for containers, IaC, etc.
- Install: `brew install trivy`
- Usage: `trivy image myimage:latest`

### **Snyk** (Dependency Scanner)
- Website: https://snyk.io/
- Free tier: Available
- Why: Excellent dependency vulnerability detection
- GitHub Action: https://github.com/snyk/actions

### **Gitleaks** (Secret Scanner)
- GitHub: https://github.com/gitleaks/gitleaks
- Why: Detect hardcoded secrets in code
- Install: `brew install gitleaks`
- Pre-commit hook: Available

### **Sealed Secrets** (Kubernetes Secrets)
- GitHub: https://github.com/bitnami-labs/sealed-secrets
- Why: Encrypt secrets for Git storage
- Install: `kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml`

### **External Secrets Operator** (Alternative)
- Website: https://external-secrets.io/
- Why: Sync secrets from external sources
- Use if: You want to use cloud secret managers

### **SonarCloud** (SAST)
- Website: https://sonarcloud.io/
- Free for: Open source projects
- Why: Code quality and security analysis
- GitHub Action: Available

### **OWASP ZAP** (DAST - Optional)
- Website: https://www.zaproxy.org/
- Why: Dynamic application security testing
- Docker: `docker run -t owasp/zap2docker-stable`

---

## 📊 Monitoring & Observability

### **Prometheus** (Metrics)
- Website: https://prometheus.io/
- Docs: https://prometheus.io/docs/
- Why: Industry standard for metrics
- Install: Via kube-prometheus-stack Helm chart

### **Grafana** (Dashboards)
- Website: https://grafana.com/
- Docs: https://grafana.com/docs/
- Why: Best visualization platform
- Free tier: Cloud or self-hosted
- Dashboards: https://grafana.com/grafana/dashboards/

### **kube-prometheus-stack** (All-in-one)
- GitHub: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
- Includes: Prometheus, Grafana, AlertManager, exporters
- Install: `helm install monitoring prometheus-community/kube-prometheus-stack`

### **Loki** (Logging)
- Website: https://grafana.com/oss/loki/
- Why: Like Prometheus but for logs
- Install: Via Loki-stack Helm chart

### **Promtail** (Log Collector)
- Comes with Loki stack
- Why: Collects logs and sends to Loki

### **AlertManager** (Alerting)
- Comes with kube-prometheus-stack
- Docs: https://prometheus.io/docs/alerting/latest/alertmanager/
- Why: Alert routing and management

### **Jaeger** (Tracing - Optional)
- Website: https://www.jaegertracing.io/
- Why: Distributed tracing
- Use if: You want full observability stack

---

## 🌐 Networking & DNS

### **Cloudflare** (DNS/CDN)
- Website: https://www.cloudflare.com/
- Free tier: Yes (generous)
- Features: DNS, CDN, DDoS protection, WAF, SSL
- API Docs: https://developers.cloudflare.com/api/

### **cert-manager** (SSL Certificates)
- Website: https://cert-manager.io/
- Why: Automatic Let's Encrypt certificates
- Install: `kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml`

### **Let's Encrypt** (Free SSL)
- Website: https://letsencrypt.org/
- Why: Free, automated SSL certificates
- Rate limits: https://letsencrypt.org/docs/rate-limits/

### **Traefik** (Ingress Controller)
- Website: https://traefik.io/
- Comes with K3s
- Docs: https://doc.traefik.io/traefik/

### **Nginx Ingress** (Alternative)
- GitHub: https://github.com/kubernetes/ingress-nginx
- Why: More features, widely used
- Install: `helm install nginx-ingress ingress-nginx/ingress-nginx`

### **MetalLB** (Load Balancer)
- Website: https://metallb.universe.tf/
- Why: Load balancer for bare metal K8s
- Install: https://metallb.universe.tf/installation/

---

## 🤖 Machine Learning

### **HuggingFace** (ML Models)
- Website: https://huggingface.co/
- Free tier: Yes (inference API)
- Models Hub: https://huggingface.co/models
- Transformers: https://huggingface.co/docs/transformers/

**Recommended Models for Depression Detection**:
- `mrm8488/distilroberta-base-finetuned-sentiment-mental-health`
- `mental/mental-bert-base-uncased`
- `distilbert-base-uncased-finetuned-sst-2-english` (sentiment)

### **PyTorch** (ML Framework)
- Website: https://pytorch.org/
- Why: Required for HuggingFace transformers
- Install: `pip install torch`

### **CUDA** (GPU Support)
- Nvidia CUDA Toolkit
- Why: GPU acceleration for ML inference
- Docs: https://developer.nvidia.com/cuda-toolkit

---

## 💻 Development Tools

### **IDEs**
- **VS Code** (Free)
  - Website: https://code.visualstudio.com/
  - Extensions:
    - Kubernetes
    - Docker
    - YAML
    - Python
    - ESLint
    - Prettier
    - GitLens
    - Remote SSH

- **Cursor** (AI-powered IDE)
  - Website: https://cursor.sh/
  - Why: Built-in AI assistance
  - Cost: $20/mo

- **Windsurf** (AI-powered IDE)
  - Why: Advanced AI coding assistant
  - Good for: Complex project setup

### **AI Coding Assistants**
- **GitHub Copilot**
  - Cost: $10/mo (free for students)
  - Integration: VS Code, JetBrains
  - Website: https://github.com/features/copilot

- **Codeium** (Free alternative)
  - Website: https://codeium.com/
  - Free tier: Yes
  - Integration: VS Code, JetBrains

- **ChatGPT Plus**
  - Cost: $20/mo
  - Why: Architecture, debugging, learning
  - Website: https://chat.openai.com/

- **Claude Pro**
  - Cost: $20/mo
  - Why: Long context, complex reasoning
  - Website: https://claude.ai/

### **Terminal Tools**
- **iTerm2** (macOS)
  - Website: https://iterm2.com/
  
- **Oh My Zsh**
  - Website: https://ohmyz.sh/
  - Why: Better shell experience

- **tmux** (Terminal multiplexer)
  - Why: Multiple terminal sessions
  - Install: `brew install tmux`

---

## 🧪 Testing Tools

### **Backend Testing**
- **pytest** (Python)
  - Website: https://pytest.org/
  - Why: Best Python testing framework
  - Install: `pip install pytest pytest-cov pytest-asyncio`

- **pytest-cov** (Coverage)
  - Why: Code coverage reports
  - Usage: `pytest --cov=app tests/`

- **TestContainers** (Integration testing)
  - Website: https://testcontainers.com/
  - Why: Real dependencies in tests
  - Install: `pip install testcontainers`

### **Frontend Testing**
- **Jest** (Unit testing)
  - Website: https://jestjs.io/
  - Why: Standard React testing framework
  - Comes with: Create React App, Vite

- **React Testing Library**
  - Website: https://testing-library.com/react
  - Why: Test React components
  - Install: `npm install @testing-library/react`

- **Playwright** (E2E testing)
  - Website: https://playwright.dev/
  - Why: Modern, fast E2E testing
  - Install: `npm install @playwright/test`

### **Load Testing**
- **k6** (Load testing)
  - Website: https://k6.io/
  - Why: Modern load testing tool
  - Install: `brew install k6`
  - Cloud: https://k6.io/cloud/ (free tier)

- **Locust** (Alternative)
  - Website: https://locust.io/
  - Why: Python-based, easy to script
  - Install: `pip install locust`

### **API Testing**
- **Postman** (Manual testing)
  - Website: https://www.postman.com/
  - Free tier: Yes
  - Why: API development and testing

- **Insomnia** (Alternative)
  - Website: https://insomnia.rest/
  - Why: Lightweight, open source

---

## 🎨 Frontend Development

### **React Ecosystem**
- **Vite** (Build tool)
  - Website: https://vitejs.dev/
  - Why: Fast, modern build tool
  - Create: `npm create vite@latest`

- **TailwindCSS** (Styling)
  - Website: https://tailwindcss.com/
  - Why: Utility-first CSS framework
  - Docs: https://tailwindcss.com/docs

- **shadcn/ui** (Components)
  - Website: https://ui.shadcn.com/
  - Why: Beautiful, accessible components
  - Install: `npx shadcn-ui@latest init`

- **React Router** (Routing)
  - Website: https://reactrouter.com/
  - Install: `npm install react-router-dom`

- **Axios** (HTTP client)
  - Website: https://axios-http.com/
  - Install: `npm install axios`

- **Zustand** (State management - Optional)
  - GitHub: https://github.com/pmndrs/zustand
  - Why: Lightweight alternative to Redux
  - Install: `npm install zustand`

### **Code Quality**
- **ESLint** (Linting)
  - Website: https://eslint.org/
  - Install: `npm install eslint`

- **Prettier** (Formatting)
  - Website: https://prettier.io/
  - Install: `npm install prettier`

- **Husky** (Git hooks)
  - Website: https://typicode.github.io/husky/
  - Why: Run linting/tests before commit
  - Install: `npm install husky`

---

## 🐍 Backend Development

### **FastAPI Ecosystem**
- **FastAPI** (Framework)
  - Website: https://fastapi.tiangolo.com/
  - Why: Modern, fast, automatic API docs
  - Install: `pip install fastapi`

- **Uvicorn** (ASGI server)
  - Website: https://www.uvicorn.org/
  - Install: `pip install uvicorn[standard]`

- **Pydantic** (Validation)
  - Website: https://docs.pydantic.dev/
  - Why: Data validation and settings
  - Comes with FastAPI

- **SQLAlchemy** (ORM - Optional)
  - Website: https://www.sqlalchemy.org/
  - Install: `pip install sqlalchemy`

- **Redis** (Caching)
  - Website: https://redis.io/
  - Python client: `pip install redis`
  - Docker: `docker run -d -p 6379:6379 redis:alpine`

### **Code Quality**
- **Ruff** (Linting)
  - GitHub: https://github.com/astral-sh/ruff
  - Why: Fast Python linter
  - Install: `pip install ruff`

- **Black** (Formatting)
  - Website: https://black.readthedocs.io/
  - Install: `pip install black`

- **mypy** (Type checking)
  - Website: https://mypy.readthedocs.io/
  - Install: `pip install mypy`

- **Bandit** (Security linting)
  - GitHub: https://github.com/PyCQA/bandit
  - Install: `pip install bandit`

---

## 🔧 Utility Tools

### **Version Control**
- **Git**
  - Website: https://git-scm.com/
  - GUI: GitKraken, SourceTree, GitHub Desktop

- **pre-commit** (Git hooks)
  - Website: https://pre-commit.com/
  - Why: Run checks before commit
  - Install: `pip install pre-commit`

### **Documentation**
- **MkDocs** (Documentation site)
  - Website: https://www.mkdocs.org/
  - Theme: Material for MkDocs
  - Install: `pip install mkdocs mkdocs-material`

- **Swagger/OpenAPI**
  - Comes with FastAPI
  - URL: http://localhost:8000/docs

### **Performance**
- **Lighthouse** (Web performance)
  - Chrome DevTools
  - CLI: `npm install -g lighthouse`
  - CI: https://github.com/GoogleChrome/lighthouse-ci

- **WebPageTest** (Performance testing)
  - Website: https://www.webpagetest.org/
  - Free tier: Yes

---

## 📚 Learning Resources

### **Kubernetes**
- Official Docs: https://kubernetes.io/docs/
- Kubernetes By Example: https://kubernetesbyexample.com/
- KodeKloud: https://kodekloud.com/ (paid courses)
- CKAD Prep: https://github.com/dgkanatsios/CKAD-exercises

### **DevOps**
- DevOps Roadmap: https://roadmap.sh/devops
- The Phoenix Project (Book)
- The DevOps Handbook (Book)

### **CI/CD**
- GitHub Actions Docs: https://docs.github.com/en/actions
- ArgoCD Tutorial: https://argo-cd.readthedocs.io/en/stable/getting_started/

### **Monitoring**
- Prometheus Best Practices: https://prometheus.io/docs/practices/
- Grafana Tutorials: https://grafana.com/tutorials/

### **Security**
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Kubernetes Security: https://kubernetes.io/docs/concepts/security/

### **YouTube Channels**
- TechWorld with Nana
- DevOps Toolkit
- That DevOps Guy
- NetworkChuck
- Fireship

### **Blogs**
- dev.to
- Medium (DevOps tags)
- Kubernetes Blog: https://kubernetes.io/blog/

---

## 💰 Cost Breakdown (All Free!)

| Service | Free Tier | What You Get |
|---------|-----------|--------------|
| **Fabric VM** | Research allocation | Full VM with GPU |
| **GitHub** | Free | Unlimited repos, Actions (2000 min/mo) |
| **GHCR** | Free | Unlimited public images |
| **Cloudflare** | Free | DNS, CDN, DDoS, SSL |
| **Let's Encrypt** | Free | SSL certificates |
| **HuggingFace** | Free | Inference API (limited) |
| **SonarCloud** | Free | Open source projects |
| **Snyk** | Free | Limited scans |
| **Codecov** | Free | Open source projects |

**Total Monthly Cost: $0** 🎉

---

## 🔗 Quick Links

### **Documentation**
- [Project Architecture](./PROJECT_ARCHITECTURE.md)
- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)
- [AI Development Guide](./AI_DEVELOPMENT_GUIDE.md)

### **Official Docs**
- [Kubernetes](https://kubernetes.io/docs/)
- [Helm](https://helm.sh/docs/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)

### **Community**
- [r/devops](https://reddit.com/r/devops)
- [r/kubernetes](https://reddit.com/r/kubernetes)
- [CNCF Slack](https://slack.cncf.io/)
- [Kubernetes Slack](https://slack.k8s.io/)

---

## 📥 Installation Script

Quick setup script for common tools:

```bash
#!/bin/bash
# Install common DevOps tools (macOS)

# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# CLI Tools
brew install kubectl helm k9s docker docker-compose git

# Security Tools
brew install trivy gitleaks

# Monitoring
brew install k6

# Node.js
brew install node@20

# Python
brew install python@3.11

# Optional
brew install tmux htop jq yq

echo "✅ Installation complete!"
```

---

This tools guide provides everything you need to build a production-grade DevOps portfolio project. All tools listed have free tiers or are completely free and open source.
