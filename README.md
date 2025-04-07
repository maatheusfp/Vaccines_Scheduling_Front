# Vaccines Scheduling Front
### Web App para agendamento de Vacinação feito em Angular
## O que você vai encontrar:
1. Guards das rotas para não serem acessadas sem o token de autorização;
2. Interceptor para tratar erros de requisição;
3. Services para realizar chamadas ao back;
4. Separação por páginas e componentes. 

## Como rodar
1. Primeiramente clone o repositorio na pasta de sua preferência. Recomendo clonar em uma pasta que não possua outro repositório para evitar conflitos.
2. Após clonado, dentro da pasta .\Vaccines_Scheduling_Front\ rode o comando `npm install` 
3. Por fim, para rodar a aplicação: `ng serve`. Por padrão, estará rodando no localhost:4200. Caso o navegador não abra diretamente, basta colocar o link.  
**Obs**: Para que as funcionalidades que necessitam de banco de dados funcionem, é necessário estar com esse repositório rodando: https://github.com/maatheusfp/Vaccines_Scheduling_Back

## Possíveis Problemas
Infelizmente o Angular Material pode encontrar problemas com as configurações dos navegadores. O problema que encontrei foi quando havia importação de algum módulo do material, que ao entrar na página desse módulo a aplicação crashava sem apresentar nenhum log de erro. Aparentemente é um problema relativamente regular, que algumas pessoas já tentaram fornecer diferentes soluções. Durante o desenvolvimento do projeto me deparei duas vezes com esse problema, mas que magicamente voltou a normalidade após desinstalar e instalar novamente as dependências. 

Seguem os links das discussões caso isso ocorra: 
https://github.com/angular/components/issues/28585
https://github.com/angular/components/issues/28905

**OBS:** Esse é o meu primeiro projeto em Angular, então é bem provável que haja diversas possibilidades de melhorias. Fique à vontade para dar feedbacks! 
