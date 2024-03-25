# App

GymPass style app 


## RFs
 - [ ] Deve ser possivel se cadastrar;
 - [ ] Deve ser possivel se autenticar;
 - [ ] Deve ser possivel obter o perfil de um usuario logado;
 - [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
 - [ ] Deve ser possivel o usuario obter seu historico de checki-ins;
 - [ ] Deve ser possivel o usuario buscar academias proximas;
 - [ ] Deve ser possivel o usuario buscar uma academia pelo nome;
 - [ ] Deve ser possivel o usuario buscar academias pelo nome;
 - [ ] Deve ser possivel o usuario realizar check-in em uma academia;
 - [ ] Deve ser possivel validar o check-in de um usuario;
 - [ ] Deve ser possivel cadastrar um academia;

## RNs

- [ ] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer 2 check-in no mesmo dia; 
- [ ] O usuario nao pode faer check-in se nao estiver perto (100m) da academia;
- [ ] O check-in so pode ser validade ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores

## RNFs

- [ ] A senha do usuario precisa estar criptografada;
- [ ] Os dados da aplicacao precisam estar persistindo em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por JWT (JSON Web Token)

