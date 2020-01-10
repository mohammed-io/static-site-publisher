const ignoreFiles = function({ patterns = [], when = () => true } = {}) {
  return {
    transform(content, id) {
      if (!when()) return;

      if (![patterns].flat().some(pattern => id.match(pattern))) return;

      return {
        code: '',
      };
    },
  };
};

export default ignoreFiles;
