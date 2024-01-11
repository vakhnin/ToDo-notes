# ToDo notes

Отслеживание и ведение заметок ToDo, сгруппированных по проектам

Содержание:
1. Запуск тестовых серверов Django REST и React локально
   1. Запуск тестовых серверов Django REST и React локально (Windows 10)
   2. Запуск тестовых серверов Django REST и React локально (Ubuntu 20.04)
2. Развертывание проекта на сервере

## 1. i. Запуск тестовых серверов разработки Django REST и React локально (Windows 10)
Необходимы предустановленные git, Python3, Node.js версии 18.16.1

Развертывание проекта

В оболочке cmd (не PowerShell):

&gt; ```git clone https://github.com/vakhnin/ToDo-notes.git``` <br>
&gt; ```cd .\ToDo-notes\``` <br>
ToDo-notes&gt; ```python -m venv venv``` <br>
ToDo-notes&gt; ```.\venv\Scripts\activate.bat``` <br>
(venv) ToDo-notes&gt; ```python.exe -m pip install --upgrade pip``` <br>
(venv) ToDo-notes&gt; ```pip install -r requirements.txt``` <br>
(venv) ToDo-notes&gt; ```python manage.py migrate``` <br>
(venv) ToDo-notes&gt; ```python manage.py fill_db``` <br>
(venv) ToDo-notes&gt; ```python manage.py runserver``` <br>

cmd не закрывать.
В другом окне оболочки cmd (не PowerShell), 
в той-же директории, куда клонирован репозитарий:

&gt; ```cd ToDo-notes\frontend``` <br>
ToDo-notes\frontend&gt; ```npm install``` <br>
ToDo-notes\frontend&gt; ```npm start```

При развертывании проекта будет создан пользователь с административными правами 
с логином `admin` и паролем `admin`

Тестировалось с Python 3.12

## 1. ii. Запуск тестовых серверов разработки Django REST и React локально (Ubuntu 20.04)

$ ```sudo apt update``` <br>
$ ```sudo apt install git python3-venv npm curl -y``` <br>
$ ```curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash``` <br>
$ ```source ~/.bashrc``` <br>
$ ```git clone https://github.com/vakhnin/ToDo-notes.git``` <br>
$ ```cd ToDo-notes/``` <br>
ToDo-notes$ ```python3 -m venv venv``` <br>
ToDo-notes$ ```source venv/bin/activate``` <br>
(venv) ToDo-notes$ ```pip3 install -U pip``` <br>
(venv) ToDo-notes$ ```pip3 install -r requirements.txt``` <br>
(venv) ToDo-notes$ ```python3 manage.py migrate``` <br>
(venv) ToDo-notes$ ```python3 manage.py fill_db``` <br>
(venv) ToDo-notes$ ```python3 manage.py runserver``` <br>

Окно терминала не закрывать. В другом окне терминала,
в той-же директории, куда клонирован репозитарий:

$ ```cd ToDo-notes/frontend``` <br>
ToDo-notes/frontend$ ```nvm install 18.16.1``` <br>
ToDo-notes/frontend$ ```npm install``` <br>
ToDo-notes/frontend ```npm start``` 

При развертывании проекта будет создан пользователь с административными правами 
с логином `admin` и паролем `admin`

## 2. Развертывание проекта на сервере

В терминале:<br>
$ ```sudo apt update``` <br>
$ ```sudo apt install git docker docker-compose -y``` <br>
$ ```git clone https://github.com/vakhnin/ToDo-notes.git``` <br>

В файле ToDo-notes/todo_notes/settings.py необходимо добавить
свой сайт в список разрешенных сайтов: 
```
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://your-domain:80', # Вместо этой строчки добавить домен с портом
]
```
$ ```cd ToDo-notes/production/``` <br>
ToDo-notes/production$ ```sudo docker-compose up --build -d``` <br>

При развертывании проекта будет создан пользователь с административными правами 
с логином `admin` и паролем `admin`

Если дополнительно необходимо развернуть Grafana с Loki для 
отслеживания логов, Prometheus для отсеживания метрик и Dasboard:<br>

ToDo-notes/production$ ```cd monitoring```<br>
ToDo-notes/production/monitoring$ ```sudo docker-compose up --build -d```

Развертывание тестировалось на Ubuntu 20.04, Docker 24.0.5, docker-compose 1.25.0 
