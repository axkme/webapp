System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: { '/js': { defaultExtension: 'ts' } }
});
System.import('/js/category.main').then(null, console.error.bind(console));