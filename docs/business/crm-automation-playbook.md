# CRM & Automation Playbook

## Objetivo

Operar Somaz con un CRM founder-led simple y trazable, sin duplicar datos ni abrir una segunda capa critica fuera de Supabase.

## Stack v1

- `Supabase` = source of truth
- `Supabase views` = superficie operativa diaria
- `n8n` = routing, reminders y snapshots
- `Resend` = emails comerciales y notificaciones
- `Telegram` = alertas internas
- `Google Drive` = carpeta cliente y propuestas finales

## Arquitectura CRM

- `contact_submissions` = intake bruto
- `deals` = pipeline comercial
- `client_projects` = onboarding y delivery
- `partners` = red externa
- `weekly_metrics` = snapshot semanal

Reglas:

- todo lead entra una sola vez
- todo lead con conversación comercial real pasa a `deal`
- ningún proyecto arranca sin `deal` ganado + anticipo
- Airtable no es core en v1

## Estados y operación

### Leads

Campos operativos minimos:

- identidad: `name`, `company`, `email`, `phone`
- contexto: `location`, `project_type`, `client_type`, `project_stage`, `budget_range`, `timeline`
- calificación: `needs_permit`, `jurisdiction`, `lead_score`, `next_step`
- attribution: `source`, `utm_*`
- trazabilidad: `created_at`, `reviewed_at`

`next_step` valido:

- `entry_offer`
- `discovery_call`
- `paid_consult`
- `qualify_async`

### Deals

`stage` valido:

- `new`
- `triage`
- `discovery_scheduled`
- `discovery_done`
- `paid_consult_offered`
- `paid_consult_paid`
- `proposal_drafting`
- `proposal_sent`
- `follow_up`
- `won`
- `lost`
- `stalled`

Campos clave:

- `owner`
- `source`
- `next_step`
- `next_step_due_at`
- `last_contact_at`
- `proposal_sent_at`
- `follow_up_count`
- `deposit_required_usd`
- `deposit_paid_at`
- `proposal_variant`
- `closed_at`

### Client projects

Campos de continuidad comercial:

- `kickoff_owner`
- `primary_channel`
- `shared_folder_ready`
- `partner_required`
- `partner_role`
- `regulatory_path_confirmed`
- `actual_cash_collected_usd`
- `gross_margin_pct`
- `final_approved_at`
- `closeout_completed_at`

## Taxonomía de source

Usar solo:

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

## Taxonomía de partner_type

Usar solo:

- `architect_of_record`
- `render_support`
- `documentation_support`
- `interior_support`
- `engineering_consultant`
- `permit_consultant`
- `builder_coordination`
- `graphic_presentation_support`

## Vistas operativas

### Diarias

- `new_leads`
- `needs_contact_today`
- `proposal_follow_up`
- `paid_consult_pipeline`
- `high_score_unworked_leads`
- `projects_pending_kickoff`

### Semanales

- `won_awaiting_deposit`
- `active_onboarding`
- `deals_stalled_over_10_days`
- `referral_candidates`
- `leads_by_source`
- `monthly_funnel_snapshot`

## Automatizaciones oficiales

### 1. Lead Intake Router

Trigger:

- nuevo `contact_submission`

Acciones:

- normalizar `source`
- validar `jurisdiction`, `lead_score`, `next_step`
- alertar inmediato si `next_step=paid_consult`
- crear tarea si `next_step=discovery_call`
- enviar email de faltantes si `next_step=qualify_async`

### 2. Lead SLA Monitor

Trigger:

- chequeo horario o diario

Acciones:

- detectar leads sin respuesta humana en `24h habiles`
- alertar por Telegram/email
- priorizar score alto

### 3. Deal Follow-up Manager

Trigger:

- deals con `next_step_due_at`
- deals en `proposal_sent` o `follow_up`

Acciones:

- reminder comercial
- follow-up `+2 / +5 / +10 dias`
- incrementar `follow_up_count`
- sugerir mover a `stalled`

### 4. Won to Onboarding

Trigger:

- `stage=won` + `deposit_paid_at` no nulo

Acciones:

- crear `client_project`
- crear carpeta Drive
- preparar checklist
- marcar `shared_folder_ready`
- avisar kickoff

### 5. Referral Reminder

Trigger:

- proyecto en closeout o aprobación final

Acciones:

- reminder interno
- link al template correcto
- registrar si el pedido fue hecho

### 6. Weekly Metrics Snapshot

Trigger:

- semanal

Acciones:

- consolidar funnel
- cash cobrado
- propuestas enviadas
- cierres
- pipeline por canal
- escribir `weekly_metrics`

## Propuestas y emails

### Propuestas

- viven en `docs/business/templates` + Drive
- cada propuesta se vincula a un `deal`
- registrar:
  - `proposal_sent_at`
  - `proposal_variant`
  - `deposit_required_usd`

`proposal_variant`:

- `argentina_full_scope`
- `us_international_partner`
- `visualization_consulting`

### Emails v1

- respuesta inicial inbound
- pedido de faltantes
- confirmación de discovery
- confirmación de paid consult
- envío de propuesta
- follow-up de propuesta
- confirmación de onboarding

## Dashboards

### Comercial semanal

- leads nuevos
- leads calificados
- discovery calls
- paid consults
- propuestas enviadas
- deals ganados
- cash cobrado
- pipeline ponderado

### Por canal

- volumen por `source`
- `lead -> discovery`
- `discovery -> paid consult`
- `proposal -> won`
- avg ticket por `source`
- close rate por `source`

### Capacidad comercial

- deals abiertos por etapa
- propuestas pendientes
- onboarding pendientes
- proyectos activos vs capacidad

## Reglas de operación

- no hay leads fuera del CRM
- no hay follow-ups sin fecha
- no se crea `client_project` sin depósito
- no se usa Airtable como sistema paralelo
- si una métrica no cambia una decisión, no entra al dashboard v1
