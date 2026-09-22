## Experience

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/timeroute.png"><img src="/images/timeroute.png" alt="TimeRoute" width="1600" height="908"></a></div>
<div class="paper-box-text" markdown="1">

**TimeRoute** ``Under review``
{: .pb-title}

Time-aware multi-modal recommendation
{: .pb-tag}

Which modality matters for a purchase changes over time and differs from user to user, but recommenders fuse text, images and audio with one global weighting. I route the modalities for each user based on their own interaction times, and use time-conditioned diffusion to filter out outdated edges. This beats the strongest baselines on three datasets, and the gain disappears when the router gets noise instead of time.

<div class="paper-links"><a href="https://arxiv.org/abs/2608.10983">arXiv</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/time_imprint.png"><img src="/images/time_imprint.png" alt="Time Imprint" width="1600" height="1094" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Time Imprint** ``Under review``
{: .pb-title}

Time as a modality for look-alike entities
{: .pb-tag}

Some entities have almost the same text and images, like Napoleon Bonaparte and the 2023 film *Napoleon*, but their years are very different. I treat time as a modality of each entity: its own timestamps are pooled into one signal and used in the encoder, the scoring function and a contrastive objective. It helps most on the one percent of entities that are hardest to tell apart.

<div class="paper-links"><a href="https://arxiv.org/abs/2607.09777">arXiv</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/Select-Dont-Train.png"><img src="/images/Select-Dont-Train.png" alt="Select, Don't Train" width="1600" height="898" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Select, Don't Train** ``ISWC 2026``
{: .pb-title}

LLM-based entity disambiguation
{: .pb-tag}

Dual-encoders force candidate retrieval and fine-grained selection into one embedding space, and need retraining whenever the knowledge base changes. With Fina Polat (lead), we split the two steps. A plain BM25 retriever finds the candidates, and an LLM picks one or says that none of them fits. Without training any retriever, this beats the best trained dual-encoder on the ZELDA benchmark.

<div class="paper-links"><a href="https://arxiv.org/abs/2608.27470">arXiv</a> <a href="https://github.com/FinaPolat/RAISED">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/fusion_training.png"><img src="/images/fusion_training.png" alt="Fusion Training" width="1600" height="904" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Fusion Training** ``ACL 2026 SRW``
{: .pb-title}

Hybrid-reasoning LLMs
{: .pb-tag}

Hybrid models like Qwen3 can answer quickly or think step by step with the same weights, but the two kinds of training data interfere with each other. With Congfeng Cao (lead), we tried seven data ratios and three training schedules on Qwen3-4B, and released the benchmark as Fusion Bench. More short-answer data lowers the accuracy of long-form reasoning, and interleaving the two kinds of data is the most robust schedule.

<div class="paper-links"><a href="/pdf/Fusion_Training.pdf">Paper</a> <a href="https://doi.org/10.18653/v1/2026.acl-srw.64">DOI</a> <a href="https://github.com/caocongfeng/Fusion-Bench">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/beyond_images.png"><img src="/images/beyond_images.png" alt="Beyond Images" width="1600" height="903" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Beyond Images** ``ESWC 2026``
{: .pb-title}

Knowledge-graph data enrichment
{: .pb-tag}

Curated image sets leave out ambiguous pictures such as logos and symbols, because visual encoders turn them into noise. I caption every image of an entity with a vision-language model and let an LLM fuse the captions into one text summary, so these pictures become useful evidence. Link prediction improves on every dataset and model I tested, most on entities whose images are mainly logos or symbols, and the models themselves stay unchanged.

<div class="paper-links"><a href="/pdf/Beyond_Images.pdf">Paper</a> <a href="https://doi.org/10.1007/978-3-032-25156-5_5">DOI</a> <a href="https://github.com/pengyu-zhang/Beyond-Images">Code</a> <a href="https://pengyu-zhang.github.io/Beyond-Images/">Demo</a> <a href="https://youtu.be/PHaukQic-N4">YouTube</a> <a href="https://www.bilibili.com/video/BV13445zLEp4">Bilibili</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/graph_tempcz.png"><img src="/images/graph_tempcz.png" alt="Graph-TempCZ" width="1184" height="328" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Graph-TempCZ** ``LREC 2026``
{: .pb-title}

