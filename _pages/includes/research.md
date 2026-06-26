# Project Experience

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2026</div><img src='images/fusion_training.png' alt="Fusion Training" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Fusion Training** · Hybrid reasoning in large language models

**Made one model good at both quick answers and deep step by step reasoning, instead of trading one for the other.**

Newer LLMs (like Qwen3 and GPT-5) switch between fast concise replies for easy questions and long reasoning for hard ones to save time and compute, but training both behaviors into a single model makes them compete. Using math problem solving as the testbed, we systematically studied how to mix and order the two kinds of training data, showed that interleaving them keeps both skills strong, quantified the trade off between them, and released an open benchmark (Fusion Bench) for the community.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under review</div><img src='images/timeroute.png' alt="TimeRoute" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**TimeRoute** · Recommendation system

**Improved recommendation accuracy by up to 6%** on TikTok and Amazon datasets, beating strong baselines.

Recommenders usually blend user signals (clicks, text, images) the same way no matter when they happened. I built a model that learns which signals matter over short versus long time spans and weighs them accordingly, then automatically cleans up noisy and missing data so the recommendations stay reliable.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Under review</div><img src='images/time_imprint.png' alt="Time Imprint" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Time Imprint** · Entity resolution

**Boosted top match accuracy by up to 4.81%, and by up to 200%** on the hardest cases.

Systems often confuse near identical records whose text and images look almost the same. I added timing as an extra clue so the model can tell them apart, sharply cutting errors on the most confusable pairs.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ESWC 2026</div><img src='images/beyond_images.png' alt="Beyond Images" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Beyond Images** · Automated data enrichment

**Lifted match accuracy by up to 7%, and by up to 333%** on ambiguous logos and symbols.

Many records have missing or low quality images, which hurts matching. I built an automated pipeline that finds extra images online, turns them into text with vision language models, and summarizes everything with an LLM, filling the gaps without any manual work.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CIKM 2024</div><img src='images/cycle.png' alt="CYCLE" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**CYCLE** · Entity resolution that holds up over time

**Beat the best prior method by 13.9% to 17.8%**, with the largest gains on rare records.

Models that match text to a database get worse as that database changes from year to year. I designed a training approach that learns from those yearly changes so accuracy stays high as the data evolves, and released an open benchmark for the problem.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ECAI 2024</div><img src='images/tiger.png' alt="TIGER" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**TIGER** · Entity resolution with graphs and text

**Outperformed the strongest baseline by 16% to 21%.**

Tackling the same drift problem, I combined how records connect to each other with their text descriptions to make matching more robust as data changes over time, and released a public benchmark to measure it.
</div>
</div>
