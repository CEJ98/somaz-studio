# Financial Model

## Objetivo del modelo

Dar a Somaz una base simple y operativa para decidir:

- que proyectos aceptar
- cual es el fee minimo viable
- cuanto margen deja cada linea
- cuantos proyectos puede absorber sin romper QA
- cuanto necesita vender para cubrir costos y llegar a `USD 15k / mes`

## Supuestos base

- meta mensual base: `USD 15,000`
- sueldo objetivo de Sofía: `USD 5,000 / mes`
- Somaz sigue founder-led, sin nomina fija amplia
- partners y consultores son variables por proyecto
- no se usan tarifas horarias publicas
- se calcula un `hourly floor interno` solo para proteger pricing y change orders

## Estructura de costos

### Costos fijos mensuales

| Rubro | Monto base USD |
| --- | ---: |
| Sueldo objetivo de Sofía | 5,000 |
| Software / SaaS | 450 |
| Hosting / herramientas | 150 |
| Contabilidad / admin | 300 |
| Marketing base | 500 |
| Legal / ops reserve | 300 |
| Total fijo base | 6,700 |

### Reservas mensuales

| Rubro | Regla |
| --- | --- |
| Impuestos | `10–15%` del cash collected |
| Contingencia | `5%` del revenue booked |
| Reinversion | `5–10%` del cash collected cuando el mes supera break-even |

### Costos variables por proyecto

| Rubro | Regla base |
| --- | --- |
| Partner architect | solo cuando `partner_required = true` |
| Render support | segun complejidad o deadlines |
| Documentacion externa | segun necesidad tecnica |
| Consultores | ingenieria, builder coordination, especialistas |
| Filings / terceros | fuera del fee de Somaz salvo inclusion expresa |

## Hourly floor interno

Uso: proteger rentabilidad, estimar erosion de margen y justificar change orders.

Formula base:

`(costos fijos mensuales + reserva operativa minima) / horas fundadora vendibles`

Default recomendado:

- horas mensuales disponibles de Sofía: `160`
- horas no vendibles: `40`
- horas vendibles reales: `120`
- base de costos para piso interno: `USD 7,500`

Resultado:

- `hourly floor interno recomendado = USD 62–65/h`

Regla:

- no cotizar por hora en publico
- usar este piso para detectar proyectos subcotizados o rondas extra

## Pricing minimo y margen objetivo

| Linea | Ticket minimo USD | Costo variable tipico USD | Margen bruto objetivo | Founder time band | Umbral de no-aceptacion |
| --- | ---: | ---: | ---: | --- | --- |
| Paid consult / diagnostico | 600 | 0–50 | 85–95% | 4–8h | no bajar de 600 |
| Visualization standalone | 1,500 | 150–400 | 70–80% | 12–20h | no tomar si baja de 65% |
| Interiors | 2,500 | 250–700 | 65–75% | 20–35h | no tomar si baja de 60% |
| Architecture concept | 2,000 | 200–600 | 65–75% | 18–30h | no arrancar debajo de 2,000 |
| Architecture + partner coordination | 4,500 | 900–1,800 | 50–65% | 30–50h | no tomar si baja de 50% |

## Reglas de pricing

- no vender arquitectura multiparte por debajo del minimo definido
- si el proyecto requiere mas rondas, mas coordinacion o mas tiempo de partner:
  - subir fee antes de avanzar
  - o activar change order
- no absorber fees de terceros sin inclusion expresa
- no aceptar proyectos debajo del margen minimo salvo excepcion estrategica escrita

## Break-even

### Break-even mensual real

Con `USD 6,700` de costo fijo base:

- break-even operativo minimo recomendado: `USD 8,000–8,500` de cash collected
- break-even saludable con reserva minima: `USD 9,500–10,000`

### Referencias por mix

| Mix | Llega a break-even | Comentario |
| --- | --- | --- |
| 2 paid consults + 2 visualization | no siempre | sirve como base, no como mes ideal |
| 1 interiors + 1 visualization + 1 consult | cerca | puede sostener mes flojo |
| 1 architecture + partner + 1 paid consult | si | buen mes si el margen partner esta controlado |
| 2 proyectos medianos | si | escenario base razonable |

## Meta mensual y escenarios

### Conservador

- objetivo: `USD 10k–12k`
- foco: caja y disciplina
- mix:
  - 1 proyecto mediano
  - 2 paid consults
  - 1 paquete visualization

### Base

- objetivo: `USD 15k`
- mix recomendado:
  - 1 proyecto grande `architecture + partner` o `2 proyectos medianos`
  - 1–3 paquetes chicos o consultoria
- este es el escenario de referencia del estudio

### Stretch

- objetivo: `USD 20k–25k`
- solo valido si:
  - mejor conversion
  - mejor ticket
  - soporte rentable
- no se recomienda intentar llegar agregando volumen caotico

## Capacidad financiera

### Capacidad operativa base

- `2 proyectos grandes maximo`
- `3–5 paquetes chicos` si no afectan QA

### Traduccion financiera

| Configuracion | Ingreso razonable | Riesgo |
| --- | ---: | --- |
| 1 grande + 2 chicos | 12k–16k | sano |
| 2 medianos + 1 consult | 13k–17k | sano |
| 2 grandes + extras | 18k–22k | alto riesgo operativo |
| mucho volumen chico | variable | erosiona foco y QA |

Regla:

- si para llegar a la meta hace falta meter mas volumen del que Sofía puede revisar bien, el problema es de ticket o de soporte, no de pipeline

## Reglas operativas financieras

### Antes de propuesta
- calcular `minimum_viable_fee_usd`
- estimar `expected_partner_cost_usd`
- validar `target_gross_margin_pct`
- validar impacto sobre capacidad mensual

### Antes de cierre
- confirmar fee minimo viable
- confirmar anticipo
- separar third-party costs dentro o fuera

### Durante delivery
- comparar alcance vendido vs real
- detectar erosion de margen temprano
- subir fee o activar change order si el proyecto se desborda

### En closeout
- registrar:
  - cash real
  - costo partner real
  - costo externo real
  - margen bruto real
  - leccion de pricing

## KPI financieros

- `cash collected this month`
- `booked revenue this month`
- `average ticket`
- `gross margin average`
- `weighted pipeline`
- `active capacity load`
- `close rate by service line`
- `close rate by jurisdiction`