Large-scale temporal link prediction
{: .pb-tag}

Existing software-mention data has no graph structure and no time axis. With Congfeng Cao (lead), we turned mentions from 1.5 million biomedical papers into a publication-software graph and framed software usage as temporal link prediction. A GraphSAGE model does better than feature-based baselines, and its accuracy drops as the gap between the training year and the test year grows.

<div class="paper-links"><a href="/pdf/Graph-TempCZ.pdf">Paper</a> <a href="https://doi.org/10.63317/2jopizgg4dzo">DOI</a> <a href="https://github.com/caocongfeng/Graph-TempCZ">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/graph_learning_challenges.png"><img src="/images/graph_learning_challenges.png" alt="Graph Learning Challenges" width="1600" height="1204" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Graph Learning Challenges** ``ESWA 2026``
{: .pb-title}

LLMs for data challenges in graphs
{: .pb-tag}

Real graph data often has missing parts, is imbalanced, comes from different domains and keeps changing, and most existing methods handle one of these problems for one task. With Mengran Li (lead), we organised more than 380 papers around these four data challenges, first the traditional methods and then where large language models help, and keep the literature list open on GitHub. My part was the section on graphs that change over time, which is closest to my own work.

<div class="paper-links"><a href="/pdf/Graph-Learning-Challenges.pdf">Paper</a> <a href="https://doi.org/10.1016/j.eswa.2025.129643">DOI</a> <a href="https://github.com/limengran98/Awesome-Literature-Graph-Learning-Challenges">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/understanding_el.png"><img src="/images/understanding_el.png" alt="Understanding Entity Linking" width="1600" height="900" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Understanding Entity Linking** ``EKAW 2024``
{: .pb-title}

Entity linking for social media analysis
{: .pb-tag}

Network analysis of tweets depends on which entities a linker extracts, and for short, messy text there is no ground truth to choose a linker. With James Nevin (lead), we ran two established linkers at several thresholds over 21 million tweets. They agree on only about 40% of the entities, and the networks change in shape and even in their top entities. So we suggest reporting results across several linkers.

<div class="paper-links"><a href="/pdf/Understanding_Entity_Linking.pdf">Paper</a> <a href="https://doi.org/10.1007/978-3-031-77792-9_5">DOI</a> <a href="https://github.com/jim-g-n/Tweet-Linked-Entity-Co-occurrence">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/cycle.png"><img src="/images/cycle.png" alt="CYCLE and TIGER" width="1600" height="573" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**CYCLE & TIGER** ``CIKM & ECAI 2024``
{: .pb-title}

Temporally robust entity linking
{: .pb-tag}

An entity linker is trained on one snapshot of the knowledge graph and then used for years while the graph keeps changing, so its accuracy decays. In TIGER I add graph structure, which keeps entities separable when their descriptions drift. In CYCLE I use the change itself as supervision: relations that appear or disappear between snapshots become contrastive examples. For both I built public benchmarks from yearly snapshots.

<div class="paper-links">CYCLE: <a href="/pdf/CYCLE.pdf">Paper</a> <a href="https://doi.org/10.1145/3627673.3679702">DOI</a> <a href="https://github.com/pengyu-zhang/CYCLE-Cross-Year-Contrastive-Learning-in-Entity-Linking">Code</a><br>TIGER: <a href="/pdf/TIGER.pdf">Paper</a> <a href="https://doi.org/10.3233/FAIA240933">DOI</a> <a href="https://github.com/pengyu-zhang/TIGER-Temporally-Improved-Graph-Entity-Linker">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/runcl.png"><img src="/images/runcl.png" alt="RUNCL" width="1600" height="908" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**RUNCL** ``Physica A 2024``
{: .pb-title}

Graph structure learning for low-degree nodes
{: .pb-tag}

Node degrees follow a power law, so missing or wrong edges hurt the sparsely connected nodes most, but GNNs take the input graph as correct. I generate candidate neighbourhood graphs from node features, choose the most likely one with Bayesian inference over a stochastic block model, and let the feature view and the relationship view supervise each other through contrastive learning. On six benchmarks it is best in most settings with few labels, and on low-degree nodes the gain grows as labels get scarcer.

