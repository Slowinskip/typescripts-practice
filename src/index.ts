const inquirer = require('inquirer')
const consola = require('consola')

const startApp = () => {
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
  //   type MessageVariant = {
  //     color: Color
  //   }

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

    showColorized = function (cons: MessageVariant, text: string) {
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

  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then((answers: InquirerAnswers) => {
      console.log('Chosen action: ' + answers.action)
      if (answers.action === 'quit') return

      startApp()
    })
}

startApp()
