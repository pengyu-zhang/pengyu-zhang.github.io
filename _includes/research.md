## Experience

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/timeroute.png"><img src="/images/timeroute.png" alt="TimeRoute" width="1600" height="900"></a></div>
<div class="paper-box-text" markdown="1">

**TimeRoute** ``Under review``
{: .pb-title}

Time-aware multi-modal recommendation
{: .pb-tag}

Which modality matters for a purchase shifts over time, and differently for each user, but recommenders fuse text, images and audio with one global weighting. Routing modalities per user from their own interaction timestamps, and filtering outdated edges with time-conditioned diffusion, beats the strongest baselines on three datasets. Swap the timing signal for noise and the gain vanishes.

<div class="paper-links"><a href="https://arxiv.org/abs/2608.10983">arXiv</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/time_imprint.png"><img src="/images/time_imprint.png" alt="Time Imprint" width="1600" height="1090" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Time Imprint** ``Under review``
{: .pb-title}

Time as a modality for look-alike entities
{: .pb-tag}

Some entities share almost identical text and images, like Napoleon Bonaparte and the 2023 film *Napoleon*. Treating time as an entity-level modality, pooled from each entity's own timestamps and injected into the encoder, the scoring function and a contrastive objective, tells them apart. The gain is largest exactly on the most ambiguous one percent of entities.

<div class="paper-links"><a href="https://arxiv.org/abs/2607.09777">arXiv</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/Select-Dont-Train.png"><img src="/images/Select-Dont-Train.png" alt="Select, Don't Train" width="1600" height="898" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Select, Don't Train** ``ISWC 2026``
{: .pb-title}

LLM-based entity disambiguation
{: .pb-tag}

Dual-encoders force candidate retrieval and fine-grained selection into one embedding space, and need retraining whenever the knowledge base changes. With Fina Polat (lead), we split the two: an untrained BM25 retriever plus an LLM selector that may abstain beats the best trained dual-encoder on the ZELDA benchmark, with no retriever training at all.

<div class="paper-links"><a href="https://arxiv.org/abs/2608.27470">arXiv</a> <a href="https://github.com/FinaPolat/RAISED">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/fusion_training.png"><img src="/images/fusion_training.png" alt="Fusion Training" width="1600" height="904" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Fusion Training** ``ACL 2026``
{: .pb-title}

Hybrid-reasoning LLMs
{: .pb-tag}

Hybrid models like Qwen3 answer quickly or think step by step from one set of weights, but the two kinds of training data interfere. With Congfeng Cao (lead), we swept seven data ratios and three training schedules on an open benchmark: more short-answer data steadily erodes long-form reasoning, and interleaving the two is the most robust schedule.

<div class="paper-links"><a href="/pdf/Fusion_Training.pdf">Paper</a> <a href="https://doi.org/10.18653/v1/2026.acl-srw.64">DOI</a> <a href="https://github.com/caocongfeng/Fusion-Bench">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/beyond_images.png"><img src="/images/beyond_images.png" alt="Beyond Images" width="1600" height="903" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Beyond Images** ``ESWC 2026``
{: .pb-title}

Knowledge-graph data enrichment
{: .pb-tag}

Curated image sets drop ambiguous pictures such as logos and symbols because visual encoders turn them into noise. Captioning every image an entity has with a vision-language model, and fusing the captions with an LLM into one text summary, turns that noise into usable evidence: link prediction improves on every dataset and model tested, most on logo-heavy entities, with no model changes.

<div class="paper-links"><a href="/pdf/Beyond_Images.pdf">Paper</a> <a href="https://doi.org/10.1007/978-3-032-25156-5_5">DOI</a> <a href="https://github.com/pengyu-zhang/Beyond-Images">Code</a> <a href="https://pengyu-zhang.github.io/Beyond-Images/">Demo</a> <a href="https://youtu.be/PHaukQic-N4">YouTube</a> <a href="https://www.bilibili.com/video/BV13445zLEp4">Bilibili</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/graph_tempcz.png"><img src="/images/graph_tempcz.png" alt="Graph-TempCZ" width="1184" height="328" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Graph-TempCZ** ``LREC 2026``
{: .pb-title}

Large-scale temporal link prediction
{: .pb-tag}

Existing software-mention data has no graph structure and no time axis. With Congfeng Cao (lead), we turned mentions from 1.5 million biomedical papers into a publication-software graph and framed software usage as temporal link prediction: a GraphSAGE model beats feature-based baselines, and its accuracy decays as the gap between training and test years grows.

