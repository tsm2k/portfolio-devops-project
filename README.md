# DevOps Portfolio Project 🚀

> A production-grade DevOps portfolio showcasing Kubernetes, CI/CD, ML deployment, and security best practices.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-K3s-326CE5?logo=kubernetes)](https://k3s.io/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions)](https://github.com/features/actions)
[![GitOps](https://img.shields.io/badge/GitOps-ArgoCD-EF7B4D?logo=argo)](https://argo-cd.readthedocs.io/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project is a comprehensive DevOps portfolio that demonstrates:

1. **Modern Web Development**: React-based portfolio website with a real-world ML application
2. **Cloud-Native Architecture**: Kubernetes deployment with Helm charts and GitOps
3. **Complete CI/CD Pipeline**: Automated testing, building, security scanning, and deployment
4. **Production Monitoring**: Full observability stack with Prometheus, Grafana, and Loki
5. **Security Best Practices**: Container scanning, secret management, network policies
6. **ML Deployment**: Real-time depression detection using HuggingFace transformers

### **The Application**

**Portfolio Website** + **Depression Detection Service** + **Chrome Extension**

The core feature is a mental health awareness tool that:
- Analyzes text in real-time for signs of depression or distress
- Provides supportive interventions and resources
- Works as a web demo and Chrome extension
- Demonstrates ML model deployment in production

---

## ✨ Features

### **🌐 Portfolio Website**
- Modern, responsive design with React + TailwindCSS
- Dark mode support
- Project showcase with live demos
- Contact form
- Optimized for performance (Lighthouse score >90)

### **🧠 Depression Detection Service**
- Real-time text analysis using ML
- HuggingFace transformer models
- GPU-accelerated inference
- Redis caching for performance
- RESTful API with OpenAPI documentation

### **🔌 Chrome Extension**
- Monitors social media text inputs
- Real-time analysis as user types
- Gentle interventions for concerning content
- Privacy-focused (no data storage)
- Works on Twitter, Facebook, Reddit, etc.

### **☸️ Kubernetes Infrastructure**
- K3s lightweight Kubernetes
- Helm charts for deployment
- Horizontal Pod Autoscaling
- Network policies for security
- Resource quotas and limits

### **🚀 CI/CD Pipeline**
- GitHub Actions workflows
- Automated testing (unit, integration, E2E)
- Security scanning (Trivy, Snyk, SAST)
- Container image building and pushing
- GitOps deployment with ArgoCD
- Automated rollbacks

### **📊 Monitoring & Observability**
- Prometheus for metrics
- Grafana dashboards
- Loki for log aggregation
- AlertManager for notifications
- Custom application metrics
- ML model performance tracking

### **🔐 Security**
- Container vulnerability scanning
- Dependency scanning
- Secret scanning (Gitleaks)
- Sealed Secrets for K8s
- Network policies
- Pod Security Standards
- HTTPS everywhere (Let's Encrypt)
- Cloudflare WAF and DDoS protection

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare (DNS/CDN/WAF)                      │
│                         yourdomain.com                           │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Fabric Research VM                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              K3s Kubernetes Cluster                        │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │           Application Namespace                       │ │  │
│  │  │                                                        │ │  │
│  │  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  │ │  │
│  │  │  │ Portfolio  │  │  Detection   │  │   Redis     │  │ │  │
│  │  │  │  Frontend  │◄─┤   Backend    │◄─┤   Cache     │  │ │  │
│  │  │  │  (React)   │  │  (FastAPI)   │  │             │  │ │  │
│  │  │  └────────────┘  └──────┬───────┘  └─────────────┘  │ │  │
│  │  │                          │                            │ │  │
│  │  │                          ▼                            │ │  │
│  │  │                  ┌──────────────┐                     │ │  │
│  │  │                  │ HuggingFace  │                     │ │  │
│  │  │                  │  ML Model    │                     │ │  │
│  │  │                  │   (GPU)      │                     │ │  │
│  │  │                  └──────────────┘                     │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │         Monitoring Stack (Prometheus/Grafana)         │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              GitOps (ArgoCD)                          │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         ▲
                         │ Git Push
                         │
                  ┌──────┴──────┐
                  │   GitHub    │
                  │  Repository │
                  └─────────────┘
```

---

## 🛠️ Tech Stack

### **Infrastructure**
- **Cloud Provider**: Microsoft Azure (Student $100 credit)
- **Kubernetes**: Azure Kubernetes Service (AKS)
- **IaC**: Terraform
- **Container Registry**: Azure Container Registry (ACR)
- **Package Manager**: Helm 3
- **GitOps**: ArgoCD
- **DNS/CDN**: Cloudflare (paid domain)
- **SSL**: Let's Encrypt via cert-manager
- **Secrets**: Azure Key Vault + External Secrets Operator

### **Application**
- **Frontend**: React 18, Vite, TailwindCSS, shadcn/ui
- **Backend**: FastAPI, Python 3.11, Uvicorn
- **ML**: HuggingFace Transformers, PyTorch
- **Cache**: Redis
- **Extension**: Chrome Manifest V3

### **CI/CD**
- **CI**: GitHub Actions
- **CD**: ArgoCD (GitOps) + Azure DevOps Pipelines
- **IaC**: Terraform with Azure DevOps
- **Registry**: Azure Container Registry (ACR)
- **Testing**: pytest, Jest, Playwright
- **Security**: Trivy, Snyk, Azure Defender, Gitleaks, SonarCloud

### **Monitoring**
- **Metrics**: Prometheus
- **Visualization**: Grafana
- **Logging**: Loki + Promtail
- **Alerting**: AlertManager

### **Development**
- **IDE**: VS Code / Cursor / Windsurf
- **AI Assistants**: GitHub Copilot, ChatGPT, Claude
- **Version Control**: Git + GitHub

---

## 🚀 Quick Start

### **Prerequisites**
- Azure account with student credit ($100)
- Domain registered on Cloudflare (paid)
- GitHub account
- Azure DevOps account (free)
- Local machine with Docker installed

### **Get Started**

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio-devops-project.git
cd portfolio-devops-project

# Follow the quick start guide
cat QUICK_START.md
```

**Detailed Setup**: See [QUICK_START.md](./QUICK_START.md)

**Full Implementation**: See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)

---

## 📁 Project Structure

```
portfolio-devops-project/
├── apps/
│   ├── portfolio-frontend/      # React portfolio website
│   ├── detection-backend/       # FastAPI ML service
│   └── chrome-extension/        # Browser extension
│
├── infrastructure/
│   ├── kubernetes/              # K8s manifests
│   ├── helm/                    # Helm charts
│   ├── argocd/                  # ArgoCD applications
│   └── terraform/               # Infrastructure as Code
│
├── .github/
│   └── workflows/               # CI/CD pipelines
│
├── scripts/                     # Automation scripts
├── docs/                        # Documentation
├── tests/                       # Test suites
│
├── PROJECT_ARCHITECTURE.md      # System architecture
├── IMPLEMENTATION_ROADMAP.md    # Step-by-step guide
├── AI_DEVELOPMENT_GUIDE.md      # AI-assisted development
├── TOOLS_AND_RESOURCES.md       # Tool references
├── QUICK_START.md               # Quick setup guide
└── README.md                    # This file
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | Complete system architecture and design |
| [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) | Step-by-step implementation guide (10 phases) |
| [AI_DEVELOPMENT_GUIDE.md](./AI_DEVELOPMENT_GUIDE.md) | How to use AI agents effectively |
| [TOOLS_AND_RESOURCES.md](./TOOLS_AND_RESOURCES.md) | Complete tool stack and resources |
| [QUICK_START.md](./QUICK_START.md) | Get started in 30 minutes |

---

## 📸 Screenshots

> Screenshots will be added as the project is built

- Portfolio Homepage
- Depression Detection Demo
- Grafana Dashboards
- ArgoCD UI
- Chrome Extension

---

## 🗺️ Roadmap

### **Phase 1: Foundation** ✅
- [x] Project planning and architecture
- [x] Documentation structure
- [ ] Azure account setup
- [ ] Terraform infrastructure provisioning
- [ ] AKS cluster deployment
- [ ] Core infrastructure setup

### **Phase 2: Application Development** 🚧
- [ ] Backend API development
- [ ] Frontend website development
- [ ] Chrome extension development
- [ ] Local testing

### **Phase 3: Containerization** 📋
- [ ] Dockerfile creation
- [ ] Docker Compose for local dev
- [ ] Kubernetes manifests
- [ ] Helm charts

### **Phase 4: CI/CD** 📋
- [ ] GitHub Actions workflows
- [ ] ArgoCD setup
- [ ] Automated testing
- [ ] Security scanning

### **Phase 5: Monitoring** 📋
- [ ] Prometheus installation
- [ ] Grafana dashboards
- [ ] Loki logging
- [ ] AlertManager configuration

### **Phase 6: Security** 📋
- [ ] Security scanning integration
- [ ] Secret management
- [ ] Network policies
- [ ] Pod security standards

### **Phase 7: Production Deployment** 📋
- [ ] DNS configuration
- [ ] SSL certificates
- [ ] Production deployment
- [ ] Load testing

### **Phase 8: Polish & Launch** 📋
- [ ] Performance optimization
- [ ] Documentation completion
- [ ] Chrome extension publishing
- [ ] Portfolio launch

---

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Fabric Research Testbed** for providing infrastructure
- **HuggingFace** for ML models and inference API
- **Cloudflare** for DNS and CDN services
- **CNCF** for Kubernetes and cloud-native tools
- **Open Source Community** for amazing tools and libraries

---

## 📞 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter)

**Project Link**: [https://github.com/YOUR_USERNAME/portfolio-devops-project](https://github.com/YOUR_USERNAME/portfolio-devops-project)

**Portfolio**: [https://yourdomain.com](https://yourdomain.com)

---

## 🎓 Learning Outcomes

By building this project, you will learn:

- ✅ Kubernetes orchestration and management
- ✅ Helm chart development
- ✅ CI/CD pipeline design
- ✅ GitOps methodology with ArgoCD
- ✅ Container optimization and security
- ✅ Monitoring and observability
- ✅ ML model deployment
- ✅ Security best practices
- ✅ Infrastructure as Code
- ✅ DevOps tooling and automation

---

## 💡 Why This Project?

This project demonstrates:

1. **Real-World Skills**: Production-grade DevOps practices
2. **Full Stack**: From frontend to infrastructure
3. **Modern Tools**: Latest cloud-native technologies
4. **Best Practices**: Security, monitoring, testing
5. **Social Impact**: Mental health awareness tool
6. **Portfolio Piece**: Impressive showcase for employers

---

## 🚀 Get Started

Ready to build? Start with [QUICK_START.md](./QUICK_START.md)!

**Estimated Timeline**: 4-6 weeks (part-time)

**Difficulty**: Intermediate to Advanced

**Cost**: ~$95/month (within $100 Azure student credit)

---

<div align="center">

**Built with ❤️ using DevOps best practices**

⭐ Star this repo if you find it helpful!

</div>
