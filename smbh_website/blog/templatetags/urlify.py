from urllib.parse import quote_plus
from django import template


register = template.Library()

# https://docs.djangoproject.com/en/dev/howto/custom-template-tags/
@register.filter(is_safe=True)
def urlify(value):
    return quote_plus(value)
