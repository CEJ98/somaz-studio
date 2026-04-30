# Sales Playbook

## Pipeline oficial

1. Lead
2. Triage
3. Discovery Call
4. Paid Consult / Brief
5. Proposal
6. Follow-up
7. Close
8. Deposit
9. Onboarding

## SLA y owner

- Owner comercial: `Sofía`
- Primera respuesta: `<= 24h hábiles`
- Todo lead entra en `contact_submissions`
- Todo deal vivo se trabaja desde `deals`

## Etapas, objetivo y salida

### 1. Lead
- Entrada: web, referral, DM, WhatsApp o email manual
- Objetivo: capturar datos suficientes para clasificar
- Salida: `triage`

### 2. Triage
- Inputs obligatorios:
  - `jurisdiction`
  - `client_type`
  - `project_type`
  - `project_stage`
  - `budget_range`
  - `needs_permit`
- Salidas validas:
  - `entry_offer`
  - `discovery_call`
  - `paid_consult`
  - `closed_lost`

#### Reglas de ruteo
- `us + needs_permit=yes` -> `paid_consult`
- `argentina + architecture` -> `paid_consult` o `discovery_call`
- `visualization + under-5k` -> `entry_offer`
- `info insuficiente` -> `qualify_async`
- `no fit claro` -> `closed_lost`

### 3. Discovery Call
- Solo para fit intermedio o alto
- Duracion: `15–20 min`
- Objetivo:
  - validar alcance
  - urgencia
  - decision maker
  - presupuesto
  - jurisdiccion
  - necesidad de partner firmante
- Regla:
  - no resolver consultoria profunda gratis
- Salida:
  - `paid_consult_offered`
  - `lost`

### 4. Paid Consult / Brief
- Default para leads complejos o valiosos con alcance aun borroso
- Entregable obligatorio:
  - llamada estructurada
  - brief consolidado
  - memo con recomendacion
  - fases sugeridas
  - partner model si aplica
- Salida:
  - `proposal_drafting`

### 5. Proposal
- Siempre por fases
- Debe incluir:
  - alcance
  - entregables
  - exclusiones
  - rounds
  - timeline
  - fee
  - forma de pago
  - aclaracion legal por jurisdiccion
- Variantes:
  - `Argentina full-scope`
  - `US / international with local licensed partner`
  - `Visualization / consulting standalone`
- Salida:
  - `proposal_sent`

### 6. Follow-up
- Cadencia fija:
  - `+2 dias`
  - `+5 dias`
  - `+10 dias`
- Luego:
  - `stalled`
  - `lost`

### 7. Close
- Un deal solo pasa a `won` cuando existe:
  - propuesta aprobada
  - contrato confirmado
  - anticipo recibido

### 8. Deposit
- No se reserva inicio sin pago
- Paquete chico: `50/50`
- Proyecto por fases: `40/40/20`

### 9. Onboarding
- Crear `client_project`
- Crear carpeta
- Crear checklist
- Confirmar canal principal
- Definir partner si aplica
- Agendar kickoff

## Estados estandar

### deals.stage
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

### loss_reason
- `budget`
- `timing`
- `no_fit`
- `no_response`
- `went_with_other_firm`
- `jurisdiction_issue`

## Activos comerciales obligatorios

- `lead response templates`
- `discovery call script`
- `paid consult brief template`
- `proposal template by phase`
- `onboarding checklist`

## Criterio de cierre real

No se considera venta ganada hasta que haya:

- scope definido
- entregables definidos
- timeline definido
- fee aprobado
- jurisdiccion clara
- partner definido si hace falta firma local
- anticipo acreditado