<div class="paper-links"><a href="/pdf/Graph-TempCZ.pdf">Paper</a> <a href="https://doi.org/10.63317/2jopizgg4dzo">DOI</a> <a href="https://github.com/caocongfeng/Graph-TempCZ">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/understanding_el.png"><img src="/images/understanding_el.png" alt="Understanding Entity Linking" width="1600" height="900" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Understanding Entity Linking** ``EKAW 2024``
{: .pb-title}

Entity linking for social media analysis
{: .pb-tag}

Network analysis of tweets rests on whichever entities a linker extracts, and short, messy text offers no ground truth for choosing one. With James Nevin (lead), we ran two established linkers at five thresholds each over 21 million tweets: they agree on only about 40% of the entities, and the resulting networks change shape and even their top entities. Report results across linkers, not from one.

<div class="paper-links"><a href="/pdf/Understanding_Entity_Linking.pdf">Paper</a> <a href="https://doi.org/10.1007/978-3-031-77792-9_5">DOI</a> <a href="https://github.com/jim-g-n/Tweet-Linked-Entity-Co-occurrence">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/cycle.png"><img src="/images/cycle.png" alt="CYCLE and TIGER" width="1600" height="573" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**CYCLE & TIGER** ``CIKM & ECAI 2024``
{: .pb-title}

Temporally robust entity linking
{: .pb-tag}

An entity linker is trained on one snapshot of the knowledge graph and then used for years while the graph moves on, so accuracy decays. TIGER shows that graph structure keeps entity representations separable as descriptions drift; CYCLE shows the change itself is supervision, turning relations that appear or vanish between snapshots into contrastive examples. Both come with public yearly-snapshot benchmarks.

<div class="paper-links">CYCLE: <a href="/pdf/CYCLE.pdf">Paper</a> <a href="https://doi.org/10.1145/3627673.3679702">DOI</a> <a href="https://github.com/pengyu-zhang/CYCLE-Cross-Year-Contrastive-Learning-in-Entity-Linking">Code</a><br>TIGER: <a href="/pdf/TIGER.pdf">Paper</a> <a href="https://doi.org/10.3233/FAIA240933">DOI</a> <a href="https://github.com/pengyu-zhang/TIGER-Temporally-Improved-Graph-Entity-Linker">Code</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/Visual_Analysis.png"><img src="/images/Visual_Analysis.png" alt="Visual Analysis" width="1600" height="832" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**Visual Analysis** ``JCAD 2022``
{: .pb-title}

Interactive author name disambiguation
{: .pb-tag}

Research offices spend heavy manual effort separating authors who share a name, common for Chinese names, and a bare classifier gives them no way to check a decision. Pairing a multi-view graph classifier with linked views of collaboration structure and raw metadata let students and veteran administrators resolve 4,000 real university papers reliably, even where the classifier erred. Classifier accuracy about 91% on ACM and DBLP; eleven users completed the tasks with over 95% success.

<div class="paper-links"><a href="/pdf/Visual_Analysis.pdf">Paper</a> <a href="https://doi.org/10.3724/sp.j.1089.2022.19191">DOI</a> <a href="https://github.com/pengyu-zhang/Visual-Analysis-for-Name-Disambiguation-of-Academic-Papers">Code</a> <a href="https://pengyu-zhang.github.io/Visual-Analysis-for-Name-Disambiguation-of-Academic-Papers/">Demo</a> <a href="https://www.youtube.com/watch?v=jQ8MNu-L-Os">YouTube</a> <a href="https://www.bilibili.com/video/BV1QM4m1k77Q/">Bilibili</a></div>
</div>
</div>

<div class="paper-box"><div class="paper-box-image"><a class="img-zoom" href="/images/dual_channel.png"><img src="/images/dual_channel.png" alt="DualChannel" width="1601" height="723" loading="lazy"></a></div>
<div class="paper-box-text" markdown="1">

**DualChannel** ``Information 2021``
{: .pb-title}

Author name disambiguation at scale
{: .pb-tag}

Authors who share a name scramble publication records. With Xin Zheng (lead), we combined fastText paper semantics with meta-path embeddings over a co-author, organisation and venue graph, summed the two similarity matrices and clustered papers with DBSCAN, so no cluster count is preset. F1 0.62 on AMiner WhoIsWho, 221 names and 205,000 papers, above six baselines with balanced precision and recall.

<div class="paper-links"><a href="/pdf/Dual-Channel.pdf">Paper</a> <a href="https://doi.org/10.3390/info12090383">DOI</a> <a href="https://github.com/pengyu-zhang/Dual-channel-Heterogeneous-Graph-Network-for-Author-Name-Disambiguation">Code</a></div>
</div>
</div>
