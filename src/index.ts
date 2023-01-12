const inquirer = require('inquirer')
const consola = require('consola')

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
}
enum MessageVariant {
  Success = 'succes',
  Error = 'error',
  Info = 'info',
}

type InquirerAnswers = {
  action: Action
}
type User = {
  name: string
  age: number
}

class Message {
  content: string

  constructor(content: string) {
    this.content = content
  }
  show = function () {
    console.log(this.content)
  }
  capitalize = function () {
    console.log(
      this.content.charAt(0).toUpperCase() +
        this.content.slice(1).toLowerCase(),
    )
  }
  toUpperCase = function () {
    console.log(this.content.toUpperCase())
  }
  toLowerCase = function () {
    console.log(this.content.toLowerCase())
  }

  public static showColorized(cons: MessageVariant, text: string) {
    const variant: MessageVariant = cons
    if (variant == 'succes') {
      consola.success(text)
    }
    if (variant == 'error') {
      consola.error(text)
    }
    if (variant == 'info') {
      consola.info(text)
    }
  }
}

class UsersData {
  data: User[] = new Array()

  showAll = function () {
    const data = this.data
    if (!data) {
      console.log('No data...')
    } else {
      console.table(data)
    }
  }
  add = function (User: User) {
    const user: User = User
    if (user.age > 0 && user.name) {
      this.data.push(user)
      console.log('User has been successfully added!')
    } else {
      console.log('Wrong data!')
    }
  }

  remove = function (name: string) {
    const data: User[] = this.data
    const findUser = data.find((user) => user.name === name)
    if (findUser == undefined) {
      console.log('User not found...')
    } else {
      const index = data.indexOf(findUser)
      data.splice(index, 1)
    }
  }
}

const users = new UsersData()
console.log('\n')
console.info('???? Welcome to the UsersApp!')
console.log('====================================')
Message.showColorized(MessageVariant.Info, 'Available actions')
console.log('\n')
console.log('list – show all users')
console.log('add – add new user to the list')
console.log('remove – remove user from the list')
console.log('quit – quit the app')
console.log('\n')

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll()
          break
        case Action.Add:
          const user = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
            {
              name: 'age',
              type: 'number',
              message: 'Enter age',
            },
          ])
          users.add(user)
          break
        case Action.Remove:
          const name = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
          ])
          users.remove(name.name)
          break
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, 'Bye bye!')
          return
      }

      startApp()
    })
}

startApp()
