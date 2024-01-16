# Programação reativa
Lida com fluxos de dados ou eventos de forma assincrona, reagindo de forma natural
## Padrão observer
Algo gera modificação e os objetos que ficam escutando evento e alguem reage a esses eventos
- consegue acompanhar modificações
## Quando é necessária?
1. Aplicações que precisam lidar de forma assincrona com dados
2. Programas que precisam processar informações em tempo real

# Rxjs
Biblioteca para construção de programas assincronos ou baseado em eventos e utiliza coleção de Observables
## Observables
- coleção de valores ou eventos futuros

## Observer
- Ouve os valores entregues pelos observables
- comportamento lazy
  - precisa informar que esta interessado na informação do observer (subscribe)
## Padrão observer
- varios componentes podem estar interessados em um determinado evento e conseguem se inscrever quando o evento ocorrer (subscribe) e terem acesso as mudanças decorrentes desse evento
- é a base da programação orientada a eventos
  - Pub/sub (publicação / assinatura)

## Subscribe
- opções
  - next
    - dados principais
    - oberver pode emitir varias vezes durante existencia
  - error
    - apenas uma vez durante sua existência
    - opcional
  - complete
    - apenas uma vez durante sua existência
    - opcional
    - não traz dados, apenas completa ciclo de vida do observer
```ts
// depreciado
// this.service.buscar(this.campoBusca).subscribe(data =>
//   (retornoApi) => console.log(retornoApi),
//   (error) => console.log(error)
// )

this.service.buscar(this.campoBusca).subscribe({
  next: retornoApi => console.log(retornoApi),
  error: error   => console.log(error),
  complete: () => console.log('observer completado')
})
```

## Unsubscribe
- libera recursos e evita vazamento de memória
- ao realizar, retorna uma assinatura do tipo Subscription
```tsx
buscarLivros() {
  this.subscription = this.service.buscar(this.campoBusca).subscribe({
    next: retornoApi => console.log(retornoApi),
    error: error   => console.log(error),
    complete: () => console.log('observer completado')
  })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```
# arquitetura de componentes de apresentação e componentes inteligentes
### Componentes apresentação
- mostrar informações e interagir com a pessoa usuária
- nao possui depencias e recebe informações de outros componentes
- nao possuem comportamento atribuido (Ex: cabeçalho, rodap)
- mais simples
- app/components
### Componentes container
- lidam com serviços e logica do app
- possuem componentes de apresentação em seu template, conectando diferentes partes da aplicação
- detem informações e passam informações para componentes de apresentação
- componentes inteligentes / smart components
- app/views

# Dicas gerais
- pegar tipagem com base num json -> [quicktype.io](https://quicktype.io/)

# Referencai google
https://developers.google.com/books/docs/v1/using?hl=pt-br


# Aprendizados
- Utilizar a arquitetura de componentes de apresentação e componentes inteligentes;
- Lidar com a biblioteca RxJS;
- Aplicar o padrão Observer.
- Utilizar os métodos next, error e complete;
- Desinscrever-se do observable através do unsubscribe;
- Adequar a resposta da API para o formato necessário.
