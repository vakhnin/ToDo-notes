const userNameById = (users, id) => {
  const user = users.find((user) => user.id === Number(id))
  return user ? user.username : 'пользователь не найден'
}

const projectNameById = (projects, id) => {
  const project = projects.find((project) => project.id === Number(id))
  return project ? project.name : 'проект не найден'
}

export { userNameById, projectNameById }
