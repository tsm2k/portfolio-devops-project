output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "vm_name" {
  description = "Name of the VM"
  value       = azurerm_linux_virtual_machine.main.name
}

output "vm_id" {
  description = "ID of the VM"
  value       = azurerm_linux_virtual_machine.main.id
}

output "ssh_private_key" {
  description = "SSH private key to connect to VM"
  value       = tls_private_key.ssh.private_key_pem
  sensitive   = true
}

output "ssh_command" {
  description = "SSH command to connect to VM"
  value       = "ssh -i vm_ssh_key azureuser@${azurerm_public_ip.main.ip_address}"
}

output "acr_name" {
  description = "Name of the Azure Container Registry"
  value       = azurerm_container_registry.main.name
}

output "acr_login_server" {
  description = "Login server for ACR"
  value       = azurerm_container_registry.main.login_server
}

output "acr_admin_username" {
  description = "Admin username for ACR"
  value       = azurerm_container_registry.main.admin_username
  sensitive   = true
}

output "acr_admin_password" {
  description = "Admin password for ACR"
  value       = azurerm_container_registry.main.admin_password
  sensitive   = true
}


output "public_ip_address" {
  description = "Public IP address for the load balancer"
  value       = azurerm_public_ip.main.ip_address
}

output "vnet_id" {
  description = "ID of the virtual network"
  value       = azurerm_virtual_network.main.id
}

