import sys
import time

import requests


def full_url(url):
    return f'http://127.0.0.1:8000{url}'


def check(condition):
    return 'Ok' if condition else 'Fail'


def timeout():
    time.sleep(1)


# проверки базовой авторизации
response = requests.get(full_url('/api/users/'), auth=('test1', 'geekbrains1'))
print(f'Проверка базовой авторизации с не верными учетными данными: {check(response.status_code == 401)}')

timeout()
response = requests.get(full_url('/api/users/'), auth=('test1', 'geekbrains'))
print(f'Проверка базовой авторизации с верными учетными данными: {check(response.status_code == 200)}')

# проверки авторизации по токену
timeout()
response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                         data={'username': 'test1', 'password': 'geekbrains1'})
print(f'Проверка получения токена с не верными учетными данными: {check(response.status_code == 400)}')

timeout()
response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                         data={'username': 'test1', 'password': 'geekbrains'})
print(f'Проверка получения токена с верными учетными данными: {check(response.status_code == 200)}')

if response.status_code == 200:
    token = response.json()['token']
else:
    print('Не удалось получить токен')
    print('Проверки прерваны')
    sys.exit()

timeout()
headers = {'Authorization': f'Token {token}'}
response = requests.get(full_url('/api/users/'), headers=headers)
print(f'Проверка доступа с токеном: {check(response.status_code == 200)}')

# проверки авторизации по токену JWT
timeout()
response = requests.post(full_url('/api/token/'), data={'username': 'test1', 'password': 'geekbrains1'})
print(f'Проверка получения токена JWT с не верными учетными данными: {check(response.status_code == 401)}')

timeout()
response = requests.post(full_url('/api/token/'), data={'username': 'test1', 'password': 'geekbrains'})
print(f'Проверка получения токена JWT с верными учетными данными: {check(response.status_code == 200)}')

if response.status_code == 200:
    token = response.json()['access']
else:
    print('Не удалось получить токен JWT')
    print('Проверки прерваны')
    sys.exit()

timeout()
headers = {'Authorization': f'Bearer {token}'}
response = requests.get(full_url('/api/projects/'), headers=headers)
print(f'Проверка доступа с JWT токеном: {check(response.status_code == 200)}')
