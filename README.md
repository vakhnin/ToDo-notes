# ToDo notes

Отслеживание и ведение заметок ToDo, сгруппированных по проектам

Содержание:
1. запуск проекта
   1. запуск тестовых серверов Django REST и React локально (Windows)
   2. запуск тестовых серверов Django REST и React локально (Ubuntu)
2. Описание проекта

## 1. i. запуск тестовых серверов Django REST и React локально (Windows)
Необходимы предустановленные git, Python3, Node.js

Развертывание проекта

В оболочке cmd (не PowerShell):

&gt; 
```git clone https://github.com/vakhnin/ToDo-notes.git```

&gt; 
```cd .\ToDo-notes\```

ToDo-notes&gt; 
```python3 -m venv venv```

ToDo-notes&gt; 
```.\venv\Scripts\activate.bat```

(venv) ToDo-notes&gt; 
```pip3 install -U pip```

(venv) ToDo-notes&gt; 
```pip3 install -r requirements.txt```

(venv) ToDo-notes&gt; 
```python3 manage.py migrate```

(venv) ToDo-notes&gt; 
```python3 manage.py fill_db```

(venv) ToDo-notes&gt; 
```python3 manage.py runserver```

cmd не закрывать.
В другом окне оболочки cmd (не PowerShell), 
в тоей-же дирректории, куда клонирован репозитарий:

&gt; 
```cd ToDo-notes\frontend```

ToDo-notes\frontend&gt; 
```npm install```

ToDo-notes\frontend&gt; 
```npm start```

## 1. ii. запуск тестовых серверов Django REST и React локально (Ubuntu)
