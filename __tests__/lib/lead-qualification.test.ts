import { describe, expect, it } from 'vitest'
import { inferJurisdiction, qualifyLead } from '@/lib/lead-qualification'

describe('inferJurisdiction', () => {
  it('detecta argentina', () => {
    expect(inferJurisdiction('Cordoba, Argentina')).toBe('argentina')
  })

  it('detecta estados unidos', () => {
    expect(inferJurisdiction('Miami, FL')).toBe('us')
  })

  it('usa international como fallback', () => {
    expect(inferJurisdiction('Madrid, Spain')).toBe('international')
  })
})

describe('qualifyLead', () => {
  it('prioriza paid consult para lead fuerte con permisos en miami', () => {
    expect(
      qualifyLead({
        location: 'Miami, FL',
        project_type: 'architecture',
        project_stage: 'permit',
        budget_range: '50k-plus',
        needs_permit: 'yes',
        company: 'Developer Group',
        client_type: 'developer',
      })
    ).toEqual({
      jurisdiction: 'us',
      client_type: 'developer',
      score: 100,
      next_step: 'paid_consult',
    })
  })

  it('envia lead chico de visualizacion a entry offer', () => {
    expect(
      qualifyLead({
        location: 'Santiago, Chile',
        project_type: '3d-visualization',
        project_stage: 'concept',
        budget_range: 'under-5k',
        needs_permit: 'no',
        client_type: 'homeowner',
      }).next_step
    ).toBe('entry_offer')
  })
})
