const ignoreFiles = function({
  patterns = [],
  when = () => true,
  asId = 'console',
} = {}) {
  return {
    resolveId(id) {
      if (!when()) return null;

      if (![patterns].flat().some(pattern => id.match(pattern))) return null;

      return { id: asId, external: true };
    },
  };
};

export default ignoreFiles;
