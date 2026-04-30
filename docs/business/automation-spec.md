# Automation Spec

## Modelo CRM minimo

- `contact_submissions` = leads
- `deals` = oportunidades
- `client_projects` = proyectos vendidos
- `partners` = red externa
- `weekly_metrics` = tablero operativo

## Campos clave del lead

- name
- company
- email
- phone
- location
- project_type
- client_type
- project_stage
- budget_range
- timeline
- needs_permit
- jurisdiction
- lead_score
- next_step
- source
- utm_*
- reviewed_at

## Taxonomia de source

- `website`
- `instagram`
- `linkedin`
- `email_outbound`
- `whatsapp`
- `referral`
- `partner_referral`
- `broker_referral`
- `paid_social`
- `organic_search`

## Automatizaciones v1

### 1. Form submit
- crea lead en Supabase
- calcula `jurisdiction`, `lead_score` y `next_step`
- setea `source=website` cuando viene desde web
- envia email interno

### 2. Routing
- `paid_consult` -> aviso inmediato y prioridad alta
- `discovery_call` -> seguimiento comercial en 24h
- `entry_offer` -> respuesta con oferta acotada
- `qualify_async` -> pedir mas informacion

### 3. Reminder de leads
- si no hubo respuesta humana en 24h, aviso por Telegram o email interno

### 4. Deal creation
- cuando el lead acepta consulta paga, crear `deal`
- al cerrar, crear `client_project` y carpeta de Drive

### 5. Outbound reply
- trigger: respuesta positiva manual o automatizada a outreach
- acciones:
  - crear `deal` con `source=email_outbound` o `source=linkedin`
  - asignar owner
  - setear siguiente paso sugerido

### 6. Referral reminder
- trigger: `client_project` en closeout
- acciones:
  - recordatorio interno para pedir referral
  - sugerir uso de template correcto

### 7. Weekly review
- consolidar:
  - leads
  - leads calificados
  - consultas pagas
  - propuestas enviadas
  - cierres
  - caja cobrada
  - pipeline ponderado

## Flujos n8n v1

### 1. Lead Intake Router
- trigger: nuevo lead en `contact_submissions`
- acciones:
  - leer `lead_score`, `jurisdiction`, `next_step`
  - enviar alerta inmediata si `next_step=paid_consult`
  - crear tarea comercial si `next_step=discovery_call`
  - enviar pedido de info adicional si `next_step=qualify_async`
  - registrar evento de routing
  - normalizar `source` si viene por UTMs o integracion

### 2. Lead SLA Monitor
- trigger: revision horaria o diaria
- acciones:
  - detectar leads sin respuesta humana en `24h habiles`
  - alertar por Telegram o email interno
  - priorizar score alto

### 3. Discovery / Paid Consult Follow-up
- trigger: deal en `triage`, `discovery_scheduled` o `paid_consult_offered`
- acciones:
  - recordatorio a 24h si no hubo contacto
  - recordatorio pre-call
  - recordatorio post-call para mover a brief o lost

### 4. Proposal Follow-up
- trigger: `proposal_sent_at`
- acciones:
  - follow-up automatico en `+2`, `+5`, `+10 dias`
  - incrementar `follow_up_count`
  - marcar `stalled` o `lost` si no hay respuesta

### 5. Won -> Onboarding
- trigger: `stage=won` y `deposit_paid_at` no nulo
- acciones:
  - crear `client_project`
  - crear carpeta Drive
  - marcar `shared_folder_ready`
  - enviar checklist interna
  - avisar kickoff pendiente

### 6. Referral Ask Reminder
- trigger: proyecto en `closeout`
- acciones:
  - reminder a Sofía
  - link a template de referral
  - registrar status del pedido

### 7. Weekly Metrics Snapshot
- trigger: semanal
- acciones:
  - consolidar funnel, caja y pipeline por canal
  - escribir snapshot en `weekly_metrics`
  - enviar resumen corto interno

### 8. Client Experience Reminders
- trigger: kickoff, proyecto activo, entrega final y closeout
- acciones:
  - reminder de welcome / kickoff confirmation si falta onboarding
  - reminder de update semanal si el proyecto sigue activo
  - reminder de post-project follow-up `3-7 dias` despues de entrega
  - reminder de testimonial / referral ask `2-4 semanas` despues si aplica

## Vistas operativas

- `new_leads`
- `needs_contact_today`
- `proposal_follow_up`
- `paid_consult_pipeline`
- `deals_stalled_over_10_days`
- `high_score_unworked_leads`
- `won_awaiting_deposit`
- `active_onboarding`
- `projects_pending_kickoff`
- `leads_by_source`
- `referral_candidates`
- `monthly_funnel_snapshot`

## Stack recomendado

- Supabase para captura y base operativa
- vistas sobre Supabase para CRM diario
- n8n para routing, reminders y reporting
- Resend para propuestas y secuencias basicas
- Google Drive para carpetas cliente
- Telegram para alertas internas
