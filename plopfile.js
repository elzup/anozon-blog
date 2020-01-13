/* eslint-disable-next-line import/no-extraneous-dependencies */

const pad00 = num => String(num).padStart(2, '0')
const date = new Date()
const year = date.getFullYear()
const month = pad00(date.getMonth() + 1)
const day = pad00(date.getDate())
const hms = `${pad00(date.getHours())}:00:00`
const datePrefix = `${year}-${month}-${day}`

const categories = ['日記', 'Tech', 'BlogOps']

module.exports = function(
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper('getKebabFirst', date => date.split('-')[0])
  plop.setHelper('hms', () => hms)
  plop.setGenerator('post', {
    description: 'Write new blog post',
    prompts: [
      { type: 'input', name: 'title' },
      { type: 'input', name: 'id', message: `id(kebab-case):` },
      {
        type: 'input',
        name: 'date',
        default: datePrefix,
        message: `date(YYYY-MM-DD):`,
      },
      {
        type: 'list',
        name: 'category',
        default: 'Tech',
        choices: categories,
      },
    ],
    actions: [
      {
        type: 'add',
        path: `content/blog/{{getKebabFirst date}}/{{date}}___{{id}}.md`,
        templateFile: 'templates/post.hbs',
      },
    ],
  })
}
