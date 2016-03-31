System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: { 'app': { defaultExtension: 'ts' } }
});
System.import('js/main.ts')
      .then(null, console.error.bind(console));