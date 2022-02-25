/* eslint-disable-next-line import/no-extraneous-dependencies */

const pad00 = (num) => String(num).padStart(2, '0')
const date = new Date()
const year = date.getFullYear()
const month = pad00(date.getMonth() + 1)
const day = pad00(date.getDate())
const hms = `${pad00(date.getHours())}:00:00`
const datePrefix = `${year}-${month}-${day}`

const path = `content/blog/{{getKebabFirst date}}/{{date}}___{{id}}.md`

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper('getKebabFirst', (date) => date.split('-')[0])
  plop.setHelper('hms', () => hms)
  plop.setActionType(
    'generated',
    (answers, config) => `./${plop.renderString(config.path, answers)}`
  )
  plop.setGenerator('post', {
    description: 'Write new blog post',
    prompts: [
      { type: 'input', name: 'title', validate: Boolean },
      {
        type: 'input',
        name: 'id',
        message: `id(kebab-case, [a-z0-9_-], 12...20):`,
        validate: function (input) {
          // Declare function as asynchronous, and save the done callback
          const done = this.async()
          if (!input) {
            done('required')
            return
          }
          if (!/^[a-z0-9_-]+$/.test(input)) {
            done('available chars [a-z0-9_-]')
            return
          }
          if (input.length < 12 || 20 < input.length) {
            done('length 12...20')
            return
          }
          done(null, true)
        },
      },
      {
        type: 'input',
        name: 'date',
        default: datePrefix,
        message: `date(YYYY-MM-DD):`,
      },
    ],
    actions: [
      { type: 'add', path, templateFile: 'templates/post.hbs' },
      { type: 'generated', path },
    ],
  })
}
