## Publications
{% comment %} One entry per paper in _data/publications.yml, in that order.
Edit the papers there, not here. {% endcomment %}
{% for pub in site.data.publications %}
{% capture authors %}{% for name in pub.authors %}{% if name == site.author.name %}**{{ name }}**{% else %}{{ name }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}{% endcapture -%}
- ``{{ pub.venue }}`` <span class="pub-title">{{ pub.title }}{% if pub.title_note %} *{{ pub.title_note }}*{% endif %}.</span> <span class="pub-meta">{{ authors }}.{% if pub.venue_name %} {{ pub.venue_name }}.{% endif %}</span><br>
<span class="pub-links">{% include paper-links.html id=pub.id aria=true %}</span>
{% endfor -%}
{: .timeline}
