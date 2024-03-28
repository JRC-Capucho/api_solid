# App

GymPass style app 


## RFs
 - [x] Deve ser possivel se cadastrar;
 - [x] Deve ser possivel se autenticar;
 - [x] Deve ser possivel obter o perfil de um usuario logado;
 - [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
 - [x] Deve ser possivel o usuario obter seu historico de checki-ins;
 - [x] Deve ser possivel o usuario buscar academias proximas (10km);
 - [x] Deve ser possivel o usuario buscar uma academia pelo nome;
 - [x] Deve ser possivel o usuario realizar check-in em uma academia;
 - [x] Deve ser possivel validar o check-in de um usuario;
 - [x] Deve ser possivel cadastrar um academia;

## RNs

- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario nao pode fazer 2 check-in no mesmo dia; 
- [x] O usuario nao pode faer check-in se nao estiver perto (100m) da academia;
- [x] O check-in so pode ser validade ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores

## RNFs

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistindo em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por JWT (JSON Web Token)

