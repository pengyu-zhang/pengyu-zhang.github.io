## Experience

<div class="paper-box">{% include tile-figure.html image="timeroute.png" alt="TimeRoute" width=1600 height=908 eager=true %}
<div class="paper-box-text" markdown="1">

**TimeRoute** ``Under review``
{: .pb-title}

Time-aware multi-modal recommendation
{: .pb-tag}

Which modality matters for a purchase changes over time and differs from user to user, but most recommenders fuse text, images and audio with one global weighting. I route the modalities for each user based on their own interaction times, and use time-conditioned diffusion to filter out outdated edges. This beats the strongest baselines on three datasets. On one of them I gave the router noise instead of time, and its gain disappeared.

<div class="paper-links">{% include paper-links.html id="timeroute" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="time_imprint.png" alt="Time Imprint" width=1600 height=1094 %}
<div class="paper-box-text" markdown="1">

**Time Imprint** ``Under review``
{: .pb-title}

Time as a modality for look-alike entities
{: .pb-tag}

Some entities have almost the same text and images, like Napoleon Bonaparte and the 2023 film *Napoleon*, but their years are very different. I treat time as a modality of each entity: its own timestamps are pooled into one signal and used in the encoder, the scoring function and a contrastive objective. Link prediction improves most on the one percent of entities that are hardest to tell apart.

<div class="paper-links">{% include paper-links.html id="time_imprint" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="Select-Dont-Train.png" alt="Select, Don't Train" width=1600 height=898 %}
<div class="paper-box-text" markdown="1">

**Select, Don't Train** ``ISWC 2026``
{: .pb-title}

LLM-based entity disambiguation
{: .pb-tag}

Dual encoders force candidate retrieval and fine-grained selection into one embedding space, and need retraining whenever the knowledge base changes. With Fina Polat (lead), we split the two steps. A plain BM25 retriever finds the candidates, and an LLM picks one or says that none of them fits. Without training any retriever, this beats the best trained dual encoder on the ZELDA benchmark.

<div class="paper-links">{% include paper-links.html id="select_dont_train" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="fusion_training.png" alt="Fusion Training" width=1600 height=904 %}
<div class="paper-box-text" markdown="1">

**Fusion Training** ``ACL 2026 SRW``
{: .pb-title}

Hybrid-reasoning LLMs
{: .pb-tag}

Hybrid models like Qwen3 can answer quickly or think step by step with the same weights, but how the two kinds of training data should be mixed had not been studied systematically. With Congfeng Cao (lead), we varied the data ratio and the training schedule on Qwen3-4B with math problems, and released the benchmark as Fusion Bench. More short-answer data lowers the accuracy of long-form reasoning, and interleaving the two kinds of data is the most robust schedule.

<div class="paper-links">{% include paper-links.html id="fusion_training" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="beyond_images.png" alt="Beyond Images" width=1600 height=903 %}
<div class="paper-box-text" markdown="1">

**Beyond Images** ``ESWC 2026``
{: .pb-title}

Knowledge-graph data enrichment
{: .pb-tag}

Curated image sets leave out ambiguous pictures such as logos and symbols, because visual encoders turn them into noise. I collect all Wikipedia images of an entity, caption each one with a vision-language model and let an LLM fuse the captions into one text summary, so these pictures become useful evidence. Without any change to the models, link prediction improves on every dataset and model I tested, most on entities whose images are mainly logos or symbols.

<div class="paper-links">{% include paper-links.html id="beyond_images" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="graph_tempcz.png" alt="Graph-TempCZ" width=1184 height=328 %}
<div class="paper-box-text" markdown="1">

**Graph-TempCZ** ``LREC 2026``
{: .pb-title}

Large-scale temporal link prediction
{: .pb-tag}

Existing software-mention data has no graph structure and no time axis. With Congfeng Cao (lead), we turned mentions from 1.5 million biomedical papers into a publication-software graph and framed software usage as temporal link prediction. A GraphSAGE model does better than feature-based baselines, and its accuracy drops as the gap between the training year and the test year grows.

<div class="paper-links">{% include paper-links.html id="graph_tempcz" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="graph_learning_challenges.png" alt="Graph Learning Challenges" width=1600 height=1204 %}
<div class="paper-box-text" markdown="1">

**Graph Learning Challenges** ``ESWA 2026``
{: .pb-title}

LLMs for data challenges in graphs
{: .pb-tag}

Real graph data often has missing parts, is imbalanced, comes from different domains and keeps changing, and most existing methods handle one of these problems for one task. With Mengran Li (lead), we organised more than 380 papers around these four data challenges, first the traditional methods and then where large language models help, and keep the literature list open on GitHub. My part was the section on graphs that change over time, which is closest to my own work.

<div class="paper-links">{% include paper-links.html id="graph_learning_challenges" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="understanding_el.png" alt="Understanding Entity Linking" width=1600 height=900 %}
<div class="paper-box-text" markdown="1">

