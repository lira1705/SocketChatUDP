# Exercício de Sockets UDP
  
Exercício voltado para a criação de um chat entre vários usuários baseado nesse tutorial: https://www.youtube.com/watch?v=1acKGwbby-E&t=311s

Requisitos:  
a. Usar UDP  
b. Criar uma aplicação console que funcionará como chat ponto a ponto, onde um cliente se conecta a um servidor e troca mensagens.  
c. Tanto no cliente como no servidor será possível digitar mensagens do chat a partir do console.  

## Quais as principais diferenças entre TCP e UDP?  
UDP não contém uma conexão contínua e isso implicou em obstáculos que não eram observados em TCP.  

## Quais as principais diferenças entre a implementação TCP e UDP?  
Diferenciar conexões distintas como usuários distintos foi a principal diferença entre as duas implementações. Para resolver esse problema usei o conjunto da porta e o endereço do usuário como identificadores únicos, assim toda vez que uma mensagem era recebida a aplicação buscava saber se aquela porta já estava registrada.  

## Quais as principais dificuldades nas implementações UDP?  
Lidar com o estado connectionless do UDP.  

## Quando faz sentido usar TCP ou UDP? 
Se existe necessidade de uma conexão contínua TCP é mais prático, caso não UDP é mais simples já que não é necessário gerenciar a finalização das conexões.
