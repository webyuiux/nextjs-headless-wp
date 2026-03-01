// lib/utils/sanitize.ts
// Cleans Elementor HTML before rendering — removes dangerous scripts

import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHTML(dirty: string): string {
  // Allow all standard HTML tags Elementor uses
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'h1','h2','h3','h4','h5','h6',
      'p','a','ul','ol','li','blockquote','pre','code',
      'strong','b','em','i','u','s','br','hr',
      'img','figure','figcaption','picture','source',
      'div','span','section','article','aside','main',
      'header','footer','nav',
      'table','thead','tbody','tfoot','tr','td','th',
      'form','input','button','label','select','option','textarea',
      'video','audio','iframe','embed',
      'svg','path','circle','rect','line','polyline','polygon',
    ],
    ALLOWED_ATTR: [
      'href','src','srcset','alt','title','class','id',
      'style','target','rel','type','value','placeholder',
      'width','height','loading','decoding','fetchpriority',
      'allowfullscreen','frameborder','scrolling',
      'data-id','data-element_type','data-widget_type',
      'data-settings','data-animation','data-aos',
      'aria-label','aria-hidden','aria-expanded',
      'role','tabindex','for','name','action','method',
      'viewBox','fill','stroke','stroke-width','d',
      'xmlns','x','y','cx','cy','r','rx','ry',
    ],
    ALLOW_DATA_ATTR: true,
    FORCE_BODY: false,
  })
}