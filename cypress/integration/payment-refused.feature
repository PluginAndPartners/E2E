Feature:  Payment Refused

    Scenario: Pagamento recusado
        Given um item no carrinho de compras
        When realizo o processo de checkout com OTHE OTHE
        Then na página do pedido devo visualizar o status de pagamento recusado