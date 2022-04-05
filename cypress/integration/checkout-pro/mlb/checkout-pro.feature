Feature: Disponibilizar ao buyer o pagamento de sua compra através do Checkout Pro

	Scenario: Precondições
		Given a loja esteja configurada com o site mlb para testes de pro
		And esteja em modo teste
		Then o idioma deve ser configurado para 'Português do Brasil'
		And a moeda de operação da loja deve ser 'Real brasileiro (R$)'

	Scenario: Realizando um pagamento com sucesso usando um meio off
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout PRO
		When cliquei em finalizar a compra
		Then devo ser redirecionado para o Mercado Pago
		And deve concluir o fluxo de pagamento com Pix
		And ao concluir o fluxo de pagamento, deve ser redirecionado de volta a loja, na tela de pedido recebido
		And na página do pedido eu devo visualizar o status de pagamento pendente

	Scenario: Realizando um pagamento com sucesso usando cartão
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout PRO
		When cliquei em finalizar a compra
		Then devo ser redirecionado para o Mercado Pago
		And deve concluir o fluxo de pagamento com cartão
		And ao concluir o fluxo de pagamento, devo ver a tela de congrats

	Scenario: Realizando um pagamento sem sucesso usando cartão
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout PRO
		When cliquei em finalizar a compra
		Then devo ser redirecionado para o Mercado Pago
		And deve falhar o fluxo de pagamento com cartão
		And ao concluir o fluxo de pagamento, devo ver a tela de erro

	Scenario: Realizando um pagamento com sucesso usando saldo em conta
		Given que eu tenha um produto no carrinho
		And que eu esteja na página de checkout
		And preenchi corretamente os detalhes de faturamento
		And que cliquei na opção de pagamento com o checkout PRO
		When cliquei em finalizar a compra
		Then devo ser redirecionado para o Mercado Pago
		And deve concluir o fluxo de pagamento com saldo em conta