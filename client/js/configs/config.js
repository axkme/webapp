System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: { 'js': { defaultExtension: 'ts' } }
});
System.import('js/main').then(null, console.error.bind(console));