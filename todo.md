# EasyCred - TODO

## Backend / Banco de Dados
- [x] Schema: tabela products (id, title, price, description, features, fileUrl, badge, isHighlight)
- [x] Schema: tabela orders (id, productId, email, status, paymentId, downloadToken, createdAt)
- [x] Migração SQL aplicada
- [x] Seed dos 6 produtos no banco
- [x] Procedure: products.list (público)
- [x] Procedure: products.getById (público)
- [x] Procedure: orders.create (público, inicia pagamento MP)
- [x] Procedure: orders.getByToken (público, retorna download se pago)
- [x] Webhook Mercado Pago: atualiza status do pedido e libera download
- [ ] Upload dos PDFs dos produtos para S3

## Frontend
- [x] Design system: cor verde (#10b981), dark theme, fontes Geist/Inter
- [x] index.css: variáveis CSS, tema dark com verde como primária
- [x] Header/Navbar: logo, nome, links de navegação
- [x] Hero section: título, subtítulo, badge "Em Alta"
- [x] Seção "Em Alta": produtos mais vendidos em destaque
- [x] Catálogo completo: grid de 6 produtos com cards
- [x] Página de produto individual: detalhes, features, preço, botão comprar
- [x] Modal/Drawer de checkout: email + pagamento
- [x] Seção "Por Que EasyCred Funciona": 6 benefícios
- [x] FAQ: 3 perguntas frequentes
- [x] Footer: contato WhatsApp, links
- [x] Página de sucesso/download após pagamento
- [x] Design responsivo mobile-first

## Integração Mercado Pago
- [x] Preparar estrutura para receber API key do MP
- [x] Criar preferência de pagamento via API MP
- [x] Webhook para receber notificações de pagamento
- [x] Liberar download automático após pagamento aprovado
- [x] Página de retorno após pagamento

## Testes
- [x] Vitest: procedure products.list
- [x] Vitest: procedure orders.create
- [x] Vitest: webhook handler

## Entrega
- [x] Checkpoint final
- [ ] Publicar site