<div class="paper-links"><a href="/pdf/RUNCL.pdf">Paper</a> <a href="https://doi.org/10.1016/j.physa.2024.129874">DOI</a> <a href="https://github.com/pengyu-zhang/RUNCL-Relationship-Updating-Network-with-Contrastive-Learning">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/mvma_gcn.png"><img src="/images/mvma_gcn.png" alt="MVMA-GCN" width="1600" height="914" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**MVMA-GCN** ``EAAI 2023``
{: .pb-title}

Multi-view graph learning
{: .pb-tag}

Real networks have several kinds of links, such as co-author, co-keyword and co-conference, but most GNNs use one view at a time or give all views the same weight. I feed all views into the model together. Two attention layers decide how much each neighbour and each view counts, and an HSIC term keeps the views distinct from each other. On eight benchmarks it beats the strongest baseline in most settings.

<div class="paper-links"><a href="/pdf/MVMA-GCN.pdf">Paper</a> <a href="https://doi.org/10.1016/j.engappai.2023.106717">DOI</a> <a href="https://github.com/pengyu-zhang/MVMA-GCN">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/Visual_Analysis.png"><img src="/images/Visual_Analysis.png" alt="Visual Analysis" width="1600" height="832" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Visual Analysis** ``JCAD 2022``
{: .pb-title}

Interactive author name disambiguation
{: .pb-tag}

Research offices spend a lot of manual work separating authors who share a name, which is common for Chinese names, and a classifier alone gives them no way to check its decisions. I paired a multi-view graph classifier with linked views of the collaboration network and the raw metadata, so users can still decide when the classifier is wrong. In a user study on 4,000 real university papers, students and experienced administrators completed the tasks reliably.

<div class="paper-links"><a href="/pdf/Visual_Analysis.pdf">Paper</a> <a href="https://doi.org/10.3724/sp.j.1089.2022.19191">DOI</a> <a href="https://github.com/pengyu-zhang/Visual-Analysis-for-Name-Disambiguation-of-Academic-Papers">Code</a> <a href="https://pengyu-zhang.github.io/Visual-Analysis-for-Name-Disambiguation-of-Academic-Papers/">Demo</a> <a href="https://www.youtube.com/watch?v=jQ8MNu-L-Os">YouTube</a> <a href="https://www.bilibili.com/video/BV1QM4m1k77Q/">Bilibili</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/dual_channel.png"><img src="/images/dual_channel.png" alt="DualChannel" width="1601" height="723" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**DualChannel** ``Information 2021``
{: .pb-title}

Author name disambiguation at scale
{: .pb-tag}

When authors share a name, their publication records get mixed up. With Xin Zheng (lead), we combined the text of each paper (fastText) with a graph of co-authors, organisations and venues (meta-path embeddings), then clustered the papers with DBSCAN, so the number of authors does not have to be set in advance. On AMiner WhoIsWho, about 205,000 papers, it beats six baselines with balanced precision and recall.

<div class="paper-links"><a href="/pdf/Dual-Channel.pdf">Paper</a> <a href="https://doi.org/10.3390/info12090383">DOI</a> <a href="https://github.com/pengyu-zhang/Dual-channel-Heterogeneous-Graph-Network-for-Author-Name-Disambiguation">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/research_overview.png"><img src="/images/research_overview.png" alt="Research Overview slides" width="1600" height="900" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Research Overview** ``Slides``
{: .pb-title}

A ten-minute talk through my research
{: .pb-tag}

Similar entities are hard to tell apart, and it gets harder as the data changes. This deck follows one thread through my work: where the failure shows up, which signals I added so that look-alike entities stay separable (the graph, how it changes, time itself, the words hidden in images), and where the same idea moved next, into recommendation and LLM pipelines. Nine slides, then one backup slide per paper.

<div class="paper-links"><a href="/pdf/Pengyu_Zhang_Research_Overview.pdf">Slides (PDF)</a></div>
</div>
</div>
