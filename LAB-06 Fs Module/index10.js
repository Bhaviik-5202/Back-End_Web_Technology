const fs = require('fs');

try {
    const watcher = fs.watch('watchme.txt', (eventType, filename) => {
        if (eventType === 'change') {
        console.log('File Changed');
        } 
        else if (eventType === 'rename') {
        console.log('File renamed or moved (rename event).');
        } 
        else {
        console.log('fs.watch event:', eventType);
        }
    });

    console.log(`Watching  for changes. Press Ctrl+C to stop.`);

    watcher.on('error', (err) => {
        console.error('Watcher error:', err.message);
    });
} 
catch (err) {
  console.error('Error setting up watcher:', err.message);
}
