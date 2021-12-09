terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {
  # CLOUDFLARE_EMAIL
  # CLOUDFLARE_API_TOKEN
  # CLOUDFLARE_ACCOUNT_ID
}

variable "zone_id" {
  # TF_VAR_zone_id
}

resource "cloudflare_worker_route" "doh-redirect-route" {
  zone_id = var.zone_id
  pattern = "https://dns.paesa.es/*"
  # script_name = cloudflare_worker_script.doh-redirect.name
}

resource "cloudflare_worker_script" "doh-redirect" {
  name    = "doh-redirect"
  content = file("../index.js")
}
