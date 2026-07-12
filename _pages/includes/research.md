## Experience

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2026</div><a class="img-zoom" href="/images/fusion_training.png"><img src='/images/fusion_training.png' alt="Fusion Training" width="100%"></a>
<div class="paper-links"><a href="/pdf/Fusion_Training.pdf">Paper</a> | <a href="https://doi.org/10.18653/v1/2026.acl-srw.64">DOI</a> | <a href="https://github.com/caocongfeng/Fusion-Bench">Code</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**Fusion Training** · Hybrid-reasoning LLMs

- Found that interleaving thinking and non-thinking training data keeps both abilities strong, and measured how the balance shifts (adding more non-thinking data steadily hurts reasoning). Released the open Fusion Bench benchmark.
- Newer LLMs mix quick answers with long step-by-step reasoning to save compute, but putting both into one model makes them fight. Ran a full grid over data ratios and training orders to see what keeps both working.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under review</div><a class="img-zoom" href="/images/timeroute.png"><img src='/images/timeroute.png' alt="TimeRoute" width="100%"></a>
<div class="paper-links"><a href="https://arxiv.org">arXiv</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**TimeRoute** · Time-aware recommendation

- Raised recommendation accuracy by up to **6%** on TikTok, Amazon-Baby, and Amazon-Sports over strong baselines.
- Recommenders usually mix a user's clicks, text, and images the same way no matter when each happened. Built a model that learns which of these matter over short versus long time spans, and that cleans up noisy or missing history on its own.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under review</div><a class="img-zoom" href="/images/time_imprint.png"><img src='/images/time_imprint.png' alt="Time Imprint" width="100%"></a>
<div class="paper-links"><a href="https://arxiv.org">arXiv</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**Time Imprint** · Multi-modal entity disambiguation

- Raised top-match accuracy by up to **4.81%** overall, and by up to **200%** on the hardest, most look-alike cases.
- Systems often mix up near-identical records whose text and images look almost the same. Added time as an extra clue so the model can tell them apart, cutting errors most where they were worst.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ESWC 2026</div><a class="img-zoom" href="/images/beyond_images.png"><img src='/images/beyond_images.png' alt="Beyond Images" width="100%"></a>
<div class="paper-links"><a href="/pdf/Beyond_Images.pdf">Paper</a> | <a href="https://doi.org/10.1007/978-3-032-25156-5_5">DOI</a> | <a href="https://github.com/pengyu-zhang/Beyond-Images">Code</a> | <a href="https://youtu.be/PHaukQic-N4">YouTube</a> | <a href="https://www.bilibili.com/video/BV13445zLEp4">Bilibili</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**Beyond Images** · Knowledge-graph data enrichment

- Raised match accuracy by up to **7%** overall, and by up to **333%** on ambiguous logos and symbols.
- Many records have missing or low-quality images, which hurts matching. Built a pipeline that finds extra images online, turns them into text with vision-language models, and writes a summary with an LLM, filling the gaps with no manual work.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">LREC 2026</div><a class="img-zoom" href="/images/graph_tempcz.png"><img src='/images/graph_tempcz.png' alt="Graph-TempCZ" width="100%"></a>
<div class="paper-links"><a href="/pdf/Graph-TempCZ.pdf">Paper</a> | <a href="https://doi.org/10.63317/2jopizgg4dzo">DOI</a> | <a href="https://github.com/caocongfeng/Graph-TempCZ">Code</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**Graph-TempCZ** · Large-scale graph link prediction

- Raised test accuracy by **5.98%** (to **92.88%**) with a GraphSAGE GNN over feature-based XGBoost baselines.
- Built the first large graph linking research papers to the software they use, with over six million mentions spanning 1959 to 2022, and checked how well the model predicts usage in later years.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CIKM & ECAI 2024</div><a class="img-zoom" href="/images/cycle.png"><img src='/images/cycle.png' alt="CYCLE and TIGER" width="100%"></a>
<div class="paper-links">CYCLE: <a href="/pdf/CYCLE.pdf">Paper</a> | <a href="https://doi.org/10.1145/3627673.3679702">DOI</a> | <a href="https://github.com/pengyu-zhang/CYCLE-Cross-Year-Contrastive-Learning-in-Entity-Linking">Code</a><br>TIGER: <a href="/pdf/TIGER.pdf">Paper</a> | <a href="https://doi.org/10.3233/FAIA240933">DOI</a> | <a href="https://github.com/pengyu-zhang/TIGER-Temporally-Improved-Graph-Entity-Linker">Code</a></div>
</div></div>
<div class='paper-box-text' markdown="1">

**CYCLE & TIGER** · Temporally robust entity linking

- CYCLE beat the best prior method by **13.9% to 17.8%**; TIGER beat the strongest baseline by **16% to 21%**, measured over one to three year gaps.
- Models that match text to a database lose accuracy as the database changes from year to year. CYCLE learns from those yearly changes, and TIGER also uses how records connect to each other. Both come with public benchmarks (GCL-TempEL and Graph-TempEL).
</div>
</div>