**Understanding Entity Linking** ``EKAW 2024``
{: .pb-title}

Entity linking for social media analysis
{: .pb-tag}

Network analysis of tweets depends on which entities a linker extracts, and for short, messy text there is no ground truth to choose a linker. With James Nevin (lead), we ran two established linkers at several thresholds over 21 million tweets, and the linking pipeline was my part. The two linkers agree on fewer than half of the entities, and the networks change in shape and even in their top entities. So we suggest reporting results across several linkers.

<div class="paper-links">{% include paper-links.html id="understanding_el" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="cycle.png" alt="CYCLE and TIGER" width=1600 height=573 %}
<div class="paper-box-text" markdown="1">

**CYCLE & TIGER** ``CIKM & ECAI 2024``
{: .pb-title}

Temporally robust entity linking
{: .pb-tag}

An entity linker is trained on one snapshot of the knowledge graph and then used for years while the graph keeps changing, so its accuracy decays. In TIGER I add graph structure, so entities can still be told apart when their descriptions drift. In CYCLE I use the changes as supervision: relations that appear or disappear between snapshots become contrastive examples. On the public yearly-snapshot benchmarks I built for them, both models beat the 2023 state of the art, and their lead is larger at a three-year gap than at one year.

<div class="paper-links">CYCLE: {% include paper-links.html id="cycle" %}<br>TIGER: {% include paper-links.html id="tiger" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="runcl.png" alt="RUNCL" width=1600 height=908 %}
<div class="paper-box-text" markdown="1">

**RUNCL** ``Physica A 2024``
{: .pb-title}

Graph structure learning for low-degree nodes
{: .pb-tag}

Node degrees follow a power law, so missing or wrong edges hurt the sparsely connected nodes most, but GNNs take the input graph as correct. I generate candidate neighbourhood graphs from node features, choose the most likely one with Bayesian inference over a stochastic block model, and let the feature view and the relationship view supervise each other through contrastive learning. On six benchmarks it is best in most settings with few labels, and on the low-degree nodes of Cora the gain grows as labels get scarcer.

<div class="paper-links">{% include paper-links.html id="runcl" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="mvma_gcn.png" alt="MVMA-GCN" width=1600 height=914 %}
<div class="paper-box-text" markdown="1">

**MVMA-GCN** ``EAAI 2023``
{: .pb-title}

Multi-view graph learning
{: .pb-tag}

Real networks have several kinds of links, such as co-author, co-keyword and co-conference, but most GNNs use one view at a time or give all views the same weight. I feed all views into the model together. Two attention layers decide how much each neighbour and each view counts, and an HSIC term keeps the views distinct from each other. On eight benchmarks it beats the strongest baseline in most settings.

<div class="paper-links">{% include paper-links.html id="mvma_gcn" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="Visual_Analysis.png" alt="Visual Analysis" width=1600 height=832 %}
<div class="paper-box-text" markdown="1">

**Visual Analysis** ``JCAD 2022``
{: .pb-title}

Interactive author name disambiguation
{: .pb-tag}

Research offices spend a lot of manual effort separating authors who share a name, which is common for Chinese names, and a classifier alone gives them no way to check its decisions. I paired a multi-view graph classifier with linked views of the collaboration network and the raw metadata, so users can still decide when the classifier is wrong. In a user study on 4,000 real university papers, students and experienced administrators completed the tasks reliably.

<div class="paper-links">{% include paper-links.html id="visual_analysis" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="dual_channel.png" alt="DualChannel" width=1601 height=723 %}
<div class="paper-box-text" markdown="1">

**DualChannel** ``Information 2021``
{: .pb-title}

Author name disambiguation at scale
{: .pb-tag}

When authors share a name, their publication records get mixed up. With Xin Zheng (lead), we combined the text of each paper (fastText) with a graph of co-authors, organisations and venues (meta-path embeddings), then clustered the papers with DBSCAN, so the number of authors does not have to be set in advance. On AMiner WhoIsWho, about 205,000 papers, it beats all the baselines we compared, with balanced precision and recall.

<div class="paper-links">{% include paper-links.html id="dual_channel" %}</div>
</div>
</div>

<div class="paper-box">{% include tile-figure.html image="research_overview.png" alt="Research Overview slides" width=1600 height=900 %}
<div class="paper-box-text" markdown="1">

**Research Overview** ``Slides``
{: .pb-title}

A ten-minute talk through my research
{: .pb-tag}

Similar entities are hard to tell apart, and it gets harder as the data changes. The deck first shows where models fail because of this. Then it goes through the signals I added to separate look-alike entities: time, the graph, how the graph changes and text descriptions of images. After that it covers recommendation and LLM pipelines, where the same idea is used again, and the questions that are still open.

<div class="paper-links"><a href="/pdf/Pengyu_Zhang_Research_Overview.pdf">Slides (PDF)</a></div>
</div>
</div>
