type BudgetRange = 'under-5k' | '5k-15k' | '15k-50k' | '50k-plus' | 'not-sure' | string
type ProjectStage = 'concept' | 'design' | 'permit' | 'construction' | string
type ClientType = 'homeowner' | 'developer' | 'hospitality' | 'architect' | 'commercial' | string

export type LeadQualificationInput = {
  location?: string
  project_type?: string
  project_stage?: ProjectStage
  budget_range?: BudgetRange
  needs_permit?: string
  company?: string
  client_type?: ClientType
}

export type LeadQualification = {
  jurisdiction: 'argentina' | 'us' | 'international'
  client_type: ClientType
  score: number
  next_step: 'entry_offer' | 'paid_consult' | 'discovery_call' | 'qualify_async'
}

const ARGENTINA_TERMS = ['argentina', 'cordoba', 'córdoba', 'buenos aires', 'rosario', 'mendoza']
const US_TERMS = ['miami', 'florida', 'united states', 'usa', 'u.s.', 'us', 'coral gables', 'brickell']

export function inferJurisdiction(location?: string): LeadQualification['jurisdiction'] {
  const normalized = (location || '').trim().toLowerCase()
  if (!normalized) return 'international'
  if (ARGENTINA_TERMS.some((term) => normalized.includes(term))) return 'argentina'
  if (US_TERMS.some((term) => normalized.includes(term))) return 'us'
  return 'international'
}

function normalizeClientType(input?: string): ClientType {
  const value = (input || '').trim().toLowerCase()
  if (!value) return 'homeowner'
  if (['developer', 'developers', 'real-estate developer'].includes(value)) return 'developer'
  if (['hospitality', 'hotel', 'restaurant', 'boutique hospitality'].includes(value)) return 'hospitality'
  if (['architect', 'architecture studio', 'studio'].includes(value)) return 'architect'
  if (['commercial', 'brand', 'retail'].includes(value)) return 'commercial'
  if (['homeowner', 'owner', 'residential owner'].includes(value)) return 'homeowner'
  return value
}

function scoreBudget(range?: BudgetRange): number {
  switch (range) {
    case '50k-plus':
      return 25
    case '15k-50k':
      return 18
    case '5k-15k':
      return 10
    case 'under-5k':
      return 4
    default:
      return 0
  }
}

function scoreStage(stage?: ProjectStage): number {
  switch (stage) {
    case 'permit':
      return 15
    case 'construction':
      return 14
    case 'design':
      return 10
    case 'concept':
      return 6
    default:
      return 0
  }
}

function scoreClientType(type: ClientType): number {
  switch (type) {
    case 'developer':
      return 20
    case 'hospitality':
      return 18
    case 'architect':
      return 15
    case 'commercial':
      return 14
    case 'homeowner':
      return 12
    default:
      return 10
  }
}

export function qualifyLead(input: LeadQualificationInput): LeadQualification {
  const jurisdiction = inferJurisdiction(input.location)
  const clientType = normalizeClientType(input.client_type)
  const service = (input.project_type || '').trim().toLowerCase()
  const needsPermit = (input.needs_permit || '').trim().toLowerCase()

  let score = 0
  score += scoreBudget(input.budget_range)
  score += scoreStage(input.project_stage)
  score += scoreClientType(clientType)

  if (input.company?.trim()) score += 8
  if (service === 'architecture') score += 12
  if (service === '3d-visualization') score += 6
  if (needsPermit === 'yes') score += 12
  if (jurisdiction === 'argentina') score += 6
  if (jurisdiction === 'us' && needsPermit === 'yes') score += 8

  score = Math.min(score, 100)

  let nextStep: LeadQualification['next_step'] = 'qualify_async'

  if (score >= 60) {
    nextStep = 'paid_consult'
  } else if (score >= 40) {
    nextStep = 'discovery_call'
  } else if (
    ['3d-visualization', 'consulting'].includes(service) ||
    input.budget_range === 'under-5k'
  ) {
    nextStep = 'entry_offer'
  }

  return {
    jurisdiction,
    client_type: clientType,
    score,
    next_step: nextStep,
  }
}
