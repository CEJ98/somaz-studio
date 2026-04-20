/**
 * Maps blog post slugs to library image slugs.
 * Used as fallback or overlay when /blog/{slug}.jpg doesn't exist.
 */
export const blogImageMap: Record<string, string> = {
  'why-light-is-the-first-material':       'interior-detail-warm-01',
  'from-concept-to-render-process':         'interior-luxury-01',
  'casa-estancita-designing-for-silence':   'interior-living-warm-01',
  '3d-visualization-real-estate-developers':'exterior-modern-01',
  'renders-accelerate-permit-approvals':    'exterior-render-01',
  'interior-design-miami-trends':           'interior-living-luxury-01',
  'business-case-remote-design':            'lifestyle-desk-01',
  'materials-photograph-age-well':          'material-texture-01',
  'common-visualization-brief-mistakes':    'interior-detail-warm-02',
  'commercial-spaces-brand-identity':       'exterior-modern-night-01',
}
