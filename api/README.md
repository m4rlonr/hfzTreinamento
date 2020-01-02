# Como utilizar

Para utilizar a api, você ira necessitar do Python 3.7 e conexão com a internet

## Rodando local

1. Clone o repositório `git clone https://github.com/wgalleti/hfzTreinamento.git`
1. Entre na pasta do projeto e em seguida api `cd hfzTreinamento/api`
1. Instale as dependencias do projeto `pipenv sync -d`
1. Crie as migrações `python manage.py makemigrations`
1. Crie o banco de dados `python manage.py migrate`
1. Crie um usuario `python manage.py createsuperuser`


Agora só subir o servidor `python manage.py runserver`