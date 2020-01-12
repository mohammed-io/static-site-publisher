const ignoreFiles = function({ patterns = [], when = () => true } = {}) {
  return {
    resolveId(id) {
      if (!when()) return null;

      if (![patterns].flat().some(pattern => id.match(pattern))) return null;

      return { id: 'path', external: true };
    },
  };
};

export default ignoreFiles;
