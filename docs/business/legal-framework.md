# Legal & Compliance Playbook

## Modelo base

- Somaz opera con **dos perfiles contractuales**:
  - `florida_international`
  - `argentina`
- Somaz usa **partner architect independiente** cuando un proyecto en US/exterior requiere firma, adaptacion regulatoria o submission local.
- Somaz no se presenta como architect-of-record local por defecto en Miami/Florida.

## Matriz por jurisdiccion

| Jurisdiccion | Somaz puede vender | Somaz no debe prometer | Documento base |
| --- | --- | --- | --- |
| Argentina | arquitectura integral, documentacion, coordinacion y firma/presentacion solo donde la habilitacion real lo permita | `full-service everywhere`, firma fuera de jurisdiccion habilitada | `service-agreement-argentina.md` |
| Florida / Miami | design leadership, interiors, visualization, base technical package, partner coordination | firma local propia, architect-of-record por defecto, submission local propia | `msa-florida-international.md` |
| Exterior no US | design leadership, visualization, coordination, technical preparation | cumplimiento local sin partner, sign-off propio, submission propio | `msa-florida-international.md` |

## Servicios permitidos / no permitidos

### Permitidos
- `architect-led design`
- `full-scope architecture in Argentina`
- `local licensed partner coordination`
- `technical package preparation`
- `visualization / interiors / consulting`

### Prohibidos o restringidos
- `signed plans by Somaz` en US/exterior
- `permit set final` si aun depende de adaptacion del partner
- `licensed architectural firm in Miami` si no existe esa estructura habilitante
- direccion de obra o responsabilidad regulatoria no contratada

## Modelo de partner independiente

### Referral model
- Somaz entrega diseno y coordinacion propia
- el cliente contrata directo al partner local para revision, adaptacion, firma y submission
- el partner responde por su sello y presentacion

### Coordinated model
- Somaz lidera la coordinacion comercial y tecnica
- el partner sigue siendo independiente
- el partner responde por revision, adaptacion, firma y submission

## Mapa de responsabilidad

| Actividad | Somaz | Partner local | Cliente | Comentario legal |
| --- | --- | --- | --- | --- |
| Concepto y direccion de diseno | Si | No | Aprueba | Servicio principal de Somaz |
| Interiores y visualizacion | Si | No | Aprueba | Puede venderse standalone |
| Paquete tecnico base | Si | Revisa/adapta si aplica | Provee insumos | No debe llamarse submission final sin partner |
| Revision de codigo local | No por defecto | Si | Facilita informacion | Queda en cabeza del profesional local competente |
| Firma y sello | No por defecto | Si | Contrata o aprueba | Separar expresamente en contrato/propuesta |
| Submission local | No por defecto | Si | Paga filing y terceros salvo inclusion expresa | Debe quedar excluido si no esta contratado |
| Aprobaciones del cliente | Solicita y documenta | Puede comentar | Si | Toda aprobacion clave por escrito |

## Disclaimers obligatorios

### Web publica
- `Full-scope architecture in Argentina, subject to applicable licensure and jurisdiction.`
- `In the US and abroad, documents may require review, adaptation, sign-off, and submission by a licensed local professional.`
- `Visualization and consulting deliverables are not construction documents unless explicitly stated and completed under the correct jurisdictional workflow.`

### Proposal
- distinguir rol de Somaz y rol del partner
- aclarar exclusiones sobre sign-off, code adaptation, filings y submission
- aclarar ley aplicable del paquete contractual correspondiente

### Contract
- limitar rol regulatorio de Somaz fuera de Argentina
- separar responsabilidad del partner independiente
- limitar uso constructivo de documentos no finalizados o no adaptados

### Lead response / thank-you
- prometer solo el siguiente paso correcto
- no prometer `free estimate`, firma, submission ni cumplimiento local automatico

## Riesgos y controles

### Propiedad intelectual
- IP de Somaz hasta pago completo
- licencia de uso limitada al proyecto y alcance contratado
- no reutilizacion, construccion ni modificacion fuera del workflow de compliance aplicable
- derecho de portfolio salvo NDA o exclusion escrita

### Pagos
- proyectos chicos `50/50`
- proyectos por fases `40/40/20`
- no kickoff sin anticipo
- filing fees, consultants y partner local fuera del fee de Somaz salvo inclusion expresa

### Responsabilidad
- limite de responsabilidad al fee pagado por el proyecto, salvo restriccion legal aplicable
- excluir danos indirectos, lucro cesante, rechazos regulatorios por terceros o cambios de autoridad
- change order obligatorio ante cambio de alcance, jurisdiccion, partner o resubmission

## Compliance operativo

- recolectar solo PII minima
- guardar aprobaciones y disclaimers relevantes por escrito
- marcar en CRM:
  - `partner_required`
  - `partner_engagement_model`
  - `signoff_required`
  - `submission_required`
  - `governing_law_profile`
  - `nda_required`
- bloquear kickoff si falta contrato correcto, anticipo o partner definido donde haga falta
