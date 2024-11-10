---
title: "Link Prediction on Textual Edge Graphs"
authors:
- Chen Ling∗
- admin∗
- Yuntong Hu
- Zheng Zhang
- Zhongyuan Liu
- Shuang Zheng
- Jian Pei
- Liang Zhao


author_notes:
- "Equal contribution"
- "Equal contribution"
date: "2024-06-16T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2024-06-16T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["paper-conference"]

# Publication name and optional abbreviated publication name.
publication: "*In a submission to 2024 ICLR*"
publication_short: "*In a submission to 2024 ICLR*"

abstract: "Textual-edge Graphs (TEGs), characterized by rich text annotations on edges,
are increasingly significant in network science due to their ability to capture rich
contextual information among entities. Existing works have proposed various
edge-aware graph neural networks (GNNs) or let language models directly make
predictions. However, they often fall short of fully capturing the contextualized
semantics on edges and graph topology, respectively. This inadequacy is particularly evident in link prediction tasks that require a comprehensive understanding
of graph topology and semantics between nodes. In this paper, we present a novel
framework - LINK2DOC, designed especially for link prediction on textual-edge
graphs. Specifically, we propose to summarize neighborhood information between
node pairs as a human-written document to preserve both semantic and topology
information. A self-supervised learning model is then utilized to enhance GNN’s
text-understanding ability from language models. Empirical evaluations, including
link prediction, edge classification, parameter analysis, runtime comparison, and
ablation studies, on four real-world datasets demonstrate that LINK2DOC achieves
generally better performance against existing edge-aware GNNs and pre-trained
language models in predicting links on TEGs."

# Summary. An optional shortened abstract.
summary: "In this paper, we present a novel
framework - LINK2DOC, designed especially for link prediction on textual-edge
graphs."

tags:
- LLM and Graphs
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: 'https://arxiv.org/abs/2405.16606'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/jdD8gXaTZsc)'
#   focal_point: ""
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
# projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: ""
---

<!-- {{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}} -->

<!-- {{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}} -->

<!-- Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
