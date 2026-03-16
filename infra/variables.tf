variable "prefix" {
  description = "A prefix for all resource names"
  type        = string
  default     = "complidemo"
}

variable "location" {
  description = "Azure Region"
  type        = string
  default     = "eastus"
}
