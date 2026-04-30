# Operations Playbook

## Modelo operativo

- `Sofía` = owner operativo principal, direccion creativa, filtro de alcance y QA final
- `Partners / consultores` = architect-of-record, render support, documentacion, ingenieria, builder coordination
- `client_projects` = fuente de verdad del delivery
- `deals` y `contact_submissions` solo alimentan arranque y compliance previo

## Limites operativos

- maximo `2 proyectos grandes` en paralelo
- maximo `3–5 paquetes chicos` si no comprometen QA ni fechas

## Pipeline operativo oficial

1. `Brief Ready`
2. `Kickoff`
3. `Inputs Collected`
4. `Concept / Design Sprint`
5. `Internal QA`
6. `Client Review`
7. `Revision Cycle`
8. `Final Delivery / Handoff`
9. `Closeout`

## Etapas, owner y salida

### 1. Brief Ready
- owner: `Sofía`
- entradas:
  - `won`
  - anticipo acreditado
  - contrato correcto
  - `scope_summary`
  - `rounds_included`
  - `timeline_summary`
  - `jurisdiction`
  - `partner_required`
  - `governing_law_profile`
- bloqueo:
  - no crear proyecto activo si falta contrato, anticipo o partner path cuando aplica
- salida:
  - `client_project` completo

### 2. Kickoff
- owner: `kickoff_owner`
- entradas:
  - proyecto creado
  - stakeholders identificados
  - canal principal definido
- salida:
  - acta de kickoff
  - lista de faltantes con owner y fecha

### 3. Inputs Collected
- owner: `project_owner`
- entradas:
  - planos
  - referencias
  - medidas
  - restricciones del cliente
  - contexto local / regulatorio cuando aplica
- regla:
  - no entrar a produccion con inputs incompletos salvo alcance exploratorio explicitado
- salida:
  - paquete de insumos completo o lista formal de faltantes

### 4. Concept / Design Sprint
- owner: `project_owner`
- architecture:
  - concepto
  - desarrollo
  - coordinacion base
- interiors:
  - layout
  - materialidad
  - boards
  - specs
- visualization:
  - modelado
  - camaras
  - lookdev
  - renders
- salida:
  - paquete listo para QA interna

### 5. Internal QA
- owner: `qa_owner`
- checklist minimo:
  - scope correcto
  - nomenclatura correcta
  - coherencia visual y tecnica
  - compliance / jurisdiccion correctos
  - nada fuera de alcance prometido
- salida:
  - aprobado para cliente
  - o devuelto a produccion con lista cerrada

### 6. Client Review
- owner: `project_owner`
- regla:
  - feedback siempre estructurado
  - evitar comentarios dispersos por multiples canales
- salida:
  - consolidado unico de comentarios
  - decision maker identificado

### 7. Revision Cycle
- owner: `project_owner`
- cada ronda debe cerrar con:
  - cambios aceptados
  - cambios rechazados
  - cambios que requieren `change_order_required`
- regla:
  - no aceptar microfeedback infinito
- salida:
  - siguiente ronda o aprobacion final

### 8. Final Delivery / Handoff
- owner: `project_owner`
- tipos validos:
  - `final_deliverable`
  - `client_facing_package`
  - `partner_coordination_package`
  - `non_submittable_base_package`
- regla:
  - no etiquetar `final` si el paquete sigue siendo base para partner o submission futura
- salida:
  - entrega final o handoff a tercero con decision log y exclusions

### 9. Closeout
- owner: `Sofía`
- incluye:
  - aprobacion final
  - archivo
  - check NDA / portfolio
  - señal de referral / upsell
- salida:
  - proyecto `closed`

## QA y revisiones

- QA gate obligatorio antes de toda entrega externa
- una sola fuente de feedback por ronda
- un solo decision-maker del lado cliente cuando sea posible
- feedback fuera de alcance activa change order
- toda aprobacion importante queda por escrito

## Coordinacion con partners / consultores

- cada proyecto con terceros debe tener `partner map`
- para cada tercero registrar:
  - nombre
  - rol
  - input esperado
  - output esperado
  - fecha compromiso
  - dependencia critica
- handoff a architect-of-record debe incluir:
  - base documentation set
  - decision log
  - exclusions
  - jurisdiction disclaimer

## Reglas por tipo de servicio

### Architecture + partner
- flujo completo
- requiere handoff formal
- QA legal/compliance obligatorio

### Interiors
- puede omitir handoff regulatorio
- mantiene kickoff, QA, review, revisions y closeout

### Visualization
- version reducida del flujo
- conserva QA, feedback consolidado y cierre formal

### Consulting
- foco en memo, roadmap y decision log
- closeout al entregar memo y proximo paso

## Reglas de riesgo

Un proyecto entra en riesgo si:
- faltan inputs por mas de `3 dias habiles`
- cliente no responde en review
- consultor bloquea camino critico
- aparece un requirement nuevo de sign-off/submission no contemplado

## Rituales operativos

### Diario
- revisar `projects_needing_inputs`
- revisar `projects_in_internal_qa`
- revisar deadlines de feedback y handoff

### Semanal
- capacidad
- proyectos en riesgo
- dependencias externas
- proximos handoffs
- change orders abiertos
