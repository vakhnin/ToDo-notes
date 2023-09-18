const userNameById = (users, id) => {
  const user = users.find((user) => user.id === Number(id))
  return user ? user.username : 'пользователь не найден'
}

export { userNameById }
