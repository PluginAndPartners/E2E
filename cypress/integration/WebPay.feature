Feature:  WebPay

    Scenario: Pagamento com sucesso
        Given um item no carrinho de compras
        When realizo o processo de checkout com usuário não cadastrado
        Then devo ser redirecionado para a página de sucesso