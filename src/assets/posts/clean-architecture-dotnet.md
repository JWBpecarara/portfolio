# Clean Architecture na prática com .NET 8

Clean Architecture é um dos tópicos mais falados no mundo .NET — mas muita gente tem dificuldade de sair do conceito e aplicar em um projeto real. Neste post vou mostrar como estruturo meus projetos e por que cada decisão faz sentido.

## Por que Clean Architecture?

Quando comecei a trabalhar com sistemas legados, percebi o custo de código sem separação de responsabilidades: qualquer mudança pequena quebrava várias partes do sistema, testes eram impossíveis e o onboarding de novos devs levava semanas.

Clean Architecture resolve isso ao criar camadas com dependências que apontam sempre para dentro — o domínio não conhece nada do mundo externo.

## A estrutura que uso

```
src/
  Domain/
    Entities/
    Interfaces/
    ValueObjects/
  Application/
    UseCases/
    DTOs/
    Interfaces/
  Infrastructure/
    Repositories/
    Data/
    ExternalServices/
  API/
    Controllers/
    Middlewares/
```

## A regra de dependência

A regra mais importante: **camadas internas nunca dependem de camadas externas**.

```csharp
// Domain — não conhece nada externo
public class Pedido
{
    public Guid Id { get; private set; }
    public decimal Total { get; private set; }

    public void Confirmar()
    {
        if (Total <= 0)
            throw new DomainException("Pedido inválido.");
        // lógica de negócio pura
    }
}
```

```csharp
// Application — depende só do Domain
public class ConfirmarPedidoUseCase
{
    private readonly IPedidoRepository _repo;

    public ConfirmarPedidoUseCase(IPedidoRepository repo)
        => _repo = repo;

    public async Task ExecuteAsync(Guid pedidoId)
    {
        var pedido = await _repo.GetByIdAsync(pedidoId);
        pedido.Confirmar();
        await _repo.SaveAsync(pedido);
    }
}
```

```csharp
// Infrastructure — implementa as interfaces do Domain
public class PedidoRepository : IPedidoRepository
{
    private readonly AppDbContext _ctx;

    public async Task<Pedido> GetByIdAsync(Guid id)
        => await _ctx.Pedidos.FindAsync(id);
}
```

## O que isso muda na prática

Com essa estrutura, consigo:

- **Testar** a lógica de negócio sem precisar de banco de dados
- **Trocar** o ORM ou banco sem tocar no domínio
- **Entender** o sistema lendo só a camada Application

## Próximos passos

No próximo post vou mostrar como adiciono testes unitários com xUnit nessa estrutura — e como o TDD muda a forma de pensar no design das classes.

---

*Tem dúvidas ou quer discutir algum ponto? Me chama no [LinkedIn](https://www.linkedin.com/in/jhonatan-pecarara-8610b4302).*
