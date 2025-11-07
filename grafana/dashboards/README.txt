### Grafana Dashboards
This directory contains **Grafana dashboard JSON files** used for **automatic provisioning** when the Grafana container starts.

## Purpose

Grafana automatically loads any dashboard JSON files placed in this folder during container startup.  
This setup allows you to **version-control**, **reuse**, and **auto-deploy dashboards** as part of your DevOps monitoring platform.

## Folder Structure

grafana/
├── dashboards/
│ ├── sample-dashboard.json
│ └── (add more dashboards here)
└── provisioning/
├── dashboards/
└── datasources/

yaml

## How It Works

On container startup:

1. Grafana scans `/var/lib/grafana/dashboards` for JSON files (mapped from this folder).
2. It also loads configuration from `/etc/grafana/provisioning` (linked via Docker volume).
3. Any valid dashboard JSON file containing a `"title"` is automatically imported.

Dashboards use **Prometheus** as the default data source, configured in:

grafana/provisioning/datasources/datasource.yaml

yaml

## Default Login Credentials

Grafana web interface:  
**http://localhost:3000**

| Field | Default Value |
|--------|----------------|
| Username | `admin` |
| Password | `admin` |

>  After your first login, Grafana will prompt you to set a new password for security.

You can override these defaults by editing your `docker-compose.yml`:

```yaml
grafana:
  image: grafana/grafana:latest
  environment:
    - GF_SECURITY_ADMIN_USER=admin
    - GF_SECURITY_ADMIN_PASSWORD=admin
  ports:
    - "3000:3000"
  volumes:
    - ./grafana/dashboards:/var/lib/grafana/dashboards
    - ./grafana/provisioning:/etc/grafana/provisioning
## Adding a New Dashboard
In the Grafana UI:
Go to Dashboard Settings → JSON Model → Copy JSON.

## Save the JSON file inside:
grafana/dashboards/
For example:
grafana/dashboards/cpu-metrics.json

## Restart Grafana:
docker restart devops-monitoring-platform-grafana-1
Grafana will automatically import the new dashboard at startup.

## Import Example Dashboards (Optional)
You can also import prebuilt dashboards directly from Grafana Labs:

Open Grafana → Dashboards → Import

Enter one of these dashboard IDs:

Dashboard Name	ID	Description
Node Exporter Full	1860	Linux server metrics (CPU, memory, disk, etc.)
Prometheus 2.0 Overview	3662	Overview of Prometheus metrics and performance

Click Load, select your Prometheus data source, and click Import.

## Troubleshooting
Error:

**php**
Dashboard title cannot be empty
Fix:
Ensure your JSON file includes a valid title, for example:

**json**

{
  "dashboard": {
    "title": "My Dashboard",
    ...
  }
}
## Related Files
File	Description
grafana/provisioning/datasources/datasource.yaml	Defines the Prometheus data source
grafana/provisioning/dashboards/dashboard.yaml	Links dashboards directory for auto-import
grafana/dashboards/sample-dashboard.json	Example system metrics dashboard

## Result:
All dashboards in this folder are auto-loaded with Prometheus as the data source whenever Grafana starts — ensuring a repeatable and consistent monitoring setup for all environments.

## Maintainer:
Hesbon Angwenyi
Project: DevOps Monitoring Platform