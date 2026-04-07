# Terraform Infrastructure Guide

## 🏗️ Azure Infrastructure as Code

This guide covers the complete Terraform setup for provisioning Azure resources for the DevOps portfolio project.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Azure Resources](#azure-resources)
- [Terraform Structure](#terraform-structure)
- [Setup Instructions](#setup-instructions)
- [Cost Optimization](#cost-optimization)
- [Best Practices](#best-practices)

---

## 🎯 Overview

We use Terraform to provision and manage all Azure infrastructure:
- **Azure Kubernetes Service (AKS)** - Managed Kubernetes cluster
- **Azure Container Registry (ACR)** - Private container registry
- **Azure Cache for Redis** - Managed Redis instance
- **Azure Key Vault** - Secrets management
- **Azure Monitor** - Logging and monitoring
- **Networking** - VNet, Subnets, NSGs, Load Balancer

**Benefits:**
- Infrastructure as Code (version controlled)
- Reproducible environments
- Easy disaster recovery
- Cost tracking and optimization
- Automated provisioning

---

## 💰 Azure Resources & Estimated Costs

### **Resource Breakdown (within $100 credit)**

| Resource | SKU/Size | Monthly Cost | Purpose |
|----------|----------|--------------|---------|
| **AKS Cluster** | 2x Standard_B2s nodes | ~$30 | Kubernetes cluster |
| **AKS GPU Node** | 1x Standard_NC4as_T4_v3 | ~$40 | ML inference (spot instance) |
| **Azure Container Registry** | Basic | $5 | Container images |
| **Azure Cache for Redis** | Basic C0 (250MB) | $16 | Caching layer |
| **Azure Key Vault** | Standard | $0.03/10k ops | Secrets storage |
| **Azure Monitor** | Pay-as-you-go | ~$5 | Logs & metrics |
| **Public IP** | Static | $3 | Load balancer IP |
| **Bandwidth** | Outbound | ~$5 | Data transfer |
| **Total** | | **~$95/month** | Within budget! |

### **Cost Optimization Strategies**

1. **Use Spot Instances for GPU** - Save 60-80% on GPU nodes
2. **Auto-scaling** - Scale down during off-hours
3. **Reserved Instances** - Not applicable for student credit
4. **Right-sizing** - Start small, scale as needed
5. **Resource Tagging** - Track costs per component
6. **Azure Cost Management** - Set up budget alerts

---

## 📁 Terraform Structure

```
infrastructure/terraform/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   └── production/
│       ├── main.tf
│       ├── terraform.tfvars
│       └── backend.tf
│
├── modules/
│   ├── aks/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── versions.tf
│   ├── acr/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── redis/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── keyvault/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── monitoring/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
├── scripts/
│   ├── init.sh
│   ├── plan.sh
│   ├── apply.sh
│   └── destroy.sh
│
├── .terraform.lock.hcl
├── terraform.tfvars.example
└── README.md
```

---

## 🚀 Complete Terraform Configuration

### **Root Module (environments/production/main.tf)**

```hcl
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.45"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateportfolio"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Local variables
locals {
  environment = "production"
  project     = "portfolio"
  location    = var.location
  
  common_tags = {
    Environment = local.environment
    Project     = local.project
    ManagedBy   = "Terraform"
    Owner       = var.owner_email
  }
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "rg-${local.project}-${local.environment}"
  location = local.location
  tags     = local.common_tags
}

# Networking Module
module "networking" {
  source = "../../modules/networking"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  tags                = local.common_tags
}

# Azure Container Registry
module "acr" {
  source = "../../modules/acr"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  tags                = local.common_tags
}

# Azure Kubernetes Service
module "aks" {
  source = "../../modules/aks"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  vnet_subnet_id      = module.networking.aks_subnet_id
  
  # Node pools
  default_node_pool = {
    name       = "system"
    node_count = 2
    vm_size    = "Standard_B2s"
  }
  
  gpu_node_pool = {
    name       = "gpu"
    node_count = 1
    vm_size    = "Standard_NC4as_T4_v3"
    priority   = "Spot"  # Use spot instances for cost savings
    eviction_policy = "Delete"
    spot_max_price  = -1  # Pay up to regular price
  }
  
  tags = local.common_tags
  
  depends_on = [module.networking]
}

# Azure Cache for Redis
module "redis" {
  source = "../../modules/redis"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  subnet_id           = module.networking.redis_subnet_id
  
  sku_name  = "Basic"
  family    = "C"
  capacity  = 0  # 250MB
  
  tags = local.common_tags
  
  depends_on = [module.networking]
}

# Azure Key Vault
module "keyvault" {
  source = "../../modules/keyvault"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  
  aks_principal_id = module.aks.kubelet_identity_object_id
  
  tags = local.common_tags
  
  depends_on = [module.aks]
}

# Azure Monitor
module "monitoring" {
  source = "../../modules/monitoring"
  
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  environment         = local.environment
  project             = local.project
  
  aks_cluster_id = module.aks.cluster_id
  
  tags = local.common_tags
  
  depends_on = [module.aks]
}

# Grant AKS access to ACR
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                     = module.aks.kubelet_identity_object_id
  role_definition_name             = "AcrPull"
  scope                            = module.acr.registry_id
  skip_service_principal_aad_check = true
}

# Outputs
output "aks_cluster_name" {
  value = module.aks.cluster_name
}

output "aks_kubeconfig" {
  value     = module.aks.kube_config_raw
  sensitive = true
}

output "acr_login_server" {
  value = module.acr.login_server
}

output "redis_hostname" {
  value = module.redis.hostname
}

output "keyvault_uri" {
  value = module.keyvault.vault_uri
}

output "public_ip" {
  value = module.networking.public_ip_address
}
```

### **Variables (environments/production/terraform.tfvars)**

```hcl
# Azure Configuration
location    = "East US"
owner_email = "your-email@example.com"

# Project Configuration
project_name = "portfolio"
environment  = "production"

# AKS Configuration
kubernetes_version = "1.28"

# Cost Optimization
enable_auto_scaling = true
min_node_count      = 1
max_node_count      = 3

# Monitoring
enable_monitoring = true
log_retention_days = 30
```

---

## 🔧 Terraform Modules

### **AKS Module (modules/aks/main.tf)**

```hcl
resource "azurerm_kubernetes_cluster" "main" {
  name                = "aks-${var.project}-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = "${var.project}-${var.environment}"
  kubernetes_version  = var.kubernetes_version
  
  default_node_pool {
    name                = var.default_node_pool.name
    node_count          = var.default_node_pool.node_count
    vm_size             = var.default_node_pool.vm_size
    vnet_subnet_id      = var.vnet_subnet_id
    enable_auto_scaling = true
    min_count           = 1
    max_count           = 3
    
    upgrade_settings {
      max_surge = "10%"
    }
  }
  
  identity {
    type = "SystemAssigned"
  }
  
  network_profile {
    network_plugin    = "azure"
    network_policy    = "azure"
    load_balancer_sku = "standard"
    service_cidr      = "10.0.0.0/16"
    dns_service_ip    = "10.0.0.10"
  }
  
  azure_policy_enabled = true
  
  oms_agent {
    log_analytics_workspace_id = var.log_analytics_workspace_id
  }
  
  key_vault_secrets_provider {
    secret_rotation_enabled = true
  }
  
  tags = var.tags
}

# GPU Node Pool (Spot Instance)
resource "azurerm_kubernetes_cluster_node_pool" "gpu" {
  name                  = var.gpu_node_pool.name
  kubernetes_cluster_id = azurerm_kubernetes_cluster.main.id
  vm_size               = var.gpu_node_pool.vm_size
  node_count            = var.gpu_node_pool.node_count
  
  priority        = var.gpu_node_pool.priority
  eviction_policy = var.gpu_node_pool.eviction_policy
  spot_max_price  = var.gpu_node_pool.spot_max_price
  
  node_labels = {
    "workload" = "gpu"
    "priority" = "spot"
  }
  
  node_taints = [
    "gpu=true:NoSchedule"
  ]
  
  tags = var.tags
}

output "cluster_id" {
  value = azurerm_kubernetes_cluster.main.id
}

output "cluster_name" {
  value = azurerm_kubernetes_cluster.main.name
}

output "kube_config_raw" {
  value     = azurerm_kubernetes_cluster.main.kube_config_raw
  sensitive = true
}

output "kubelet_identity_object_id" {
  value = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
}
```

### **ACR Module (modules/acr/main.tf)**

```hcl
resource "azurerm_container_registry" "main" {
  name                = "acr${var.project}${var.environment}"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Basic"
  admin_enabled       = false
  
  georeplications = []
  
  tags = var.tags
}

# Enable vulnerability scanning
resource "azurerm_container_registry_task" "scan" {
  name                  = "vulnerability-scan"
  container_registry_id = azurerm_container_registry.main.id
  
  platform {
    os = "Linux"
  }
  
  docker_step {
    dockerfile_path      = "Dockerfile"
    context_path         = "https://github.com/YOUR_USERNAME/portfolio-devops-project.git"
    context_access_token = var.github_token
    image_names          = ["{{.Run.Registry}}/app:{{.Run.ID}}"]
  }
  
  trigger {
    source_trigger {
      name           = "defaultSourceTriggerName"
      events         = ["commit"]
      repository_url = "https://github.com/YOUR_USERNAME/portfolio-devops-project.git"
      source_type    = "Github"
      
      authentication {
        token      = var.github_token
        token_type = "PAT"
      }
    }
  }
}

output "registry_id" {
  value = azurerm_container_registry.main.id
}

output "login_server" {
  value = azurerm_container_registry.main.login_server
}
```

### **Redis Module (modules/redis/main.tf)**

```hcl
resource "azurerm_redis_cache" "main" {
  name                = "redis-${var.project}-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  capacity            = var.capacity
  family              = var.family
  sku_name            = var.sku_name
  
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"
  
  redis_configuration {
    enable_authentication = true
  }
  
  tags = var.tags
}

output "hostname" {
  value = azurerm_redis_cache.main.hostname
}

output "primary_access_key" {
  value     = azurerm_redis_cache.main.primary_access_key
  sensitive = true
}
```

### **Key Vault Module (modules/keyvault/main.tf)**

```hcl
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main" {
  name                       = "kv-${var.project}-${var.environment}"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 7
  purge_protection_enabled   = false
  
  enable_rbac_authorization = true
  
  network_acls {
    default_action = "Allow"
    bypass         = "AzureServices"
  }
  
  tags = var.tags
}

# Grant AKS access to Key Vault
resource "azurerm_role_assignment" "aks_keyvault" {
  scope                = azurerm_key_vault.main.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = var.aks_principal_id
}

output "vault_uri" {
  value = azurerm_key_vault.main.vault_uri
}

output "vault_id" {
  value = azurerm_key_vault.main.id
}
```

---

## 📝 Setup Instructions

### **1. Prerequisites**

```bash
# Install Terraform
brew install terraform

# Install Azure CLI
brew install azure-cli

# Login to Azure
az login

# Set subscription (if you have multiple)
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# Verify
az account show
```

### **2. Initialize Terraform Backend**

```bash
# Create resource group for Terraform state
az group create --name tfstate-rg --location eastus

# Create storage account
az storage account create \
  --name tfstateportfolio \
  --resource-group tfstate-rg \
  --location eastus \
  --sku Standard_LRS

# Create container
az storage container create \
  --name tfstate \
  --account-name tfstateportfolio
```

### **3. Configure Terraform**

```bash
# Navigate to environment
cd infrastructure/terraform/environments/production

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit variables
vim terraform.tfvars
# Update: location, owner_email, etc.

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive
```

### **4. Plan and Apply**

```bash
# Create execution plan
terraform plan -out=tfplan

# Review the plan
# Check resources to be created
# Verify estimated costs

# Apply the plan
terraform apply tfplan

# Save outputs
terraform output -json > outputs.json
```

### **5. Configure kubectl**

```bash
# Get AKS credentials
az aks get-credentials \
  --resource-group rg-portfolio-production \
  --name aks-portfolio-production

# Verify connection
kubectl get nodes

# Check GPU node
kubectl get nodes -l workload=gpu
```

---

## 🔒 Security Best Practices

### **1. State File Security**

```hcl
# backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateportfolio"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
    
    # Enable encryption
    use_azuread_auth = true
  }
}
```

### **2. Secrets Management**

```bash
# Never commit secrets to Git
echo "*.tfvars" >> .gitignore
echo "*.tfstate" >> .gitignore
echo ".terraform/" >> .gitignore

# Use Azure Key Vault for secrets
# Use environment variables for sensitive data
export TF_VAR_github_token="your-token"
```

### **3. Access Control**

```hcl
# Use Azure RBAC
resource "azurerm_role_assignment" "example" {
  scope                = azurerm_resource_group.main.id
  role_definition_name = "Contributor"
  principal_id         = var.user_object_id
}
```

---

## 💡 AI Agent Prompts

### **Generate Terraform Module**

```
Create a Terraform module for Azure Kubernetes Service with:
- System node pool (2x Standard_B2s)
- GPU node pool (1x NC4as_T4_v3 spot instance)
- Azure CNI networking
- Azure Policy enabled
- Integration with Azure Monitor
- RBAC enabled
- Key Vault secrets provider

Include:
- main.tf with all resources
- variables.tf with descriptions
- outputs.tf with useful outputs
- versions.tf with provider constraints

Follow Terraform best practices and Azure naming conventions.
```

### **Cost Optimization Review**

```
Review this Terraform configuration and suggest cost optimizations:
[paste your terraform code]

Focus on:
- Right-sizing resources
- Using spot instances where appropriate
- Enabling auto-scaling
- Reducing data transfer costs
- Using cheaper SKUs for non-production
```

---

## 📊 Cost Monitoring

### **Set Up Budget Alerts**

```bash
# Create budget
az consumption budget create \
  --budget-name portfolio-monthly-budget \
  --amount 100 \
  --time-grain Monthly \
  --start-date 2024-01-01 \
  --end-date 2024-12-31 \
  --resource-group rg-portfolio-production

# Set up alert at 80%
az consumption budget create-notification \
  --budget-name portfolio-monthly-budget \
  --notification-key alert80 \
  --notification-threshold 80 \
  --contact-emails your-email@example.com
```

### **Track Costs with Tags**

```hcl
locals {
  common_tags = {
    Environment = "production"
    Project     = "portfolio"
    CostCenter  = "DevOps"
    ManagedBy   = "Terraform"
  }
}
```

---

## 🔄 CI/CD Integration

### **Azure DevOps Pipeline**

```yaml
# azure-pipelines-terraform.yml
trigger:
  branches:
    include:
      - main
  paths:
    include:
      - infrastructure/terraform/**

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: terraform-vars

stages:
  - stage: Validate
    jobs:
      - job: TerraformValidate
        steps:
          - task: TerraformInstaller@0
            inputs:
              terraformVersion: '1.5.0'
          
          - task: TerraformTaskV4@4
            inputs:
              command: 'init'
              workingDirectory: '$(System.DefaultWorkingDirectory)/infrastructure/terraform/environments/production'
              backendServiceArm: 'Azure-ServiceConnection'
              backendAzureRmResourceGroupName: 'tfstate-rg'
              backendAzureRmStorageAccountName: 'tfstateportfolio'
              backendAzureRmContainerName: 'tfstate'
              backendAzureRmKey: 'production.terraform.tfstate'
          
          - task: TerraformTaskV4@4
            inputs:
              command: 'validate'
              workingDirectory: '$(System.DefaultWorkingDirectory)/infrastructure/terraform/environments/production'
  
  - stage: Plan
    dependsOn: Validate
    jobs:
      - job: TerraformPlan
        steps:
          - task: TerraformTaskV4@4
            inputs:
              command: 'plan'
              workingDirectory: '$(System.DefaultWorkingDirectory)/infrastructure/terraform/environments/production'
              environmentServiceNameAzureRM: 'Azure-ServiceConnection'
  
  - stage: Apply
    dependsOn: Plan
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: TerraformApply
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: TerraformTaskV4@4
                  inputs:
                    command: 'apply'
                    workingDirectory: '$(System.DefaultWorkingDirectory)/infrastructure/terraform/environments/production'
                    environmentServiceNameAzureRM: 'Azure-ServiceConnection'
```

---

## 🆘 Troubleshooting

### **Common Issues**

**1. Quota Exceeded**
```bash
# Check quotas
az vm list-usage --location eastus -o table

# Request quota increase
az support tickets create ...
```

**2. State Lock**
```bash
# Force unlock (use carefully)
terraform force-unlock LOCK_ID
```

**3. Resource Already Exists**
```bash
# Import existing resource
terraform import azurerm_resource_group.main /subscriptions/.../resourceGroups/...
```

---

This Terraform setup provides a production-ready, cost-optimized Azure infrastructure for your DevOps portfolio project!
