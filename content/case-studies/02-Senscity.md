---
name: 02-Senscity
title: Senscity
role: Co-founder/Full-Stack Developer
date: 2018 - 2020
excerpt: Monitoring real-time environmental conditions and the effectiveness of climate adaptation efforts for policy, future developments, and planning assessments.
hero: case-studies/senscity/cover.jpg
---

## 01. What is Senscity?
Senscity is a climate intelligence company for urban spaces. We help organizations monitor micro-climate variations and assess the impact on its infrastructure assets. It empowers stakeholders involved in urban planning to understand better how to design, adapt, and create appropriate interventions in urban areas. After all, cities are where 68% of the world population is estimated to live by 2050. ^[[UN](https://www.un.org/development/desa/en/news/population/2018-revision-of-world-urbanization-prospects.html): 68% of the world population projected to live in urban areas by 2050, says UN.]

> ## Senscity platform helps assess climate and environmental impacts and risks on buildings, precincts, and cities.

Senscity uses real-time sensor observations, and global weather and remote-sensing data to uncover insights that help monitor the performance of the infrastructure projects.

<image-responsive imageURL='case-studies/senscity/dashboard.jpg' class='pad-v' />


## 02. Motivation
During my work at Urban Systems Lab (USL) as a data engineer and visualization designer, I worked with a diverse group of experts with backgrounds in climate science, data visualization, government policies, and software engineering. I learned a lot about the impact of climate change in urban areas. One may unpack 'impact' into risk, exposure, and vulnerability as its components. In Urban zones, organizations operating in sectors like construction, insurance, government departments need to understand climate impact on their projects, both in the real-time and long run. These sectors lack a proper understanding of the weather impact on their investments for real-time operational intelligence.

> ## If you can't measure it, you can't manage it.

Real-time analytics helps businesses monitor compliance with environmental regulations and optimize their operations. At the same time, long term insights are vital to understanding the impact on their infrastructure assets - buildings, green roofs, parks, etc. 

With Senscity, we wanted to build an enterprise-grade platform to help people and organizations take actionable decisions informed by weather impact. It includes ingesting massive data from remote-sensing and sensors deployed at scale, high-speed analytics, and dashboard visualizations.

## 03. Product Development

### Dashboard & use case
Senscity Dashboard provides real-time environmental conditions monitoring capability along with insights about the effectiveness of climate adaptation efforts for policy, future developments, and planning assessments.

<image-responsive imageURL='case-studies/senscity/overview.jpg' class='pad-v'/>

### Seed Round
In 2018, Senscity secured seed funding from Arcadis City of 2030 Accelerator at Techstars, Amsterdam. During a blazing fast three month accelerator, following items materialized out of it: 

- Laid out a three-year outline for product and service roadmap.
- Developed functional prototypes for the client-dashboard. Iterated through concepts based on feedback from industry partners.
- Installed sensors on sites. Developed scalable ETL pipelines on top of it.
- Set up micro-service architecture using Kubernetes on AWS.

> ## Senstack is made for a multitude of purposes to work with flexible sensor configurations. Analytics engine for advanced data insights, and an API to create your system workflows.

### Micro-service orchestration
Having experience working with Docker and Kubernetes, I always lean towards practicing infrastructure as code. For monitoring stack, I implemented Prometheus-operator, Grafana, and Alertmanager services for micro-services health. Elasticsearch and Elastalerts for logging and debugging. Kong for API management.

### ETL Pipelines
The fundamental thing with real-time data is that it does not stop flowing in. Or, more accurately put, generally, the receiver cannot control the aspects of data streamed by the source. At Senscity, I manage scalable ETL pipelines with Apache Spark that receive input from sensors and a variety of external temporal and geospatial data sets. I like to use S3 as an affordable data lake for conducting analytics and including machine learning forecasting. MongoDB maintains a copy of data for serving it via restful APIs.

### Collaborative Data Science
We leverage JupyterHub for collaboratively analyzing data fetched from our data lake. With a few adjustments, I've set up a JupyterHub instance to be able to launch spark jobs with custom infrastructure configurations on the Kubernetes clusters itself. It provides data-scientists the flexibility to tailor the cloud compute resources to handle experiments with small to enormous datasets.

### Front end development
Javascript forms an incredible part of our client-facing front-end visualizations. We use Vue.js, Mapbox, and miscellaneous charting libraries for the dashboard. Firebase backs it for storing and handling user-specific configurations. I like developing with Vue.js for it's traditional and straightforward MVC architecture, which I find as a comfortable choice for creating large scale applications.

### Insights
I have automated various analysis jobs to understand trends, detect outliers in real-time, and monitor sensor network health. Using these insights, clients can also create reports to share their knowledge with their peers. Clients can also subscribe to notifications and alerts when environmental factors exceed compliance thresholds.

<image-responsive imageURL='case-studies/senscity/sensor.jpg' caption='Sensor installed on Vice Media Rooftop, NYC' class='pad-v'/>

2020 is looking good with a roadmap full of feature roll-outs, research and development, and new business prospects.

We've ushered into an age we monitor our health 24x7 with fitness trackers. Simply put, data beaming from sensors reveals all sorts of insights that we might not have considered earlier. It's time we do the same for our urban environment. If you can't measure it, you can't manage it.
