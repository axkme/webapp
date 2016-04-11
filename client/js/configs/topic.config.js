System.config({
    transpiler: 'typescript',
    typescriptOptions: { emitDecoratorMetadata: true },
    packages: { '/js': { defaultExtension: 'ts' } }
});
System.import('/js/topic.main').then(null, console.error.bind(console));