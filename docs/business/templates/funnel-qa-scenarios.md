# Funnel QA Scenarios

## 1. Argentina + architecture
- lead residencial o development en Argentina
- requiere arquitectura
- validar `jurisdiction=argentina`
- validar `next_step=paid_consult` o `discovery_call`

## 2. Miami + permit/sign-off
- lead en Miami
- `needs_permit=yes`
- validar prioridad alta
- validar `next_step=paid_consult`

## 3. International + visualization only
- lead internacional
- visualizacion puntual
- validar `entry_offer` o `discovery_call`

## 4. Low-fit / missing data
- datos incompletos o fit bajo
- validar `qualify_async`
- validar email de faltantes

## 5. Proposal follow-up
- deal con `proposal_sent_at`
- validar recordatorios `+2 / +5 / +10`

## 6. Won -> onboarding
- `stage=won`
- `deposit_paid_at` no nulo
- validar `client_project`

## 7. Closeout -> referral
- proyecto en closeout
- validar reminder de referral
