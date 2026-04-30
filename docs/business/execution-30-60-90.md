# Execution 30 / 60 / 90

## Objetivo

Llevar Somaz a estado `listo para vender y operar` en 90 dias, usando la base ya definida en estrategia, CRM, experiencia, portfolio y equipo.

## Definicion de listo

- web y portfolio en produccion
- Supabase alineado con el modelo real
- contratos y propuestas listos para uso
- CRM y automatizaciones funcionando
- 3 casos ancla compartibles
- red minima de partners activa
- outreach y referrals en marcha
- tablero semanal funcionando

## Dia 0-30 — Launch operativo real

### Infraestructura

- aplicar migraciones remotas `002-010`
- validar datos heredados
- deployar web actualizada
- revisar variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - emails de contacto

### QA de funnel

- correr los 4 escenarios del `funnel-qa-scenarios.md`
- verificar:
  - lead guardado
  - `lead_score`
  - `jurisdiction`
  - `next_step`
  - `source`
  - email interno

### Capa legal

- congelar version v1 de contratos
- mandar paquete a revision legal externa
- consolidar observaciones

### Assets minimos

- proposal outline final
- brand one-pager
- intro deck
- bio corta de Sofía
- lead response templates
- seleccionar 3 links de portfolio

### Rutina comercial minima

- revision diaria de leads
- revision semanal de deals
- revision semanal de metricas
- activar inbound, referrals y outreach limitado

## Dia 31-60 — Activacion comercial y red minima

### Partners

- cerrar:
  - `2 architect_of_record`
  - `2 render_support`
  - `1-2 documentation_support`
  - `1 interior_support`
  - `1-2 permit/engineering consultants`

- completar `partner-scorecard.md`
- cargar datos y condiciones
- definir partner primario/secundario

### Comercial

- activar outreach semanal
- activar warm intros y referrals
- disciplina CRM:
  - sin leads fuera del sistema
  - sin deals sin `next_step_due_at`
  - sin proyectos con terceros sin `partner map`

### Portfolio y casos

- cerrar reescritura de 3 casos ancla
- usarlos en proposals, outreach, deck y referrals

### SEO y contenido

- publicar 4 piezas prioritarias
- validar linking entre `services`, `work`, `blog`, `contact`

### Experiencia de cliente

- usar:
  - welcome email
  - kickoff confirmation
  - roadmap summary
  - feedback instructions
  - delivery note
  - post-project follow-up

## Dia 61-90 — Optimización y readiness

### Funnel

- revisar conversiones reales
- revisar `source`
- eliminar canales malos
- ajustar scoring si hace falta

### Finanzas y capacidad

- revisar:
  - `cash collected`
  - `booked revenue`
  - `gross margin`
  - `active_capacity_load_pct`
- detectar erosion de margen
- decidir si ya se justifica el primer hire

### Sistema operativo

- usar `partner-map-template.md`
- usar `hiring-scorecard.md`
- usar `project-coordinator-role-card.md` si aplica
- fijar rutina semanal:
  - ventas
  - delivery
  - partners
  - metricas
  - caja
  - riesgos

### Cierre de consistencia

- revisar home, services, work, about, contact
- revisar emails, proposals y deck
- eliminar remanentes del posicionamiento viejo

## Decisiones al dia 90

- seguir founder-led puro
- sumar `Project Coordinator fractional`
- reforzar `render/documentation support`

La decision sale de datos, no de intuicion.
