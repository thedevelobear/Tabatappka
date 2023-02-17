module.exports = {
  prompt: ({ prompter: { prompt } }) =>
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What’s the name of the component you want to create?',
        result: (name) => name,
        validate: (name) => name.length > 2,
      },
    ]).then((options) => {
      const { name } = options;
      return {
        ...options,
        title: `components/${name}`,
        path: `components/${name}`,
        root: './src',
      };
    }),
};
