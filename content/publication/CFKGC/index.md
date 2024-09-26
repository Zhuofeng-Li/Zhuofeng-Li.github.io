---
title: "Learning from Novel Knowledge: Continual Few-shot Knowledge Graph Completion"
authors:
- admin
- Haoxiang Zhang*
- Qiannan Zhang
- Ziyi Kou
- Shichao Pei
author_notes:
- "Equal contribution"
- "Equal contribution"
date: "2024-01-15T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2024-08-15T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["paper-conference"]

# Publication name and optional abbreviated publication name.
publication: "*Accepted by 2024 CIKM Full Research Paper Track*"
publication_short: "*Accepted by 2024 CIKM Full Research Paper Track*"

abstract: "Knowledge graph (KG) completion has been increasingly recognized as a vital approach for uncovering missing knowledge and
addressing the incompleteness issue in KGs. To enhance inference
on rare relations and mitigate the impact of the long-tail distribution, the dominant strategy designs few-shot models following
the meta-learning paradigm. However, these approaches typically
operate under the assumption that KGs are available instantly, disregarding the newly emerging relations during KG enrichment.
Thus, the emergence of these novel relations presents a need for
few-shot models to continually learn from emerging knowledge.
Although promising, two significant obstacles, i.e., catastrophic
forgetting and the scarcity of novel relations, prevent effective learning from newly emerging relations. In this paper, we propose a
novel framework designed to equip the few-shot model with the
ability to learn sequentially from novel relations. **Specifically, we
introduce innovative strategies at both data and model levels: datalevel rehearsal and model-level modulation to address catastrophic
forgetting, alongside multi-view relation augmentation aimed at
resolving the issue of insufficient novel relations.** Extensive experiments conducted on real-world KGs validate the effectiveness of
our proposed method."

# Summary. An optional shortened abstract.
summary: "In this paper, we propose a novel framework designed to equip the few-shot model with the
ability to learn sequentially from novel relations."

tags:
- LLM and Graphs
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: ''
url_code: 'https://github.com/cfkgc-paper/CFKGC-paper'
url_dataset: 'https://github.com/cfkgc-paper/CFKGC-paper'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---

<!-- {{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}} -->

<!-- {{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}} -->

<!-- Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
