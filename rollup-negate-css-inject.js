import path from 'path';

const negateCssInject = function({ only = [] } = {}) {
  return {
    transform(content, id) {
      if (!id.endsWith('.css')) return;

      if (
        only.length !== 0 &&
        !only.some(file => path.resolve(process.cwd(), file) === id)
      )
        return;

      const startStatement = 'var css =';

      const indexOfStart = content.indexOf(startStatement);
      const indexOfExportStatement = content.indexOf('\nexport default css;');

      const code = JSON.parse(
        content.substring(
          indexOfStart + startStatement.length + 1,
          indexOfExportStatement - 1
        )
      ).trim();

      return {
        code,
      };
    },
  };
};

export default negateCssInject;
