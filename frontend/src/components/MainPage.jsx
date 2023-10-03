import React from 'react'

const MainPage = () => {
  return (
    <>
      <h2 className='py-3'>Главная</h2>
      <h4>Описание проекта</h4>
      <div>
        ToDo notes предназначен для ведения списка ToDo
        проектов в небольших компаниях.
      </div>
      <h4 className='mt-3'>Права пользоватей</h4>
      <div>Активные адмнистраторы могут все.</div>
      <h5 className='mt-2'>Пользователи</h5>
      <div>Пользователи могут регистрироваться в ToDo notes.</div>
      <div>
        Активные пользователи могут авторизовавться, изменять свои данные,
        пароль и делать неактивным свой эккаунт.
      </div>
      <h5 className='mt-2'>Проекты</h5>
      <div>Активные пользователи могут создавать проекты.</div>
      <div>Активные пользователи могут изменять и делать неактивными проекты, которые создали</div>
      <div>
        В проектах активные пользователи могут изменять список участников проекта в своих проектах.
      </div>
      <h5 className='mt-2'>ToDo</h5>
      <div>Активные создатели или участники проекта могут создавать ToDo в проекте.</div>
      <div>
        Активные создатели проекта или создатели ToDo могут изменять или делать неактивными ToDo.
      </div>
      <div className='pb-5'></div>
    </>
  )
}

export default MainPage
