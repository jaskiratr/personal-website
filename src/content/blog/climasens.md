---
title: "ClimaSens: What Wearing Every Hat Actually Taught Me"
description: Co-founding a climate intelligence platform, building the full stack, falling in love with maps, and learning when to stop engineering and start shipping.
date: 2018-06-01
tags: [climate-tech, startup, full-stack, geospatial, product-management]
draft: false
---

*Role: Co-founder / Full-Stack Developer · 2018–2023*

ClimaSens is a climate intelligence platform for urban spaces. We helped organizations monitor micro-climate variations and assess the impact on their operations, from heat risk on buildings to disaster resilience across entire cities.

<div class='embed-container'><iframe src='https://player.vimeo.com/video/781898140' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>

## Building everything from scratch

At ClimaSens I built across the entire stack. The frontend was Nuxt.js, rendering dense geospatial visualisations (heatmaps, time-series overlays, interactive risk layers) on top of mapping libraries. The backend was a constellation of data pipelines ingesting real-time IoT sensor observations, historical climate records, and remote-sensing satellite data. Kubernetes orchestrated it all.

Getting my hands dirty with every layer gave me a visceral understanding of what good developer experience actually means. I learned why clean APIs matter, why observable systems save you at 2am, and why the gap between "it works on my machine" and "it works in production" is where most engineering effort actually lives. These weren't lessons I could have absorbed from a requirements doc. I had to feel the pain of a poorly indexed geospatial query or a flaky deployment pipeline to truly internalise them.

<div class='embed-container'><iframe src='https://player.vimeo.com/video/640894972' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>

## Falling in love with maps

Working with geospatial data changed how I see the world, quite literally. There is something deeply satisfying about transforming raw climate observations into a map layer that makes a pattern immediately obvious. A spreadsheet can tell you a suburb is getting hotter; a well-rendered heatmap makes you *feel* it.

My appreciation for geospatial data grew exponentially through ClimaSens. Every new data source (satellite imagery, weather station feeds, IoT sensor networks) was another lens on the same physical reality. Layering them together to surface insights about heat islands, flood risk corridors, or infrastructure vulnerability became genuinely addictive. I still carry that obsession with spatial data into everything I do.

## The "many hats" trap

Here's the part nobody puts on their LinkedIn: wearing every hat is sometimes over-glorified.

For a stretch, I was so deep in the engineering (optimising pipelines, debugging Kubernetes networking, refactoring the frontend component architecture) that I temporarily lost focus on my product sense. I was romanticising the technical problems instead of asking the harder question: *who is this actually for, and does it solve their problem today?*

I had to course correct. I stepped back from the codebase, talked to users, and forced myself to ship an MVP that was good enough rather than architecturally perfect.

## Landing it where it mattered

That MVP became the tool we built with [Humanitech](https://www.humanitech.org.au/resources/climasens/) and [Australian Red Cross](https://medium.com/humanitech-au/making-sense-of-a-changing-climate-7c7988e6e1e1). Together we co-developed a location-based mapping tool that combined climate data with social and health information to identify populations vulnerable to extreme heat events.

The pilot focused on South Australia's Telecross REDi program, which provides phone support to isolated people during heatwaves. Extreme heat causes more deaths in Australia than bushfires or cyclones. Our platform helped Red Cross teams pinpoint where vulnerable people were, so outreach could be targeted rather than blanket.

Seeing ClimaSens used in the field, by people who weren't thinking about Kubernetes or data pipelines but about which elderly residents needed a welfare call before a 45-degree day, was the most rewarding moment of the entire venture. It validated the product, but more importantly it reminded me why I'd started building it in the first place.

The course correction taught me something I carry into my work today: the best product thinking doesn't come from choosing between technical depth and user empathy. It comes from knowing when to switch between them.

See more at [climasens.com](https://climasens.com) · [Humanitech case study](https://www.humanitech.org.au/resources/climasens/) · [Medium write-up](https://medium.com/humanitech-au/making-sense-of-a-changing-climate-7c7988e6e1e1)
