# GIT Basics
**Trabalhando remotamente**

A maioria dos comandos em git fornecem indicação de ações, como restaurar um arquivo ou enviá-lo para o servidor. A partir destas instruções básicas e da leitura do próprio terminal o usuário deverá cumprir o mínimo do Git sem maiores problemas.

------------

## Passo-a-passo:
### Faça uma vez

1. Instale o [Git][GitDownloads].

2. [Configure][ConfigurarGit] o git:
```
$ git config --global user.name "Fulano de Tal"
$ git config --global user.email fulanodetal@exemplo.br
```
Para testar suas configurações, acesse uma chave específica ou lista todas:
```
$ git config --list
$ git config user.name
```

### Faça para todo projeto novo

3. Abra o git bash no diretório em que se deseja trabalhar.
Botão direito > Git Bash Here, ou navegue pelo console do Git Bash; linhas de comando básicas no final do documento.
4. Inicializar o git:
`$ git init`
5. Replicar um repositório online em sua máquina:
`$ git clone <URL>`
6. Verificar se a clonagem foi realizada com sucesso:
```
$ git remote
origin
$ git remote -v
origin <URL> (fetch / push)
'<!-- vide erro de clonagem para o caso de um resultado diferente -->'
```

### Faça todo dia

7. Iniciando o expediente: certifique-se de que o repositório está em dia com o servidor.
`$ git pull origin main`
	**Glossário:**
	*pull*: download dos arquivos.
	*origin*: apelido do repositório no qual se está trabalhando.
	*main*: nome do ramo (branch)

	Conflito de versão apenas ocorrerá caso a mesma linha de uma mesma versão tenha sido modificada por mais de um usuário; essa situação exigirá atuação dos colaboradores.

8. Editei ou criei um arquivo e desejo enviá-lo para o repositório remoto ([fonte][GitCommit]).
```
$ git status
On branch main
Untracked files: (use "git add <file>..." to include in what will be committed)
		Teste.txt
$ git add Teste.txt
$ git status
On branch main
Changes to be committed: (use "git restore --staged <file>..." to unstage)
		new file:	Teste.txt
'$ git restore --staged Teste.txt ==> reverete o status para Untracked OU restaura a versão inalterada'
$ git commit -m "Descrição da ação"
$ git status
On branch main
Your branch is ahead of 'main' by 1 commit / Nothing to commit
$ git push origin main
$ git status
On branch main / Nothing to commit, working tree clean
```
Como desfazer um commit antes de dar push: `$ git reset --soft HEAD~`
Como retirar de staged todos os arquivos adicionados `$ git reset HEAD~`

Ver mais [aqui][UndoCommits].

9. Quero trabalhar com uma versão paralela (ramo / branch):
```
Por fazer...
```

###### Por Breno Coltro da Costa

------------

### Adendos:

#### Linhas de comando básicas
```
$ cd PASTA (navegar para a pasta selecionada)
$ cd .. (retorna para a pasta anterior)
$ ls (listagem dos arquivos / pastas)
$ ls --all (listagem de todos os arquivos / pastas, ocultos inclusive)
$ git rm <arquivo> (remoção do arquivo)
$ git help <verb> (instruções)
```

#### Ciclo de vida dos status de seus arquivos ([fonte](https://git-scm.com/book/pt-br/v2/Fundamentos-de-Git-Gravando-Altera%C3%A7%C3%B5es-em-Seu-Reposit%C3%B3rio "Git"))

[![Status dos arquivos](https://git-scm.com/book/en/v2/images/lifecycle.png "Status dos arquivos")](https://git-scm.com/book/en/v2/images/lifecycle.png "Status dos arquivos")

#### Possíveis erros:

- **Erro de certificado:** execute a seguinte linha de comando no git bash para SO Windows: `$ git config --global http.sslbackend schannel`
	Vide [Git for Windows 2.14.0][Git4Windows] ou [SSL Verify][SSLVerify].

- **Erro de clonagem:** Caso nada seja acusado (terminal em branco), execute esta linha de comando: `$ git remote add origin <URL>`
	Parâmetros: `<shortname> <url>`; O `<shortname>` padrão para o repositório para o qual se pretende trabalhar é `origin`. Fonte: [Git: Trabalhando de Forma Remota][GITRemoto]

[GitDownloads]: https://git-scm.com/downloads "Download Git"
[ConfigurarGit]: https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Configura%C3%A7%C3%A3o-Inicial-do-Git "Configuração Inicial do Git"
[Git4Windows]: https://github.com/git-for-windows/git/releases/tag/v2.14.0.windows.1 "Certification Error"
[SSLVerify]: https://gist.github.com/andr0id1/39ef47bb3fcfce8e640f534cb13f19d4#file-gitssl-sh "SSL Verify for Windows"
[GITRemoto]: https://git-scm.com/book/pt-br/v2/Fundamentos-de-Git-Trabalhando-de-Forma-Remota "Git: Trabalhando de Forma Remota"
[GitCommit]: https://git-scm.com/book/pt-br/v2/Fundamentos-de-Git-Gravando-Altera%C3%A7%C3%B5es-em-Seu-Reposit%C3%B3rio "Git Gravando Alterações em Seu Repositório"
[UndoCommits]: https://bytefreaks.net/programming-2/how-to-undo-a-git-commit-that-was-not-pushed "Undo a commit that was not pushed"