---
name: 03-Urban-Systems-Lab
title: Urban Systems Lab
role: Data-Visualization Lead
date: 2016 - 2019
excerpt: Data-Visualization projects and big geospatial data processing pipelines.
hero: case-studies/urban-systems-lab/cover.jpg
---

Urban Systems Lab addresses the social, ecological, and technical systems (SETS) that drive persistent challenges in cities. The work on Data Visualization & Design includes the NYC Portal, the UREx Portal, and science communication.

## UREx Platform
Urban Resilience to Extremes Sustainability Research Network.
[urex.urbansystemslab.com](http://urex.urbansystemslab.com)

I worked at Urban Systems Lab as a technical lead for Data Visualization projects. Furthermore, I led initiatives for processing large [GIS](https://www.esri.com/en-us/what-is-gis/overview) datasets to be seamlessly streamed to the visualization portal.

> ## "As part of the UREx project, USL is producing 3D visualizations that examine the equity implications of urban vulnerability."

These interactive maps of nine cities integrate social, ecological, and technological data from a variety of sources. The map for New York City has played an important role in our collaboration with the Mayor's Office of Recovery & Resiliency and the Science and Resilience Institute at Jamaica Bay to reduce the city's vulnerability to flooding. USL Fellows are conducting similar work in nine US and Latin American cities included on the platform.

<image-responsive imageURL='case-studies/urban-systems-lab/img-1.png' class='pad-v'/>

The platform has been leveraged by the UREx research network to communicate climate vulnerability and equity science for 10 US and Latin-American cities. It is also being utilized for an on-going project to study storm-water assessment and management, again generating crucial insights for city universities and institutions, including the Mayor's Office of NYC.

I led the development of 3D visualizations, combining multiple sources of social, ecological, and technical infrastructure data. It was the first time it was done at parcel scale resolution to examine equity in risk and vulnerability to climate-driven extreme events such as coastal flooding and heatwaves.

<div class='embed-container pad-v'><iframe src='https://player.vimeo.com/video/394526665' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>

## Platform Requirements
User applications created as a part of academic research tend to have precarious lifespans as opposed to commercial software, where the code is maintained frequently with support from business funding. However, the challenge for research-driven applications is to create software with limited budgets and timeframe that can survive the test of longevity.

When I assessed the requirements for visualizing several datasets, it was clear from the get-go that we need visualization platform, where the stakeholders can manage the information without writing a single line of code. It was also clear that native operating system apps have an onboarding burden of discovery, download, and installation. It just made sense to develop a browser-based app instead, so discovering and sharing is as simple as knowing the [URL](http://urex.urbansystemslab.com).


## Visualization Stack
I developed a front-end application in [Vue.js](https://vuejs.org/), using Nuxt. Firebase acts as the datastore, authentication gateway and file storage. Two way data binding of Firebase Realtime Database, let’s content creators update the visualization in real-time and preview the changes.

To fulfill mapping requirements, we vetted Mapbox-GL as the most suitable open-source library. The quality of documentation and strong developer support meant the app would have better support potential in the future. Support for 3D building extrusions, vector tiles from external sources, studio to create custom styles was crucial to design compelling visualizations.

<image-responsive imageURL='case-studies/urban-systems-lab/img-2.jpg' class='pad-v'/>

## Sharing Perspectives
User feedback quickly highlighted the expectations for an intuitive and straightforward share functionality. Users needed to be able to share their perspective of a geographical area under study. 

I implemented a share feature with a link shortener. Now users can make use of short links and screen captures to embed in their reports and other communications. It also encourages their audience to visit back the portal and explore the visualization with their viewpoint.

<image-responsive imageURL='case-studies/urban-systems-lab/share.png' class='pad-v'/>

## Geospatial Narratives
Let the data speak for itself. However, when the data is a vast trove of layers that are as big as the city, you need to be able to guide the users to where to look. While it was clear how to visualize quantitative data geospatially, the visualizations demanded an expert's opinion on a vast canvas. 

I designed and developed the support for creating qualitative narratives. So the story creators could do create articles and choreograph map views to match the content. We created several story template styles to pick from, so the authors could choose an appropriate format depending on the information being conveyed - from cards to articles.

<image-responsive imageURL='case-studies/urban-systems-lab/story-layouts.jpg' class='pad-v'/>

## Spatial Join Pipeline
At the heart of these visualizations is the spatial join algorithm that takes the parcel scale dis-aggregated data and drapes it over cityscapes. 

Spatial join can be a rather computationally intensive process, especially if the datasets are quite large. A naive single-core process can take up to several hours, if not days. The means to successfully implement a fast spatial join on CPU is to be able to distribute the processing load across multiple threads.

<image-responsive imageURL='case-studies/urban-systems-lab/spatial-join-2.jpg' class='pad-v'/>

One of the datasets has building features (inner layer). We safely assume that the buildings are always inside a building-lot (outer layer). The script split both of the datasets in tiles for batch processing. Each tile contains multiple lot features, and within each lot, there are numerous building features.

I wrote a multi-threaded script in Javascript that joins two spatially indexed GeoJSON collections stored in MongoDB. Also, the data gets processed in batches on each thread, which significantly improved the performance. It is a polygon-in-polygon type of join that can conveniently handle processing millions of features.

The process ran on 856,000 Lots and 1,095,161 Buildings in 17 minutes on Intel Core i7-5700HQ CPU @ 2.60GHz, 4 Cores, 8 Logical Processors.

## Raster to Vector Pipeline
There are chiefly two kinds of maps that can be rendered by a web browser - raster and vector. Each refers to the sort of tile data used to store the map information. A tile server serves those tiles to the client's web browser. 

Vector data can maintain original resolution while allowing for efficient encoding of topology, allowing one to conduct operations like proximity and network analysis. Besides, we needed to convert raster files into vector format to support interactions with map features. For example, clicking and selecting multiple features on the map, filtering them based on a property, changing map style on the fly, or supporting any visualization logic on front-end is way easier to manage with vector tiles.

<image-responsive imageURL='case-studies/urban-systems-lab/img-3.jpg' class='pad-v'/>

I developed a multi-threaded CPU pipeline in Python, which could ingest a large GeoTIFF file and provide output in GeoJSON format. Then we can conveniently convert that into MBTiles to be served to a client browser. It is a robust compute-intensive process that accounts for adequate interpolation of the data. It can be tweaked by the developer to conform to high-quality cartographic standards. 


| File            | Type   | Size    |
|-----------------|--------|---------|
| Original Tiff   | Raster | 8.20 GB |
| Raster Tileset  | Raster | 508 MB  |
| 2-meter Tileset | Vector | 500 MB  |
| 5-meter Tileset | Vector | 150 MB  |
 
<div class='embed-container pad-v'><iframe src='https://player.vimeo.com/video/404058830' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>

## Cookbook
I also wrote a cookbook in partnership with fellow USL researchers to share the principle ingredients of GIS visualizations. I continue to contribute some of my time to improve the quality of documentation, and occasionally tweak some code. I'm happy about the work went into developing the portal and supporting data pipelines. It is great to see it continuously evolve as more lab researchers get involved with science communication.

<image-responsive imageURL='case-studies/urban-systems-lab/cookbook.jpg' class='pad-v'/>

## Presented at:
- Data-Visualization Workshop at Modelling Complex Urban Environments, Waterloo Institute for Complexity and Innovation, Canada, 2018
- URExSRN Annual All Hands Meeting, demonstrated visualization platform, Phoenix Arizona, 2018
- Urban Climate Resilience at Ecological Society of America, 2018
- Data-Visualization Seminar at "Resilient Cities, Livable Futures" Data-Visualization Session, The New School, New York, 2017.
